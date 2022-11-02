import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from 'src/app/product';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {



  public olditems = new BehaviorSubject([]);

  public cartitems = new BehaviorSubject(0);

  public isLoading = new BehaviorSubject(true);
  
  constructor(private http:HttpClient) { }

  getPosts(productsperpage?:number,page?:number){
    const queryparams = `?pagesize=${productsperpage}&page=${page}`
    return this.http.get<{message:string,products:Array<Product>}>('http://localhost:3000/api/posts'+queryparams);
  }

  Sendpost(post){
    return this.http.post('http://localhost:3000/api/post',post)

  }

  deletepost(id){
    return this.http.delete<{message:string}>('http://localhost:3000/api/post/' + id)
  }

  getitems(item){
    return this.http.get('http://localhost:3000/api/fetch/' + item);
  }
}
