import { Router } from "express";
import bookController from "../controllers/bookController";
import catchAsyncError from "../utils/catchAsyncError";
import { auth } from "../middlewares/auth";


const router = Router();


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 * 
 * security:
 *   - BearerAuth: []
 * 
 * tags:
 *   - name: Book
 *     description: Book management
 * 
 * /book/create:
 *   post:
 *     summary: Create a new book
 *     tags: [Book]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               writer:
 *                 type: string
 *               point:
 *                 type: number
 *               tag:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: binary
 *             required:
 *               - title
 *               - writer
 *               - point
 *               - tag
 *               - coverImage
 *     responses:
 *       200:
 *         description: Book created
 *       400:
 *         description: Invalid credentials
 * 
 * /book:
 *   get:
 *     summary: Get all books
 *     tags: [Book]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: Books retrieved
 *       400:
 *         description: Invalid credentials
 * 
 * /book/{id}:
 *   get:
 *     summary: Get a book by id
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Book retrieved
 *       400:
 *         description: Invalid credentials
 * 
 *   put:
 *     summary: Update a book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               writer:
 *                 type: string
 *               point:
 *                 type: number
 *               tag:
 *                 type: string
 *             required:
 *               - title
 *               - writer
 *               - point
 *               - tag
 *     responses:
 *       200:
 *         description: Book updated
 *       400:
 *         description: Invalid credentials
 */


router.post("/create", auth, catchAsyncError(bookController.createBook));
router.get("/", catchAsyncError(bookController.getBooks));
router.get("/:id", catchAsyncError(bookController.getBook));


export default router;
 
