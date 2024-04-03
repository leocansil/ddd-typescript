import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Integration test find a product", () => {
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

    it("should find a product", async () => {
        const repository = new ProductRepository();
        const useCase = new FindProductUseCase(repository);

        const product = new Product("123teste", "Product 1", 10);
        await repository.create(product);

        const input = {
            id: "123teste",
        };

        const outptut = {
            id: "123teste",
            name: "Product 1",
            price: 10,
        }

        const result = await useCase.execute(input);

        expect(result).toEqual(outptut);
    });

});