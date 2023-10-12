import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  
  
  constructor(private http:HttpClient) { 
  }
  
  sendMessage(payload:any){
    
    return this.http.post('http://127.0.0.1:8000/predict',payload);
   }

}