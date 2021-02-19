import { Address } from "cluster";
import { OrderItem } from "./order-item.model";

export class Order {
    orderId: number;
    foodOutletId: number;
    foodOutletName: string;
    totalPrice: number;
    orderedBy: string;
    orderedDate: string;
}


export class OrderSummary {
    order: Order;
    orderItems: OrderItem[];
    deliveryAddress: Address;
}
