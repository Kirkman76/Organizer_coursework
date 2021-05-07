import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from './models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private http: HttpClient) { }

  listsUrl = 'api/lists';

  getLists$(): Observable<List[]>{
    return this.http.get<List[]>(this.listsUrl)
  }

  getList$(id: string): Observable<List>{
    return this.http.get<List>(`${this.listsUrl}/${id}`);
  }

  delList$(id: string): Observable<any>{
    return this.http.delete(`${this.listsUrl}/${id}`)
  }
}
