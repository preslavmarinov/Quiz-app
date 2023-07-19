import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, find, map} from 'rxjs';
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

  checkUserLogin(email:string, password:string):Observable<User | undefined> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map((users:User[]) => {
        return users.find((user: User) => user.email === email && user.password === password);
      })
    )
  }
  createUser(user:User) : Observable<User> {
    return this.http.post<User>(this.baseUrl,user);
  }
  deleteUser(id:number): Observable<{}> {
    return this.http.delete<{}>(`${this.baseUrl}/${id}`);
  }
}
