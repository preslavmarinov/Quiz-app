import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, find } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl:string = 'http://localhost:3000/users';

  constructor(private http:HttpClient) { }

  getUsers(): Observable<any | undefined> {
    return this.http.get<any>(this.baseUrl);
  }

  getUserById(id:string) : Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(user:User) : Observable<User> {
    return this.http.post<User>(this.baseUrl,user);
  }
}
