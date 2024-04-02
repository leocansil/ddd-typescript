import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import Customer from "../../customer/entity/customer";
import Address from "../../customer/value-object/address";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerChangeAddressEvent from "../../customer/event/customer-change-address.event";
import EnviaConsoleLog1WhenConsumerIsCreated from "../../customer/event/handler/envia-console-log1-when-consumer-is-created.handler";
import EnviaConsoleLog2WhenConsumerIsCreated from "../../customer/event/handler/envia-console-log2-when-consumer-is-created.handler";
import EnviaConsoleLogWhenConsumerChangeAddress from "../../customer/event/handler/envia-console-log-when-change-address.handler";

describe("Domain events tests", () => {

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    });

    it("should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);

    });

    it("should unregister all event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });

    it("should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10.0,
        });

        // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });

    // Customer Created
    it("should register a customer created event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandlerConsoleLog1 = new EnviaConsoleLog1WhenConsumerIsCreated();
        const eventHandlerConsoleLog2 = new EnviaConsoleLog2WhenConsumerIsCreated();

        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsoleLog1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsoleLog2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerConsoleLog1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerConsoleLog2);

    });

    it("should unregister a customer created event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandlerConsoleLog1 = new EnviaConsoleLog1WhenConsumerIsCreated();
        const eventHandlerConsoleLog2 = new EnviaConsoleLog2WhenConsumerIsCreated();

        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsoleLog1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsoleLog2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerConsoleLog1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerConsoleLog2);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerConsoleLog1);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandlerConsoleLog2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
    });

    it("should notify a customer created event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerConsoleLog1 = new EnviaConsoleLog1WhenConsumerIsCreated();
        const eventHandlerConsoleLog2 = new EnviaConsoleLog2WhenConsumerIsCreated();

        const spyConsoleLog1EventHandler = jest.spyOn(eventHandlerConsoleLog1, "handle");
        const spyConsoleLog2EventHandler = jest.spyOn(eventHandlerConsoleLog2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsoleLog1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerConsoleLog2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerConsoleLog1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerConsoleLog2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: "123",
            name: "Customer 123",
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyConsoleLog1EventHandler).toHaveBeenCalled();
        expect(spyConsoleLog2EventHandler).toHaveBeenCalled();
    });

    // Customer Change Adress
    it("should register a customer change address event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandlerChangeAddress = new EnviaConsoleLogWhenConsumerChangeAddress();

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandlerChangeAddress);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandlerChangeAddress);

    });

    it("should unregister a customer change address event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandlerChangeAddress = new EnviaConsoleLogWhenConsumerChangeAddress();

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandlerChangeAddress);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandlerChangeAddress);

        eventDispatcher.unregister("CustomerChangeAddressEvent", eventHandlerChangeAddress);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(0);

    });

    it("should notify a customer change address event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandlerChangeAddress = new EnviaConsoleLogWhenConsumerChangeAddress();

        const spyChangeAddressEventHandler = jest.spyOn(eventHandlerChangeAddress, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandlerChangeAddress);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandlerChangeAddress);

        const customer = new Customer("456", "Customer Change Address");
        const address = new Address("Street 1", 2, "Zip 1", "City 1");
        customer.changeAddress(address);
        const customerChangeAddressEvent = new CustomerChangeAddressEvent({ customer });
        
        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyChangeAddressEventHandler).toHaveBeenCalled();
    });
});