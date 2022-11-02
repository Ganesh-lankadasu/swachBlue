import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '../../../node_modules/@angular/router';
import { NotificationService } from '../notification.service';
import { getLocaleMonthNames } from '../../../node_modules/@angular/common';
import { Product } from 'src/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  [x: string]: any;

  name: string = 'Cart Items';
  cartitems;
  showcart: Boolean;
  emptycart: Boolean;
  deleteitem = false;
  olditems:any[] = [];
  totalcart:number = 0;


  constructor(private common: CommonService,
    private router: Router,
    private notify:NotificationService) { }

  ngOnInit(): void {

    const product = localStorage.getItem('products');

    this.cartitems = JSON.parse(product);

    console.log(this.cartitems);

    if (this.cartitems.length === 0) {
      this.showcart = false;
      this.emptycart = true
    }
    else {
      this.showcart = true;
      this.emptycart = false;
    }

  }

  returntoshop() {
    this.router.navigate(['/allproducts']);
  }

  delete(item){
    const itemproducts = JSON.parse(localStorage.getItem('products'));
    console.log(item.name);
    this.deleteitem = true;
    setTimeout(() => {

      itemproducts.splice(itemproducts.findIndex((a:any)=>{
        return a.name === item.name
       }),1)
       this.notify.showError('Item deleted')
       localStorage.setItem('products',JSON.stringify(itemproducts));
       this.cartitems = JSON.parse(localStorage.getItem('products'));
       this.deleteitem = false;

       if (this.cartitems.length === 0) {
        this.showcart = false;
        this.emptycart = true
      }
      else {
        this.showcart = true;
        this.emptycart = false;
      }

      let items;

    items = JSON.parse(localStorage.getItem('products'));

    items.forEach((item)=>{
      this.totalcart = this.totalcart + item.quantity;
    })

    this.common.cartitems.next(this.totalcart);

    this.totalcart = 0;
      
    }, 1000);

    



  }

  shopping(){
    this.router.navigate(['/allproducts']);

  }

  updatecart(){
    localStorage.setItem('products',JSON.stringify(this.cartitems));

    const items = JSON.parse(localStorage.getItem('products'));

    items.forEach((item)=>{
      this.totalcart = this.totalcart + item.quantity;
    });

    this.common.cartitems.next(this.totalcart);

    this.totalcart = 0;
  }

  ngOnDestroy(){
    this.olditems = this.cartitems;
    this.common.olditems.next(this.olditems);
  }
  

}
