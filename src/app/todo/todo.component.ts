import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../model/task';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoForm! : FormGroup;
  tasks: Task [] = [];
  progresso : Task[] = [];
  concluido : Task [] = [];
  updateIndex! : any;
  isEditEnabled : boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
    });
  }

  addTask(){
    this.tasks.push({
      descricao:this.todoForm.value.item,
      concluido: false

    });
    this.todoForm.reset();
  }

  edit(item:Task, i : number){
    this.todoForm.controls['item'].setValue(item.descricao);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask(){
    this.tasks[this.updateIndex].descricao = this.todoForm.value.item;
    this.tasks[this.updateIndex].concluido = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  deleteTask(i: number){
    this.tasks.splice(i,1)
  }
  deleteProgressoTask(i: number){
    this.progresso.splice(i,1)
  }
  deleteConcluidoTask(i: number){
    this.concluido.splice(i,1)
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
