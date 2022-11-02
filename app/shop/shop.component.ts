import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router } from '../../../node_modules/@angular/router';
import { NotificationService } from '../notification.service'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  name:String='Shop Now';
  items=[];
  localitems:any[]=[];
  olditems:any[]=[];
  cartitems:number=0;

  constructor(private common:CommonService,
  private router:Router,
  private notifyService : NotificationService) { }

  ngOnInit(): void {

    this.olditems = JSON.parse(localStorage.getItem('products'));

    this.localitems = JSON.parse(localStorage.getItem('products'));

    this.common.getPosts(10,1).subscribe((res)=>{
      console.log(res);
      this.items=res.products;
      this.items.forEach((proo)=>{
        proo.addToCart = false;
      })
    })
  }

  allproducts(){
    this.router.navigate(['/allproducts'])

  }

  addtocart(product){
    product.addedToCart = true;
    product.quantity = 1;


   this.localitems.push(product);
    localStorage.setItem('products',JSON.stringify(this.localitems));
    this.notifyService.showSuccess(product.name + ' ' + 'added in the cart')




    this.olditems.forEach((item)=>{
      if(item.name === product.name){
        item.quantity = item.quantity + 1;
        localStorage.setItem('products',JSON.stringify(this.olditems));
      }
    })

    let cartitems;

    cartitems = JSON.parse(localStorage.getItem('products'));

    cartitems.forEach((item)=>{
      this.cartitems =this.cartitems + item.quantity;
    });

    this.common.cartitems.next(this.cartitems);

    this.cartitems = 0;
  }

  gotobag(){
    this.router.navigate(['/cart']);
  }

}
