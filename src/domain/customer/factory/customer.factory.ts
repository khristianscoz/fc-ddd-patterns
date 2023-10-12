import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../../product/event/customer-created.event";

export default class CustomerFactory {
  public static create(eventDispatcher: EventDispatcher, name: string): Customer {
    const id = uuid();
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: id,
      name: "Customer 1"
    });

    eventDispatcher.notify(customerCreatedEvent);
    return new Customer(id, name);
  }

  public static createWithAddress(eventDispatcher: EventDispatcher, name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name, address);
    return customer;
  }
}