import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { Observable } from 'rxjs';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  baseUrl: string = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) { }

  addTask(tarefa: Task) : Observable<Task>{
    tarefa.dataCompleta = moment(tarefa.dataCompleta).format('DD-MM-YYYY');
    return this.http.post<Task>(this.baseUrl, tarefa)
  }

  getTask() : Observable<Task[]>{
    return this.http.get<Task[]>(this.baseUrl)
  }

  deleteTask(id: number) : Observable<Task>{
    return this.http.delete<Task>(this.baseUrl + '/'+ id)
  }

  editTask(tarefa: Task, id: number) : Observable<Task>{
    tarefa.dataCompleta = moment(tarefa.dataCompleta).format('DD-MM-YYYY');
    return this.http.put<Task>(this.baseUrl + '/' + id, tarefa)
  }

}
