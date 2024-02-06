import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    
    it("Should throw error when Id is empty", () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrowError("Id is required");
    });

    it("Should throw error when CustomerId is empty", () => {
        expect(() => {
            let order = new Order("1", "", [])
        }).toThrowError("CustomerId is required");
    });
    
    it("Should throw error when Items is empty", () => {
        expect(() => {
            let order = new Order("1", "123", [])
        }).toThrowError("Items are required");
    });

    it("Should calculate total", () => {
        const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
        const order = new Order("o1", "c1", [item]);

        let total = order.total();

        expect(total).toBe(200);

        const order2 = new Order("o1", "c1", [item,item2]);
        total = order2.total();

        expect(total).toBe(600);
    });

    it("Should throw error if the item quantity is less or equal zero", () => {
        expect(() => {
            const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
            const order = new Order("o1", "c1", [item]);
        }).toThrowError("Quantity must be greater than 0");
    });
    
});