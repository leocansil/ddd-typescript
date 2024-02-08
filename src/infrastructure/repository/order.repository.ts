import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            })),
        },
        {
            include: [{ model: OrderItemModel }],
        });
    }

    async update(entity: Order): Promise<void> {
        const sequelize = OrderModel.sequelize;
        await sequelize.transaction(async (t) => {
            await OrderItemModel.destroy({
                where: { order_id: entity.id },
                transaction: t,
            });
            const items = entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                order_id: entity.id,
                price: item.price,
                product_id: item.productId,
                quantity: item.quantity,
            }));
            await OrderItemModel.bulkCreate(items, { transaction: t });
            await OrderModel.update(
                { total: entity.total() },
                { where: { id: entity.id }, transaction: t }
            );
        });
    }

    async find(id: string): Promise<Order> {
        let orderModel;
        try{
            orderModel = await OrderModel.findOne({
                where: { id },
                include: ["items"],
            });
        } catch(error) {
            throw new Error("Order not found");
        }
        const orderItems = orderModel.items.map((item) => {
            return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
        });
        const order = new Order(orderModel.id, orderModel.customer_id, orderItems);
        return order;
    }

    // findAll(): Promise<Order[]> {
    //     throw new Error("Method not implemented.");
    // }

// ERROR TypeError: Converting circular structure to JSON
    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: [OrderItemModel],
        });
        
        const orders = orderModels.map((orderModel) => {
            let orderItems = orderModel.items.map((item) => {
                return new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity);
            });
            const order = new Order(orderModel.id, orderModel.customer_id, orderItems);
            return order;
        });
        return orders;
    }

    
   
}