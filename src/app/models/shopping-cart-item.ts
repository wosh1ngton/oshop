export class ShoppingCartItem {

    id:string;
    title:string;
    imageUrl: string;
    price: number;
    quantity: number;      
  
    constructor(init?: ShoppingCartItem) {
        Object.assign(this, init);
     }

    get totalPrice() { return this.price * this.quantity; }
}