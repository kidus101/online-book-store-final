import { Request, Response } from "express";
import orderService from "../services/orderService";
import { AuthenticatedRequest } from "../middlewares/auth";

class OrderController {
  async createOrder(req: AuthenticatedRequest, res: Response) {
    const { bookId } = req.body;
    const newOrder = await orderService.createOrder({
      customerId: req.user.id,
      bookId,
    });
    res.json(newOrder);
  }

  async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    const order = await orderService.getOrderById(Number(id));
    res.json(order);
  }

    async deleteOrder(req: Request, res: Response) {
        const { id } = req.params;
        const deletedOrder = await orderService.deleteOrder(Number(id));
        res.json(deletedOrder);
    }

    async getAllOrders(req: AuthenticatedRequest, res: Response) {
        const orders = await orderService.getAllOrders(req.user.id);
        res.json(orders);
    }
}

export default new OrderController();