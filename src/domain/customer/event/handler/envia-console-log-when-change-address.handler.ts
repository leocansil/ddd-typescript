import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class EnviaConsoleLogWhenConsumerChangeAddress 
    implements EventHandlerInterface<CustomerChangeAddressEvent> {

    handle(event: CustomerChangeAddressEvent): void {
        console.log(`Endereço do cliente: ${event?.eventData?.customer?.id}, ${event?.eventData?.customer?.name} alterado para: ${event?.eventData?.customer?.address?.street}, ${event?.eventData?.customer?.address?.number}, ${event?.eventData?.customer?.address?.city}, ${event?.eventData?.customer?.address?.zip}`);
    }
}