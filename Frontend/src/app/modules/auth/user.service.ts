import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private user = new BehaviorSubject<string>("")

  constructor(private http: HttpClient) { }

  public User(): Observable<string>  {
    return this.user
  }
}
