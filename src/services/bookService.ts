import CustomError from "../utils/customError";
import bookRepository from "../repositories/bookRepository";
import Book from "../entities/bookEntity";

class BookService {
  async getBookById(id: number): Promise<Book | null> {
    return bookRepository.getBookById(id);
  }

  async createBook(book: Partial<Book>): Promise<Book> {
    const existingBook = await bookRepository.getBookByTitle(book.title as string);
    if (existingBook) {
      throw new CustomError("Book already exists", 400);
    }
    return bookRepository.createBook({
      title: book.title as string,
      coverImageUrl: book.coverImageUrl as string,
        writer: book.writer as string,
        point: book.point as number,
        tag: book.tag as string,
    });
    }

    async deleteBook(id: number): Promise<number> {
        return bookRepository.deleteBook(id);
    }

    async getAllBooks(page: number, pageSize: number): Promise<Book[]> {
      return bookRepository.getAllBooks(page, pageSize);
    }

}

export default new BookService();
