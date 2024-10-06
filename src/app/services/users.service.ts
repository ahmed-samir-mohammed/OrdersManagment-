import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.USERS_API_URL}/users`);
  }

  getUserByID(userId: string): Observable<User> {
    return this.http.get<User>(`${environment.USERS_API_URL}/users/${userId}`);
  }
}
