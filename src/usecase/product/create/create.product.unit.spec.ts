import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "a",
    name: "Product 1",
    price: 10,
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    }
}

describe("Unit test create product use case", () => {

    it("should create a customer", async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it("should throw an error when name is missing", async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        let name = input.name;
        input.name = "";

        await expect(useCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
        input.name = name;
    });

    it("should throw an error when price is zero", async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        let price = input.price;
        input.price = -1;

        await expect(useCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
        input.price = price;
    });

    it("should throw an error when type is missing", async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        let type = input.type;
        input.type = "";

        await expect(useCase.execute(input)).rejects.toThrow(
            "Product type not supported"
        );
        input.type = type;
    });
});