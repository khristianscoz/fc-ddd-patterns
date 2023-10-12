import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import ConsoleLogWhenCustomerIsCreated1Handler from "./handler/console-log-when-customer-is-created2.handler";
import ConsoleLogWhenCustomerIsCreated2Handler from "./handler/console-log-when-customer-is-created1.handler";
import ConsoleLogWhenCustomerAddressIsChangedHandler from "./handler/console-log-when-customer-address-is-changed.handler";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerFactory from "../../customer/factory/customer.factory";
import Address from "../../customer/value-object/address";

describe("Customer events tests", () => {
    it("should handler events when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new ConsoleLogWhenCustomerIsCreated1Handler();
        const eventHandler2 = new ConsoleLogWhenCustomerIsCreated2Handler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        CustomerFactory.create(eventDispatcher, "Customer 1");

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });

    it("should handler events when customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new ConsoleLogWhenCustomerAddressIsChangedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        const address1 = new Address("Street 1", 1, "13330-250", "São Paulo");
        const address2 = new Address("Street 2", 1, "88500-250", "Lages");

        let customer = CustomerFactory.createWithAddress(eventDispatcher, "John", address1);
        customer.changeAddress(eventDispatcher, address2);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});