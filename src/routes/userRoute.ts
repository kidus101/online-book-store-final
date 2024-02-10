import { Router } from "express";
import userController from "../controllers/userController";
import catchAsyncError from "../utils/catchAsyncError";

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User management
 * 
 * /user/create-account:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User created
 *       400:
 *         description: Invalid credentials
 * 
 * /user/login:
 *   post:
 *     summary: Login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in
 *       400:
 *         description: Invalid credentials
 *       401:
 *         description: Not authenticated
 */

const router = Router();

router.post("/create-account", catchAsyncError(userController.create));
router.post("/login", catchAsyncError(userController.login));

export default router;