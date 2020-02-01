import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ServiceService } from '../service';
import { AuthResponse } from './auth-response';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient,
    private storage: Storage,
    private service: ServiceService
  ) { }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set('ACCESS_TOKEN', res.user.access_token);
          await this.storage.set('EXPIRES_IN', res.user.expires_in);
          this.authSubject.next(true);
        }

      })

    );
  }

  login(user: User) {
    return this.httpClient.get<any>(`${this.AUTH_SERVER_ADDRESS}/login?email=${user.email}&&password=${user.password}`).pipe(
      tap(async (res: any) => {
        if (res[0]) {
          await this.storage.set('ACCESS_TOKEN', res[0].access_token);
          await this.storage.set('EXPIRES_IN', res[0].expires_in);
          this.authSubject.next(true);
        }

      })

    );
  }

  async logout() {
    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }



}
