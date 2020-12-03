import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    itemsArr: ShoppingCartItem[] = []; //Initialize array, which will be used to display items in template
    constructor(public items: { [productId: string]: ShoppingCartItem } ) { //items is an object, consisting of shopping cart items
        this.items = items || {};
        // console.log(items, this.items);
        
        for (let productId in items) {   //here we map items from items object to items array
            let item = items[productId];
            this.itemsArr.push(new ShoppingCartItem({ ...item, key: productId }));
        }
    } //As a result we have itemsArr, which consists of items from  object 'items'
    get totalPrice() {
        let sum = 0;
        for (let productId in this.itemsArr)
            sum += this.itemsArr[productId].totalPrice;
        return sum;
    }
    get totalItemCount() {
        let count = 0;
        // console.log("Items: ", this.items);
        
        for (let productId in this.items) {
            count += this.items[productId].quantity;
            // console.log("ProductId", productId);
            
        }
        // console.log("Total Item Count: ", count);
        return count;
    }
    
    getQuantity(product: Product) {
        let item = this.items[product.key];
        if (!item) return 0;
        // console.log("Quantity of ", product.title, " is ", item.quantity);
        return item.quantity;
        // return item ? item.quantity : 0; 
    }

}