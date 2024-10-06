export interface OProduct {
  ProductId: number;
  Quantity: number;
}

export interface Order {
  id: number;
  OrderDate: string | Date;
  UserId: string;
  Products: OProduct[];
  PaymentType: 'Online' | 'Cash';
}
