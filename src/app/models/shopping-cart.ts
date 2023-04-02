import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {   
    
    constructor(public items: any[]) {          
        this.items = this.items.map((i) => { 
            let cartItem = new ShoppingCartItem({...i});                                                   
            return cartItem;
        });         
    }    
   
    get totalItemsCount() {        
        let count = 0;
        for (let item of this.items)         
            count += item.quantity;            
        return count;
    }

    get totalPrice() {
        let sum = 0;                
        for(let item of this.items)        
            sum += item.totalPrice;        
        return sum;
    }

    getQuantity(product: Product) {
        let item = this.items.find(i => i.id == product.id);           
        return item ? item.quantity : 0;
    }
}