import { OrderItem } from "./order-item.model";

export class Cart {
    foodOutletId: number;
    foodOutletName: string;
    totalItems: number = 0;
    totalPrice: number = 0;
    orderItems: OrderItem[];
}