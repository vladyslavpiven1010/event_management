import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ICategory, IEvent, IFilters } from '../shared/entities';
import { ESorting } from '../shared/enums';
import { ICreateComment, ICreateEvent, ICreatePost } from '../shared/create-entities';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) { }

  event: IEvent[] = [
    {
      id: 1,
      company_id: 1,
      category_id: 1,
      name: "Lorem ipsum event 1",
      description: "blablabla_1",
      ticket_count: 40,
      ticket_price: 2.5,
      date: new Date("Fri Dec 08 2024 19:00"),
      created_at: new Date("Mon Dec 04 2024 07:44:57"),
      deleted_at: new Date("Fri Dec 08 2024 21:00"),
      lat: 49,
      lng: 51
    }, 
    {
      id: 2,
      company_id: 1,
      category_id: 1,
      name: "Lorem ipsum event 2",
      description: "blablabla_2",
      ticket_count: 50,
      ticket_price: 2.5,
      date: new Date("Mon Dec 10 2024 19:00"),
      created_at: new Date("Wed Dec 06 2024 07:44:57"),
      deleted_at: new Date("MonDec 10 2024 21:00"),
      lat: 40,
      lng: 49
    }
  ]
  
  // Get events based on the provided filters
  public getEvents(filters: IFilters, sorting: ESorting): Observable<IEvent[]> {
    console.log(filters)
    //return this.http.get<IEvent[]>('http://localhost:5000/event?category_id=' + filters.filterCategory + '&format=' + filters.filterFormat + '&sort=' + sorting);
    const filteredEvents = this.event.filter((event) => {
      return filters.filterCategory == 0 || event.category_id === filters.filterCategory;
    })

    // Return an observable of the filtered events array
    return of(filteredEvents);
}

  public getEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>('http://localhost:5000/event/' + id)
  }

  public createEvent(event: ICreateEvent): void {
    console.log(event)
    this.http.post('http://localhost:5000/event', event)
  }

  /////////////////////////////

  public getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('http://localhost:5000/category/')
  }

  public getCategory(id: string | number): Observable<ICategory> {
    return this.http.get<ICategory>('http://localhost:5000/category/' + id)
  }

  ////////////////////////////////

  // public getPosts(eventId: string | number): Observable<IPost[]> {
  //   return this.http.get<IPost[]>('http://localhost:5000/post?event_id=' + eventId)
  // }

  // public createPost(post: ICreatePost): Observable<boolean> {
  //   return this.http.post<boolean>('http://localhost:5000/post', post)
  // }

  ////////////////////////////////

  // public getComments(eventId: string | number): Observable<IComment[]> {
  //   return this.http.get<IComment[]>('http://localhost:5000/comment?event_id=' + eventId)
  // }

  // public createComment(comment: ICreateComment): Observable<boolean> {
  //   return this.http.post<boolean>('http://localhost:5000/comment', comment)
  // }
}