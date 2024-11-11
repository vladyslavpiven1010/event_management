import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginUser, IRegisterUser, IUser } from './entities';
import { Observable } from 'rxjs';
import { UserStatus } from './entities';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  register(user: IRegisterUser): void {
    let userStatus: UserStatus
    console.log(user)
    this.http.post<IUser>('http://localhost:5001/register', user).subscribe((user) => {
      //localStorage.setItem('token', user.);
      console.log(user)
    }, error => console.log(error)
    );
  }

  login(user: ILoginUser): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:5001/authorize', user);
  }

  verifyGet(): Observable<boolean> {
    return this.http.get<boolean>('http://localhost:5001/verify');
  }

  verifyGPost(code: number): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:5001/verify', {code: code});
  }
}
