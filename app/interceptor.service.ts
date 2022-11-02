import { Injectable } from '@angular/core';
import { HttpInterceptor } from '../../node_modules/@angular/common/http/http';
import { CommonService } from './common.service';
import { finalize } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private comm:CommonService) { }

  intercept(req:any,next:any):any{

    this.comm.isLoading.next(true);

    return next.handle(req).pipe(
      finalize(()=>{
        this.comm.isLoading.next(false);
      })
    )
    
  }
}
