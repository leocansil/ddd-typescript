import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Integration test update a product", () => {
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

    describe("Unit test for product update use case", () => {
        it("should update a product", async () => {
            const repository = new ProductRepository();
            const useCase = new UpdateProductUseCase(repository);
    
            const product = new Product("123teste", "Product 1", 10);
            repository.create(product);

            const input = {
                id: "123teste",
                name: "Product 1 Updated",
                price: 20,
            }
            
            const output = await useCase.execute(input);
    
            expect(output).toEqual(input);
        });
    });
});