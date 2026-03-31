import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../../models/user/create-user-request';
import { User } from '../../core/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/user/all');
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`/api/user/${email}`);
  }

  getUserByUserId(id: number): Observable<User> {
    return this.http.get<User>(`/api/user/${id}`);
  }

  createUser(request: CreateUserRequest): Observable<User> {
    return this.http.post<User>('/api/user', request);
  }

  updateUser(request: CreateUserRequest, id: number): Observable<User> {
    return this.http.put<User>(`/api/user/update/${id}`, request);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`/api/user/delete/${id}`);
  }
}
