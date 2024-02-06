"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("./product"));
describe("Product unit tests", () => {
    it("Should throw error when Id is empty", () => {
        expect(() => {
            let product = new product_1.default("", "Product 1", 100);
        }).toThrowError("Id is required");
    });
    it("Should throw error when Name is empty", () => {
        expect(() => {
            let product = new product_1.default("123", "", 100);
        }).toThrowError("Name is required");
    });
    it("Should throw error when Price is less than zero", () => {
        expect(() => {
            let product = new product_1.default("123", "Product 1", -1);
        }).toThrowError("Price must be greater than zero");
    });
    it("Should change name", () => {
        const product = new product_1.default("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });
    it("Should change price", () => {
        const product = new product_1.default("123", "Product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});
