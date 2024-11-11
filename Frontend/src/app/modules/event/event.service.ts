import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory, IComment, IEvent, IFilters, IPost, QueryOptions } from '../shared/entities';
import { ESorting } from '../shared/enums';
import { ICreateComment, ICreateEvent, ICreatePost } from '../shared/create-entities';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) { }

  public getEvents(filters: IFilters, sorting: ESorting): Observable<IEvent[]> {
    return this.http.get<IEvent[]>('http://localhost:5000/event?category_id=' + filters.filterCategory + '&format=' + filters.filterFormat + '&sort=' + sorting);
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

  public getPosts(eventId: string | number): Observable<IPost[]> {
    return this.http.get<IPost[]>('http://localhost:5000/post?event_id=' + eventId)
  }

  public createPost(post: ICreatePost): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:5000/post', post)
  }

  ////////////////////////////////

  public getComments(eventId: string | number): Observable<IComment[]> {
    return this.http.get<IComment[]>('http://localhost:5000/comment?event_id=' + eventId)
  }

  public createComment(comment: ICreateComment): Observable<boolean> {
    return this.http.post<boolean>('http://localhost:5000/comment', comment)
  }
}