import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

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