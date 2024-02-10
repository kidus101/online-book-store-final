import bookService from "../services/bookService";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import cloudinary from "cloudinary";
import * as path from "path";
import { UploadedFile } from "express-fileupload";
import fs from "fs";

class BookController {
  async createBook(req: AuthenticatedRequest, res: Response) {
    const { title, writer, point, tag } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }
      const coverImage = (req.files as { [fieldname: string]: UploadedFile }).coverImage;
      //upload image to local storage temporarily
      const filePath = path.join("uploads", coverImage.name);
      await coverImage.mv(filePath);
  
      // Upload image to cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(filePath, {
        folder: "User",
      });
  
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete temporary file: ${filePath}`, err);
        } else {
          console.log(`Temporary file deleted: ${filePath}`);
        }
      });
    const newBook = await bookService.createBook({
        title,
        coverImageUrl: myCloud.url,
        // coverImagePublicId: myCloud.public_id,
        writer,
        point,
        tag,
        });
    
    res.json(newBook);
  }

  async getBooks(req: Request, res: Response) {
    // default page and pageSize values are 1 and 10 respectively
    const { page = 1, pageSize = 10 } = req.query;
    const books = await bookService.getAllBooks(Number(page), Number(pageSize));
    res.json({
      message: "Books retrieved",
      data: books,
    })
  }

  async getBook(req: Request, res: Response) {
    const { id } = req.params;
    const book = await bookService.getBookById(Number(id));
    res.json({
      message: "Book retrieved",
      data: book,
    });
  }

//   async updateBook(req: AuthenticatedRequest, res: Response) {
//     const { id } = req.params;
//     const { title, author, price } = req.body;
//     const updatedBook = await bookService.
//     res.json(updatedBook);
//   }

  async deleteBook(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    await bookService.deleteBook(Number(id));
    res.json({ message: "Book deleted" });
  }
}

export default new BookController();