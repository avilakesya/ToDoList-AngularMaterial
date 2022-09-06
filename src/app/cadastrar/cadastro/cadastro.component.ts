import { taskCategoria } from './../../model/taskCategoria';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from './../../service/service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: Task[] = [];
  updateId!: number;

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router ) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataCompleta: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  addTask() {
    if (this.todoForm.valid) {
      this.service.addTask(this.todoForm.value).subscribe({
        next: (res) => {
          alert("Tarefa adicionada com sucesso")
          this.router.navigate([""]);
        },
        error:() => {
          alert("Erro ao adicionada a tarefa")
        }
      })
    }
  }

  categorias: taskCategoria[] = [
    {valor: 1, viewValor: 'Facil'},
    {valor: 2, viewValor: 'Dificil'},
    {valor: 3, viewValor: 'Urgente'},
    {valor: 4, viewValor: 'Prioritária'}
  ];
}
