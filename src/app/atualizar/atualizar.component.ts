import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { Task } from '../model/task';
import { taskCategoria } from '../model/taskCategoria';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: Task [] = [];

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateCompletion: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  atualizarTask() {
    let id = +this.route.snapshot.params['id'];

    this.service.editTask(this.todoForm.value, id).subscribe({
      next: (res) => {
        alert("Tarefa alterada com sucesso")
        this.router.navigate([""]);
      },
      error: () => {
        alert("Erro ao alterar a tarefa")
      }
    })
  }

  categorias: taskCategoria[] = [
    { valor: 1, viewValor: 'Fácil' },
    { valor: 2, viewValor: 'Difícil' },
    { valor: 3, viewValor: 'Urgente' },
    { valor: 4, viewValor: 'Prioritário' },
  ];

}
