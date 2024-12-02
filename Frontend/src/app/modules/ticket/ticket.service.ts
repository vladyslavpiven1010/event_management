import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITicket } from '../shared/entities';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()

export class TicketService {
  constructor(private http: HttpClient) { }

  public getTickets(id: number): Observable<ITicket[]> {
    console.log('http://localhost:5000/ticket?userId=' + id)
    return this.http.get<ITicket[]>('http://localhost:5000/ticket?userId=' + id)
  }
}
