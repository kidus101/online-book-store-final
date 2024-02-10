import { Order } from "../entities/orderEntity";

class OrderRepository {
    async getOrderById(id: number): Promise<Order | null> {
        return Order.findByPk(id);
    }

    async createOrder(order: Partial<Order>): Promise<Order> {
        return Order.create(order);
    }

    async deleteOrder(id: number): Promise<number> {
        return Order.destroy({
            where: {
                id: id
            }
        });
    }

    // get all orders of a user
    async getAllOrders(userId: number): Promise<Order[]> {
        return Order.findAll({
            where: {
                customerId: userId
            }
        });
    }
}

export default new OrderRepository();