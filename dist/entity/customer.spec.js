"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_1 = __importDefault(require("./address"));
const customer_1 = __importDefault(require("./customer"));
describe("Customer unit tests", () => {
    it("Should throw error when ID is empty", () => {
        expect(() => {
            let customer = new customer_1.default("", "John");
        }).toThrowError("Id is required");
    });
    it("Should throw error when Name is empty", () => {
        expect(() => {
            let customer = new customer_1.default("123", "");
        }).toThrowError("Name is required");
    });
    it("Should change name", () => {
        const customer = new customer_1.default("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });
    it("Should activate customer", () => {
        const customer = new customer_1.default("1", "Customer 1");
        const address = new address_1.default("Street 1", 123, "13338-250", "São Paulo");
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });
    it("Should throw when address is undefined when activate a customer", () => {
        expect(() => {
            const customer = new customer_1.default("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });
    it("Should deactivate customer", () => {
        const customer = new customer_1.default("1", "Customer 1");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });
});
