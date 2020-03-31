import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }
  
  apiUrl : string =  environment.apiUrl; 
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
     
  getAllUsers():Observable<User[]>{
    return  this.http.get<User[]>(this.apiUrl + '/users/all' , this.httpOptions);
   }
 
   AddUser(obj): Observable<User>{
     return this.http.post<any>(this.apiUrl+'/users',obj,this.httpOptions);
   }
 
   DeleteUser(id):Observable<any>{
    
     return this.http.delete<any>(this.apiUrl + '/users/' + id , this.httpOptions);
   }
}
