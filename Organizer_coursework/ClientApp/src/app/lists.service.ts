import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddItem } from './models/add-item.model';
import { AddList } from './models/add-list.model';
import { EditItem } from './models/edit-item.model';
import { Item } from './models/item.model';
import { List } from './models/list.model';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private http: HttpClient) { }

  listsUrl = 'api/lists';
  itemsUrl = 'api/items';

  getLists$(): Observable<List[]>{
    return this.http.get<List[]>(this.listsUrl);
  }

  getList$(id: string): Observable<List>{
    return this.http.get<List>(`${this.listsUrl}/${id}`);
  }

  addList$(newList: AddList): Observable<any>{
    return this.http.post(this.listsUrl, newList);
  }

  delList$(id: string): Observable<any>{
    return this.http.delete(`${this.listsUrl}/${id}`);
  }

  getItem$(id: string): Observable<Item>{
    return this.http.get<Item>(`${this.itemsUrl}/${id}`);
  }

  addItem$(id: string, newItem: AddItem): Observable<any> {
    return this.http.post(`${this.itemsUrl}/${id}`, newItem);
  }

  editItem$(id: string, item: EditItem): Observable<any> {
    return this.http.put(`${this.itemsUrl}/${id}`, item);
  }

  delItem$(id: string): Observable<any>{
    return this.http.delete(`${this.itemsUrl}/${id}`);
  }
}
