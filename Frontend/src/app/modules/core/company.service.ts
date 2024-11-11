import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICompany } from '../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private company = new BehaviorSubject<ICompany>({
    id: 0,
    name: "Company"
  })

  constructor(private http: HttpClient) { }

  public Company(): Observable<ICompany>  {
    return this.company
  }
}
