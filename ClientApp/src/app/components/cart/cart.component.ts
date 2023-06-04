// cart.component.ts
import {Component} from '@angular/core';
import {Service} from "../../models/service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: Service[] = [];
  type: string | null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.type = route.snapshot.paramMap.get('type');
    if (this.type == "approved")
      localStorage.removeItem('cartItems');
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }
  }

  removeFromCart(item: any) {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price;
    }
    return totalPrice;
  }
}
