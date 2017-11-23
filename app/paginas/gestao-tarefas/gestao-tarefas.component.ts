import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestao-tarefas',
  templateUrl: './gestao-tarefas.component.html',
  styleUrls: ['./gestao-tarefas.component.css']
})
export class GestaoTarefasComponent implements OnInit {
  cols= [];

  constructor(private router: Router) { }

  ngOnInit() {

    this.cols = [{nome:"Testar Página",responsavel:"Tiago",data_inicio:"2017-11-21",data_limite:"2017-12-21",progresso:10,estado:"Iniciada"}]
  }

   //clicar 2 vezes na tabela abre linha
   abrir(event) {
    this.router.navigate(['teste2']);
  }

}
