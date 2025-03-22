import { ApiService } from '@realworld/core/http-client';
import { User, UserResponse } from '@realworld/core/api-types';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser, LoginUserRequest, NewUserRequest, NewUser } from '@realworld/core/api-types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiService = inject(ApiService);

  user(): Observable<UserResponse> {
    return this.apiService.get<UserResponse>('/user');
  }

  update(user: User): Observable<UserResponse> {
    return this.apiService.put('/user', { user });
  }

  login(credentials: LoginUser): Observable<UserResponse> {
    return this.apiService.post<UserResponse, LoginUserRequest>('/users/login', { user: credentials });
  }

  logout(): Observable<{ message: string }> {
    return this.apiService.post<{ message: string }, void>('/users/logout');
  }

  register(credentials: NewUser): Observable<User> {
    return this.apiService.post<User, NewUserRequest>('/users', { user: credentials });
  }
}
