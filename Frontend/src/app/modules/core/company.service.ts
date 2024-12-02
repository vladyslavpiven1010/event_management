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
    name: "Company",
    description: "blablabla_record_1",
    country_code: "UA-1234",
    is_verified: true,
    created_at: new Date("Fri Dec 08 2019 07:44:57"),
    deleted_at: new Date("Fri Dec 08 2020 07:44:57"),
  })

  constructor(private http: HttpClient) { }

  public Company(): Observable<ICompany>  {
    return this.company
  }
}
