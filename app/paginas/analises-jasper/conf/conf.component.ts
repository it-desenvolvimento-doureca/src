import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { TreeModule, IActionMapping, TREE_ACTIONS, TreeComponent } from 'angular-tree-component';
import * as _ from 'lodash';
import { GERANALISESService } from 'app/servicos/ger-analises.service';
import { GER_ANALISES } from 'app/entidades/GER_ANALISES';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-conf',
  templateUrl: './conf.component.html',
  styleUrls: ['./conf.component.css']
})
export class ConfComponent implements OnInit {
  node_string;
  nome_no: string;
  node_id: any;
  tree_select = false;
  estado: any;
  link: any;
  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  modoedicao = true;
  nodes = [];

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;

  actionMapping: IActionMapping = {
    mouse: {
      click: (tree, node, $event) => {
        this.click_tree(node);
        TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event);
      },
      dblClick: TREE_ACTIONS.TOGGLE_EXPANDED

      // Open a modal with node content,
    }
  }
  treeOptions = { actionMapping: this.actionMapping }

  constructor(private renderer: Renderer, private GERANALISESService: GERANALISESService, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);

    this.globalVar.setdisEditar(false);


    var array = [{ id: 0, parent: null, name: 'Root', link: null, ativo: true }];

    this.GERANALISESService.getAll().subscribe(result => {
      for (var x in result) {
        array.push({ id: result[x].id, parent: result[x].id_PAI, name: result[x].descricao, link: result[x].link, ativo: result[x].ativo })
      }


      for (var x in array) {
        if (array[x].parent == null) {
          this.nodes.push({ id: array[x].id, parent: array[x].parent, name: array[x].name, link: array[x].link, children: [], ativo: array[x].ativo });

          this.getFilhos(array, array[x].id, this.nodes.find(item => item.id == array[x].id));
        }
      }


      this.tree.treeModel.update();
    }, error => { console.log(error); });
  }

  //adicionar nó
  addtree() {
    let selected = this.tree.treeModel.getNodeById(this.node_id);
    this.tree.treeModel.setExpandedNode(selected, selected.data);

    var data = new GER_ANALISES;
    data.ativo = false;
    data.id_PAI = this.node_id;
    data.descricao = 'Novo';

    this.GERANALISESService.create(data).subscribe(result => {
      selected.data.children.push({ id: result.id, parent: this.node_id, name: 'Novo', link: null, children: [], ativo: result.ativo });
      this.tree.treeModel.update();

      let selected2 = this.tree.treeModel.getNodeById(result.id);
      this.tree.treeModel.setActiveNode(selected2, selected2.data);
      this.simular(this.inputgravou);
      this.click_tree(selected2);

    }, error => { console.log(error); this.simular(this.inputerro); });
  }

  click_tree(node) {
    this.link = node.data.link;
    this.estado = node.data.ativo;
    this.tree_select = true;
    this.node_id = node.data.id;
    this.nome_no = node.data.name;
  }

  getFilhos(array, id_pai, arr) {
    for (var x in array) {
      if (array[x].parent == id_pai) {

        arr.children.push({ id: array[x].id, parent: array[x].parent, name: array[x].name, link: array[x].link, children: [], ativo: array[x].ativo });
        this.getFilhos(array, array[x].id, arr.children.find(item => item.id == array[x].id));
      }
    }
  }


  //gravar dados nó
  gravar() {
    this.GERANALISESService.getbyID(this.node_id).subscribe(result => {
      var data = new GER_ANALISES;
      data = result[0];
      data.ativo = this.estado;
      data.descricao = this.nome_no;
      data.link = this.link;

      this.GERANALISESService.update(data).subscribe(res => {
        let selected = this.tree.treeModel.getNodeById(this.node_id);
        selected.data.ativo = res.ativo;
        selected.data.name = res.descricao;
        selected.data.link = res.link;
        this.tree.treeModel.update();
        this.simular(this.inputgravou);
      }, error => { console.log(error); this.simular(this.inputerro); });
    }, error => { console.log(error); this.simular(this.inputerro); });
  }



  //remover nó
  remover() {

    this.GERANALISESService.delete(this.node_id).then(result => {
      let nodeToDelete = this.tree.treeModel.getNodeById(this.node_id);
      this.removeNode(nodeToDelete);
      this.tree_select = false;
    }, error => { console.log(error); });

  }

  removeNode(node) {
    _.remove(node.parent.data.children, node.data);
    this.tree.treeModel.update();
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
