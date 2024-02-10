import { Router } from "express";
import orderController from "../controllers/orderController";
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
 * tags:
 *   - name: Order
 *     description: Order management
 * 
 * /order/create:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: number
 *             required:
 *               - bookId
 *     responses:
 *       200:
 *         description: Order created
 *       400:
 *         description: Invalid credentials
 *  
 * /order/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get an order by id
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order retrieved
 *       400:
 *         description: Invalid credentials
 * 
 *   delete:
 *     security:
 *       - BearerAuth: []
 *     summary: Delete an order
 *     tags: [Order]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted
 *       400:
 *         description: Invalid credentials
 * 
 * /order:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all orders
 *     tags: [Order]
 *     responses:
 *       200:
 *         description: Orders retrieved
 *       400:
 *         description: Invalid credentials
 */

router.post("/create",auth, orderController.createOrder);
router.get("/:id",auth, orderController.getOrderById);
router.delete("/:id",auth, orderController.deleteOrder);
router.get("/",auth, orderController.getAllOrders);


export default router;
