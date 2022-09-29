import { CadastroComponent } from './cadastrar/cadastro/cadastro.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { TodoComponent } from './todo/todo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'', component: TodoComponent
},
{
  path: 'task', component: CadastroComponent
},
{
  path: 'task/atualizar/:id', component: AtualizarComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
