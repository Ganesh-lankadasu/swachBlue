import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { PageEvent } from '../../../node_modules/@angular/material/paginator';
import { NotificationService } from '../notification.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  name="Products";
  items:any;
  totalproducts = 50;
  currentpage = 1;
  productsperpage = 8;
  productsizeoptions = [1,2,5,10];
  localitem:any[]=[];
  catagoryitem:any;
  isproducts = true;
  isitem = false;
  olditems:any[]=[];
  cartitems:number=0;


  constructor(public common:CommonService,
  private notify:NotificationService,
private router:Router) { }

  ngOnInit(): void {

    this.common.olditems.subscribe((res)=>{
      this.olditems = res;
    })
    this.localitem = JSON.parse(localStorage.getItem('products'))
    window.scroll(0,0);
    this.common.getPosts(this.productsperpage,this.currentpage).subscribe((res)=>{
      console.log(res);
      this.items=res.products;
      this.items.forEach((proo)=>{
        proo.addedToCart = false;
      })
    })

    let items = Array.from(document.querySelectorAll('.catagories-container li'));

    items.forEach((item)=>{
      item.addEventListener('click',()=>{
        items.forEach((itemee)=>{
          itemee.classList.remove('active')
        })
        item.classList.add('active');
      })
    })
  }

  pagechanged(pagedata:PageEvent){
    this.currentpage = pagedata.pageIndex + 1;
    this.common.getPosts(this.productsperpage,this.currentpage).subscribe((res)=>{
      console.log(res);
      this.items=res.products;
      window.scroll(0,200);
    })

  }

  addtocart(product){

    product.addedToCart = true;
    product.quantity = 1;



    this.localitem.push(product);
    localStorage.setItem('products',JSON.stringify(this.localitem));
    this.notify.showSuccess(product.name + ' ' + 'added in the cart');

    console.log(this.olditems);


    this.olditems.forEach((item)=>{
      if(item.name === product.name){
        item.quantity = item.quantity + 1;
        console.log(this.olditems);
        localStorage.setItem('products',JSON.stringify(this.olditems));
      }
    })
 

  let items;

  items = JSON.parse(localStorage.getItem('products'));

  items.forEach((item)=>{
    this.cartitems = this.cartitems + item.quantity;
  })

  this.common.cartitems.next(this.cartitems);

  this.cartitems = 0;

  }

  gotobag(){
    this.router.navigate(['/cart'])
  }

  getitems(itemed){
    this.common.getitems(itemed).subscribe((res)=>{
     this.catagoryitem = res;
     this.catagoryitem.forEach((pro)=>{
       pro.addToCart = false;
     })
      console.log(this.catagoryitem);
      this.isproducts = false;
      this.isitem = true;
    })
  }

  getproducts(){

    this.common.getPosts(this.productsperpage,this.currentpage).subscribe((res)=>{
      console.log(res);
      this.items=res.products;
    })

    this.isproducts = true;
    this.isitem = false;

  }

}
