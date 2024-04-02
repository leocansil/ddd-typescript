import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product 1", 10);

const input = {
    id: "123",
    name: "Product 1 Updated",
    price: 20,
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}


describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
        const repository = MockRepository();
        const useCase = new UpdateProductUseCase(repository);

        const output = await useCase.execute(input);

        expect(output).toEqual(input);
    });
});