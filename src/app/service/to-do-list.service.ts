import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../interface/pagination';
import { ToDoList } from '../interface/to-do-list';

@Injectable({
  providedIn: 'root',
})
export class ToDoListService {


  constructor(private httpClient: HttpClient) {}

  public getPagination(skip: number, take: number) {
    return this.httpClient.get<Pagination<ToDoList>>('ToDoList');
  }

  public getById(id: string) {
    return this.httpClient.get<ToDoList>('ToDoList/' + id);
  }

  public insert(toDoList: ToDoList) {
    return this.httpClient.post<ToDoList>('ToDoList', toDoList);
  }

  public update(toDoList: ToDoList) {
    return this.httpClient.put<ToDoList>('ToDoList', toDoList);
  }

  public delete(id: string) {
    return this.httpClient.delete('ToDoList/' + id);
  }

}
