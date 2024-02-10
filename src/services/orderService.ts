import CustomError from "../utils/customError";
import orderRepository from "../repositories/orderRepository";
import {Order} from "../entities/orderEntity";
import userService from "./userService";
import bookService from "./bookService";

class OrderService {
    async getOrderById(id: number): Promise<Order | null> {
        return orderRepository.getOrderById(id);
    }

    async createOrder(order: Partial<Order>): Promise<Order> {
        const user = await userService.getUserById(order.customerId!);
        if (!user) {
            throw new CustomError("User not found", 404);
        }
        const book = await bookService.getBookById(order.bookId!);
        if (!book) {
            throw new CustomError("Book not found", 404);
        }
        if (book.point! > user.point!) {
            throw new CustomError("Not enough points", 400);
        }
        const newOrder = await orderRepository.createOrder(order);
        await userService.updateUser(user.id!, {point: user.point! - book.point!});

        return newOrder;


    }

    async deleteOrder(id: number): Promise<number> {
        return orderRepository.deleteOrder(id);
    }

    async getAllOrders(userId: number): Promise<Order[]> {
        return orderRepository.getAllOrders(userId);
    }

}

export default new OrderService();

