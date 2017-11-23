import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { FileUpload } from 'primeng/primeng';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadService } from 'app/servicos/upload.service';

@Component({
  selector: 'app-form-tarefas',
  templateUrl: './form-tarefas.component.html',
  styleUrls: ['./form-tarefas.component.css']
})
export class FormTarefasComponent implements OnInit {
  username: any;
  user: any;
  listatarefas: any[];
  datain_item: any;
  datafim_item: any;
  mensagem: string = "";
  comentarios: any[];
  psdTemplates: any;
  modoedicao = true;
  uploadedFiles: any[] = [];
  @ViewChild('fileInput') fileInput: FileUpload;
  @ViewChild('dialoglinhas') dialoglinhas: ElementRef;
  @ViewChild('closedialoglinha') closedialoglinha: ElementRef;


  constructor(private renderer: Renderer, private UploadService: UploadService, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.username = JSON.parse(localStorage.getItem('userapp'))["nome"];

    this.comentarios = [{id:"000", utilizador: "TIAGO", letra: "T", mensagem: "Fiz a Etapa 1", data: "2017-11-22" }];

    this.listatarefas = [{estado : false,titulo:"Controlo Tina 1",user:"Manuel Santos",data_ini:new Date().toLocaleDateString(),data_fim:new Date().toLocaleDateString(),obs:"Atenção ao nível da água"}];
  }

  onUpload(event) {
    let files = this.fileInput.files;
    this.fileInput.progress = 0;

    for (var x in files) {
      this.fileInput.progress = ((parseInt(x) + 1) / files.length) * 100;
      this.uploadedFiles.push(files[x]);
      /* this.UploadService.fileChange(file).subscribe(result => {
         
       },
         error => { console.log(error); });*/
    }
    this.fileInput.files = [];
    this.fileInput.progress = 0;
  }

  addmessage() {
    this.comentarios.push({ id:this.user,utilizador: this.username, letra: "U", mensagem: this.mensagem, data: "2017-11-22" })

    this.mensagem = "";
  }


  adicionar() {
    this.datain_item = "";
    this.datafim_item = "";
    this.simular(this.dialoglinhas);
  }

  gravaritem(){
    this.listatarefas.push({estado : false,titulo:"Ver Tina 2",user:"Ana",data_ini: new Date().toLocaleDateString(this.datain_item),data_fim: new Date().toLocaleDateString(this.datafim_item),obs:"Teste obs"});
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
  
}