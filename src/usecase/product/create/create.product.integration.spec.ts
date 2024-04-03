import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

const basicInput = {
    type: "a",
    name: "Product 1",
    price: 10,
}

describe("Integration test create a product", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

   it("should create a product", async () => {
        const repository = new ProductRepository();
        const useCase = new CreateProductUseCase(repository);

        const output = await useCase.execute(basicInput);

        expect(output).toEqual({
            id: expect.any(String),
            name: basicInput.name,
            price: basicInput.price
        });
   });

   it("should throw an error when name is missing", async () => {
    const repository = new ProductRepository();
    const useCase = new CreateProductUseCase(repository);

    let name = basicInput.name;
    basicInput.name = "";

    await expect(useCase.execute(basicInput)).rejects.toThrow(
        "Name is required"
    );
    basicInput.name = name;
});

it("should throw an error when price is zero", async () => {
    const repository = new ProductRepository();
    const useCase = new CreateProductUseCase(repository);

    let price = basicInput.price;
    basicInput.price = -1;

    await expect(useCase.execute(basicInput)).rejects.toThrow(
        "Price must be greater than zero"
    );
    basicInput.price = price;
});

it("should throw an error when type is missing", async () => {
    const repository = new ProductRepository();
    const useCase = new CreateProductUseCase(repository);

    let type = basicInput.type;
    basicInput.type = "";

    await expect(useCase.execute(basicInput)).rejects.toThrow(
        "Product type not supported"
    );
    basicInput.type = type;
});
});