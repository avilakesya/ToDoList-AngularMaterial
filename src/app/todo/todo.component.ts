import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../model/task';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {

  tasks: Task [] = [];
  taskFacil: Task [] = [];
  taskDificil: Task [] = [];
  taskUrgente: Task [] = [];
  taskPrioritaria: Task [] = [];
  concluido: Task [] = [];

  constructor(private router: Router, private service: ServiceService ,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getTask();
  }

  getTask() {
    this.service.getTask().subscribe({
      next: (res) => {
        this.tasks = res;
        this.taskFacil = res;
        this.taskDificil = res;
        this.taskUrgente = res;
        this.taskPrioritaria = res;
      },
      error:() => {
        alert("Erro ao listar as tarefas")
      }
    })
  }

  deleteTask(id: number) {
    this.service.deleteTask(id).subscribe({
      next: (res) => {
        alert("Tarefa excluída com sucesso")
        this.getTask();
      },
      error:() => {
        alert("Erro ao excluír a tarefa")
      }
    })
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
