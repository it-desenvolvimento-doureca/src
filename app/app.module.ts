import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './paginas/home/home.component';
import { RouterComponent } from "app/router.component";
import { FornecedoresComponent } from './paginas/fornecedores/fornecedores.component';
import { TinasComponent } from './paginas/tinas/tinas.component';
import { DataTableModule, SharedModule, ConfirmDialogModule, ConfirmationService, DropdownModule, CalendarModule, DialogModule, ColorPickerModule, RadioButtonModule, TreeNode, ChartModule, PickListModule, MultiSelectModule, EditorModule, AutoCompleteModule, ProgressBarModule, FileUploadModule, ToggleButtonModule, ListboxModule, ScheduleModule, OrderListModule, PanelModule, SelectButtonModule } from 'primeng/primeng';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { FormComponent } from './paginas/fornecedores/form/form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "app/servicos/LoginService";
import { TinasformComponent } from './paginas/tinas/tinasform/tinasform.component';
import { ComponentesComponent } from './paginas/componentes/componentes.component';
import { CompformComponent } from './paginas/componentes/compform/compform.component';
import { UtilizadoresComponent } from './paginas/utilizadores/utilizadores.component';
import { UtlformComponent } from './paginas/utilizadores/utlform/utlform.component';
import { BanhosComponent } from './paginas/banhos/banhos.component';
import { BanhosformComponent } from './paginas/banhos/banhosform/banhosform.component';
import { GERFORNECEDORService } from "app/servicos/ger-fornecedor.service";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";
import { ABDICTINAService } from "app/servicos/ab-dic-tina.service";
import { ControlosComponent } from './cabecalho/controlos/controlos.component';
import { ABDICBANHOService } from "app/servicos/ab-dic-banho.service";
import { ABDICBANHOCOMPONENTEService } from "app/servicos/ab-dic-banho-componente.service";
import { ABDICCOMPONENTEService } from "app/servicos/ab-dic-componente.service";
import { Ng2MaskModule } from 'ng2-mask'
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { ABUNIDADADEMEDIDAService } from "app/servicos/ab-unidade-medida.service";
import { ConfiguracoesComponent } from './paginas/configuracoes/configuracoes.component';
import { RegistoanalisesComponent } from './paginas/registoanalises/registoanalises.component';
import { RegistoformComponent } from './paginas/registoanalises/registoform/registoform.component';
import { ABMOVANALISEService } from "app/servicos/ab-mov-analise.service";
import { ABMOVANALISELINHAService } from "app/servicos/ab-mov-analise-linha.service";
import { ManutencaoComponent } from './paginas/manutencao/manutencao.component';
import { ManutencaoformComponent } from './paginas/manutencao/manutencaoform/manutencaoform.component';
import { ABDICBANHOADITIVOService } from "app/servicos/ab-dic-banho-aditivo.service";
import { ABDICTIPOMANUTENCAOService } from "app/servicos/ab-dic-tipo-manutencao.service";
import { ABDICTURNOService } from "app/servicos/ab-dic-turno.service";
import { ABMOVMANUTENCAOService } from "app/servicos/ab-mov-manutencao.service";
import { ABDICTIPOADICAOService } from "app/servicos/ab-dic-tipo-adicao.service";
import { ABDICTIPOOPERACAOService } from "app/servicos/ab-dic-tipo-operacao.service";
import { ABMOVMANUTENCAOCABService } from "app/servicos/ab-mov-manutencao-cab.service";
import { ABMOVMANUTENCAOLINHAService } from "app/servicos/ab-mov-manutencao-linha.service";
import { LinhasComponent } from './paginas/parametrosanalisebanhos/linhas/linhas.component';
import { UnidadesmedidaComponent } from './paginas/parametrosanalisebanhos/unidadesmedida/unidadesmedida.component';
import { ZonasComponent } from './paginas/parametrosanalisebanhos/zonas/zonas.component';
import { TurnosComponent } from './paginas/parametrosanalisebanhos/turnos/turnos.component';
import { TipoadicaoComponent } from './paginas/parametrosanalisebanhos/tipoadicao/tipoadicao.component';
import { TipomanutenacaoComponent } from './paginas/parametrosanalisebanhos/tipomanutenacao/tipomanutenacao.component';
import { TipooperacaoComponent } from './paginas/parametrosanalisebanhos/tipooperacao/tipooperacao.component';
import { ABDICZONAService } from "app/servicos/ab-dic-zona.service";
import { RegistoparametrosComponent } from './paginas/registoparametros/registoparametros.component';
import { RegistoparaformComponent } from './paginas/registoparametros/registoparaform/registoparaform.component';
import { ADMOVREGPARAMOPERACAOService } from "app/servicos/ad-mov-reg-param-operacao.service";
import { RelatoriosService } from "app/servicos/relatorios.service";
import { RelatorioViewerComponent } from './paginas/relatorio-viewer/relatorio-viewer.component';
import { EmailService } from "app/servicos/email.service";
import { GERPERFILCABService } from "app/servicos/ger-perfil-cab.service";
import { GERMODULOService } from "app/servicos/ger-modulo.service";
import { GERPERFILLINService } from "app/servicos/ger-perfil-lin.service";
import { GERUTZPERFILService } from "app/servicos/ger-utz-perfil.service";
import { CheckboxModule } from "primeng/components/checkbox/checkbox";
import { ArmazensComponent } from 'app/paginas/parametrosanalisebanhos/armazens/armazens.component';
import { GERARMAZEMService } from 'app/servicos/ger-armazem.service';
import { GestaoeventosComponent } from './paginas/gestaoeventos/gestaoeventos.component';
import { DragDropModule } from 'primeng/components/dragdrop/dragdrop';
import { EventoslistaComponent } from './paginas/eventoslista/eventoslista.component';
import { GEREVENTOSCONFService } from 'app/servicos/ger-eventos-conf.service';
import { HistoricoAnalisesComponent } from './paginas/historico-analises/historico-analises.component';
import { ListaComponent } from './paginas/analises-jasper/lista/lista.component';
import { ConfComponent } from './paginas/analises-jasper/conf/conf.component';
import { ViewerComponent } from './paginas/analises-jasper/viewer/viewer.component';
import { TreeModule } from 'angular-tree-component';
import { GERANALISESService } from 'app/servicos/ger-analises.service';
import { AgGridModule } from 'ag-grid-angular';
import { HeaderComponent } from 'app/paginas/header-componente/header.component';
import { HeaderGroupComponent } from 'app/paginas/header-group-componente/header-group.component';
import { HistoricoManutencoesComponent } from './paginas/historico-manutencoes/historico-manutencoes.component';
import { ParametrosComponent } from './paginas/parametros/parametros.component';
import { GERPARAMETROSService } from 'app/servicos/ger-parametros.service';
import { GestaoTarefasComponent } from './paginas/gestao-tarefas/gestao-tarefas.component';
import { FormTarefasComponent } from './paginas/gestao-tarefas/form-tarefas/form-tarefas.component';
import { UploadService } from 'app/servicos/upload.service';
import { RegistoProducao } from 'app/servicos/registoproducao.service';
import { GERVISTASService } from 'app/servicos/ger-vistas.service';
import { GERCAMPOSDISPService } from 'app/servicos/ger-campos-disp.service';
import { ConstrucaoBanhosComponent } from './paginas/construcao-banhos/construcao-banhos.component';
import { ConstbanhosformComponent } from './paginas/construcao-banhos/constbanhosform/constbanhosform.component';
import { GERPOSTOSService } from 'app/servicos/ger-postos.service';
import { GestaoBanhosComponent } from './paginas/home-modulo/gestao-banhos/gestao-banhos.component';
import { ManutencaoReposicaoComponent } from './paginas/manutencao-reposicao/manutencao-reposicao.component';
import { ManutecaoReposicaoformComponent } from './paginas/manutencao-reposicao/manutecao-reposicaoform/manutecao-reposicaoform.component';
import { ManutencaoNaoProgramadaComponent } from './paginas/manutencao-nao-programada/manutencao-nao-programada.component';
import { MantencaoNaoProgramadafromComponent } from './paginas/manutencao-nao-programada/mantencao-nao-programadafrom/mantencao-nao-programadafrom.component';
import { ParametrosRaksComponent } from './paginas/parametros-raks/parametros-raks.component';
import { CartelasComponent } from './paginas/lmep/cartelas/cartelas.component';
import { ABDICLINHAOFService } from './servicos/ab-dic-linha-of.service';
import { ABMOVMANUTENCAOETIQService } from 'app/servicos/ab-mov-manutencao-etiq.service';
import { CalendarioComponent } from './paginas/gestao-tarefas/calendario/calendario.component';
import { ListagemManutencoesComponent } from './paginas/listagem-manutencoes/listagem-manutencoes.component';
import { AnaliseconsumosComponent } from './paginas/consultas/analiseconsumos/analiseconsumos.component';
import { GestaoeventostemporaisComponent } from './paginas/gestaoeventostemporais/gestaoeventostemporais.component';
import { GEREVENTOSPROGRAMADOSService } from './servicos/ger-eventos-programados.service';
import { ListaeventostempComponent } from './paginas/gestaoeventostemporais/listaeventostemp/listaeventostemp.component';
import { CorrecaoquantidadesComponent } from './paginas/utilitarios/correcaoquantidades/correcaoquantidades.component';
import { AnaliseEtiquetasComponent } from './paginas/utilitarios/analise-etiquetas/analise-etiquetas.component';
import { AnaliseconsumosetiquetasComponent } from './paginas/consultas/analiseconsumosetiquetas/analiseconsumosetiquetas.component';
import { TarefasComponent } from './paginas/home-modulo/tarefas/tarefas.component';
import { ProdutosComponent } from './paginas/moduloepi/produtos/produtos.component';
import { ReclamacaoCliente8DComponent } from './paginas/modulo_reclamacoes/reclamacao-cliente-8-d/reclamacao-cliente-8-d.component';
import { RejeicoesComponent } from './paginas/modulo_reclamacoes/parametros/rejeicoes/rejeicoes.component';
import { TiposreclamacoesComponent } from './paginas/modulo_reclamacoes/parametros/tiposreclamacoes/tiposreclamacoes.component';
import { GrausimportanciaComponent } from './paginas/modulo_reclamacoes/parametros/grausimportancia/grausimportancia.component';
import { TiposdefeitoComponent } from './paginas/modulo_reclamacoes/parametros/tiposdefeito/tiposdefeito.component';
import { FicheirosanaliseComponent } from './paginas/modulo_reclamacoes/parametros/ficheirosanalise/ficheirosanalise.component';
import { RCDICTIPODEFEITOService } from './servicos/rc-dic-tipo-defeito.service';
import { RCDICTIPORECLAMACAOService } from './servicos/rc-dic-tipo-reclamacao.service';
import { RCDICREJEICAOService } from './servicos/rc-dic-rejeicao.service';
import { RCDICGRAUIMPORTANCIAService } from './servicos/rc-dic-grau-importancia.service';
import { RCDICFICHEIROSANALISEService } from './servicos/rc-dic-ficheiros-analise.service';
import { ListareclamacoesclientesComponent } from './paginas/modulo_reclamacoes/listareclamacoesclientes/listareclamacoesclientes.component';
import { RCMOVRECLAMACAOService } from './servicos/rc-mov-reclamacao.service';
import { TemposrespostaComponent } from './paginas/modulo_reclamacoes/parametros/temposresposta/temposresposta.component';
import { RCDICTEMPORESPOSTAService } from './servicos/rc-dic-tempo-resposta.service';
import { RCMOVRECLAMACAOENVIOSGARANTIDOSService } from './servicos/rc-mov-reclamacao-envios-garantidos.service';
import { RCMOVRECLAMACAOPLANOACCOESCORRETIVASService } from './servicos/rc-mov-reclamacao-plano-accoes-corretivas.service';
import { RCMOVRECLAMACAOARTIGOSIMILARESService } from './servicos/rc-mov-reclamacao-artigo-similares.service';
import { RCMOVRECLAMACAOEQUIPAService } from './servicos/rc-mov-reclamacao-equipa.service';
import { RCMOVRECLAMACAOFICHEIROSService } from './servicos/rc-mov-reclamacao-ficheiros.service';
import { DepartamentosComponent } from './paginas/gestao-utilizadores/departamentos/departamentos.component';
import { ListaSeccoesComponent } from './paginas/gestao-utilizadores/seccoes/lista-seccoes/lista-seccoes.component';
import { FormSeccoesComponent } from './paginas/gestao-utilizadores/seccoes/form-seccoes/form-seccoes.component';
import { FormGruposComponent } from './paginas/gestao-utilizadores/grupos/form-grupos/form-grupos.component';
import { ListaGruposComponent } from './paginas/gestao-utilizadores/grupos/lista-grupos/lista-grupos.component';
import { GERDEPARTAMENTOService } from './servicos/ger-departamento.service';
import { GERSECCAOService } from './servicos/ger-seccao.service';
import { GERSECCAOUTZService } from './servicos/ger-seccao-utz.service';
import { GERGRUPOService } from './servicos/ger-grupo.service';
import { GERGRUPOUTZService } from './servicos/ger-grupo-utz.service';
import { GERSECCAOCHEFESService } from './servicos/ger-seccao-chefes.service';
import { GTDICTarefasComponent } from './paginas/gestao-tarefas/parametros/tarefas/dictarefas.component';
import { RCDICACCOESRECLAMACAOService } from './servicos/rc-dic-accoes-reclamacao.service';
import { RCMOVRECLAMACAOSTOCKService } from './servicos/rc-mov-reclamacao-stock.service';
import { GTMOVTAREFASService } from './servicos/gt-mov-tarefas.service';
import { ProcessosComponent } from './paginas/home-modulo/processos/processos.component';
import { PaginatarefaComponent } from './paginas/gestao-tarefas/paginatarefa/paginatarefa.component';
import { RCMOVRECLAMACAOENCOMENDASService } from './servicos/rc-mov-reclamacao-encomendas.service';
import { RCMOVRECLAMACAOTIPONAODETECAOService } from './servicos/rc-mov-reclamacao-tipo-nao-detecao.service';
import { RCMOVRECLAMACAOTIPOOCORRENCIAService } from './servicos/rc-mov-reclamacao-tipo-ocorrencia.service';
import { GERATUALIZACAOSILVERBITABELASService } from './servicos/ger-atualizacao-silver-bi-tabelas.service';
import { ReclamacaoFornecedorComponent } from './paginas/modulo_reclamacoes/reclamacao-fornecedor/reclamacao-fornecedor.component';
import { ListareclamacoesfornecedoresComponent } from './paginas/modulo_reclamacoes/listareclamacoesfornecedores/listareclamacoesfornecedores.component';
import { TiponaodetecaoComponent } from './paginas/modulo_reclamacoes/parametros/tiponaodetecao/tiponaodetecao.component';
import { TipoocorrenciaComponent } from './paginas/modulo_reclamacoes/parametros/tipoocorrencia/tipoocorrencia.component';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [LoginService] },
  {
    path: 'fornecedor', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Fornecedores" },
    children: [
      { path: '', component: FornecedoresComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormComponent, canActivate: [LoginService], data: { breadcrumb: "Fornecedor" } },
      { path: 'editar', component: FormComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormComponent, data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'tinas', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Tinas" },
    children: [
      { path: '', component: TinasComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: TinasformComponent, canActivate: [LoginService], data: { breadcrumb: "Tina" } },
      { path: 'editar', component: TinasformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: TinasformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'banhos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Banhos" },
    children: [
      { path: '', component: BanhosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: BanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Banho" } },
      { path: 'editar', component: BanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: BanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'componentes', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Componentes/Aditivos" },
    children: [
      { path: '', component: ComponentesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: CompformComponent, canActivate: [LoginService], data: { breadcrumb: "Componente/Aditivo" } },
      { path: 'editar', component: CompformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: CompformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'utilizadores', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Utilizadores" },
    children: [
      { path: '', component: UtilizadoresComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: UtlformComponent, canActivate: [LoginService], data: { breadcrumb: "Utilizador" } },
      { path: 'editar', component: UtlformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: UtlformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'registo', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Registo Análises" },
    children: [
      { path: '', component: RegistoanalisesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: RegistoformComponent, canActivate: [LoginService], data: { breadcrumb: "Análise" } },
      { path: 'editar', component: RegistoformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: RegistoformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } },
      { path: 'historico', component: HistoricoAnalisesComponent, canActivate: [LoginService], data: { breadcrumb: "Histórico" } },]
  },
  { path: 'homegestaobanhos', component: GestaoBanhosComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão Banhos" } },
  // { path: 'hometarefas', component: TarefasComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão Tarefas" } },
  {
    path: 'manutencao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenções Planedas" },
    children: [
      { path: '', component: ManutencaoComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ManutencaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenção Planeada" } },
      { path: 'editar', component: ManutencaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ManutencaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } },
      { path: 'historico', component: HistoricoManutencoesComponent, canActivate: [LoginService], data: { breadcrumb: "Histórico" } }]
  },
  {
    path: 'construcaobanhos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Construção Banhos" },
    children: [
      { path: '', component: ConstrucaoBanhosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ConstbanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Construção Banho" } },
      { path: 'editar', component: ConstbanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ConstbanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } },
      { path: 'historico', component: HistoricoManutencoesComponent, canActivate: [LoginService], data: { breadcrumb: "Histórico" } }]
  }, {
    path: 'manutencaoreposicao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenções de Reposição" },
    children: [
      { path: '', component: ManutencaoReposicaoComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ManutecaoReposicaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenção de Reposição" } },
      { path: 'editar', component: ManutecaoReposicaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ManutecaoReposicaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } },
      { path: 'historico', component: HistoricoManutencoesComponent, canActivate: [LoginService], data: { breadcrumb: "Histórico" } }]
  }, {
    path: 'manutencaonaoprogramada', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenções não Programadas" },
    children: [
      { path: '', component: ManutencaoNaoProgramadaComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: MantencaoNaoProgramadafromComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenção não Programada" } },
      { path: 'editar', component: MantencaoNaoProgramadafromComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: MantencaoNaoProgramadafromComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } },
      { path: 'historico', component: HistoricoManutencoesComponent, canActivate: [LoginService], data: { breadcrumb: "Histórico" } }]
  },
  {
    path: 'registopara', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Reg. Parâm. de Operações" },
    children: [
      { path: '', component: RegistoparametrosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: RegistoparaformComponent, canActivate: [LoginService], data: { breadcrumb: "Reg. Parâm. de Operação" } },
      { path: 'editar', component: RegistoparaformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: RegistoparaformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  { path: 'perfil/view', component: PerfilComponent, canActivate: [LoginService], data: { breadcrumb: "Perfil" } },
  { path: 'config', component: ConfiguracoesComponent, canActivate: [LoginService], data: { breadcrumb: "Configurações" } },
  {
    path: 'parametros', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Parâmetros Aplicação" },
    children: [
      { path: '', component: ParametrosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'editar', component: ParametrosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } }]
  },
  { path: 'unidades', component: UnidadesmedidaComponent, canActivate: [LoginService], data: { breadcrumb: "Unidade de Medida" } },
  { path: 'linhas', component: LinhasComponent, canActivate: [LoginService], data: { breadcrumb: "Linhas" } },
  { path: 'zonas', component: ZonasComponent, canActivate: [LoginService], data: { breadcrumb: "Zonas" } },
  { path: 'armazens', component: ArmazensComponent, canActivate: [LoginService], data: { breadcrumb: "Armazéns" } },
  { path: 'turnos', component: TurnosComponent, canActivate: [LoginService], data: { breadcrumb: "Turnos" } },
  { path: 'adicoes', component: TipoadicaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo Adição" } },
  { path: 'manutencoes', component: TipomanutenacaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo Manutenção" } },
  { path: 'operacoes', component: TipooperacaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo Operação" } },
  { path: 'perfil/editar', component: PerfilComponent, canActivate: [LoginService], data: { breadcrumb: "Perfil" } },
  { path: 'relatorio', component: RelatorioViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Relatório" } },
  { path: 'correcaoquantidades', component: CorrecaoquantidadesComponent, canActivate: [LoginService], data: { breadcrumb: "Correção de Quantidades de Etiquetas" } },
  { path: 'analiseetiquetas', component: AnaliseEtiquetasComponent, canActivate: [LoginService], data: { breadcrumb: "Análise de Etiquetas" } },


  { path: 'teste1', component: GestaoTarefasComponent, canActivate: [LoginService], data: { breadcrumb: "Teste1" } },
  { path: 'teste2', component: FormTarefasComponent, canActivate: [LoginService], data: { breadcrumb: "Teste2" } },
  { path: 'teste3', component: ProdutosComponent, canActivate: [LoginService], data: { breadcrumb: "Teste3" } },
  //{ path: 'reclamacao', component: ReclamacaoCliente8DComponent, canActivate: [LoginService], data: { breadcrumb: "Reclamação Cliente" } },
  { path: 'calendario', component: CalendarioComponent, canActivate: [LoginService], data: { breadcrumb: "Calendário" } },


  {
    path: 'tarefas', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Tarefas" },
    children: [
      { path: '', component: TarefasComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão Tarefas" } },
      { path: 'view', component: PaginatarefaComponent, canActivate: [LoginService], data: { breadcrumb: "Tarefa" } },
      { path: 'editar', component: PaginatarefaComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } }]
  },
  {
    path: 'eventosprogramados', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Eventos Programados" },
    children: [
      { path: '', component: ListaeventostempComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: GestaoeventostemporaisComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão Evento Programado" } },
      { path: 'editar', component: GestaoeventostemporaisComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: GestaoeventostemporaisComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'eventos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Eventos" },
    children: [
      { path: '', component: EventoslistaComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: GestaoeventosComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão Evento" } },
      { path: 'editar', component: GestaoeventosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } }]
  },
  { path: 'grid', component: ListaComponent, canActivate: [LoginService], data: { breadcrumb: "Grid" } },
  { path: 'cartelas', component: CartelasComponent, canActivate: [LoginService], data: { breadcrumb: "Cartelas" } },
  { path: 'analisesjasper', component: ViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Análises Jasper" } },
  { path: 'gestaobanhos_relatorios', component: ViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Relatórios Gestão" } },
  { path: 'reclamacoes_relatorios', component: ViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Relatórios Gestão" } },
  { path: 'lmep_relatorios', component: ViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Relatórios Gestão" } },
  { path: 'configjasper', component: ConfComponent, canActivate: [LoginService], data: { breadcrumb: "Configurações Jasper" } },
  { path: 'parametrosraks', component: ParametrosRaksComponent, canActivate: [LoginService], data: { breadcrumb: "Parâmetros Raks" } },
  { path: 'listagem', component: ListagemManutencoesComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenções Ativas" } },
  { path: 'analiseconsumos', component: AnaliseconsumosComponent, canActivate: [LoginService], data: { breadcrumb: "Análise Consumos" } },
  { path: 'analiseconsumosetiquetas', component: AnaliseconsumosetiquetasComponent, canActivate: [LoginService], data: { breadcrumb: "Análise Consumos por Etiquetas" } },

  { path: 'rejeicoes', component: RejeicoesComponent, canActivate: [LoginService], data: { breadcrumb: "Rejeições" } },
  { path: 'tiposreclamacoes', component: TiposreclamacoesComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos de Reclamações" } },
  { path: 'dictarefas', component: GTDICTarefasComponent, canActivate: [LoginService], data: { breadcrumb: "Tarefas" } },
  { path: 'grausimportancia', component: GrausimportanciaComponent, canActivate: [LoginService], data: { breadcrumb: "Graus de Importância" } },
  { path: 'tiposdefeito', component: TiposdefeitoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos de Defeito" } },
  { path: 'ficheirosanalise', component: FicheirosanaliseComponent, canActivate: [LoginService], data: { breadcrumb: "Ficheiros de Análise" } },
  { path: 'temposresposta', component: TemposrespostaComponent, canActivate: [LoginService], data: { breadcrumb: "Tempos de Resposta" } },
  { path: 'tiposnaodetecao', component: TiponaodetecaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos Não Deteção" } },
  { path: 'tiposocorrencia', component: TipoocorrenciaComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos Ocorrência" } },
  { path: 'departamentos', component: DepartamentosComponent, canActivate: [LoginService], data: { breadcrumb: "Departamentos" } },

  {
    path: 'reclamacoesclientes', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Reclamações Cliente" },
    children: [
      { path: '', component: ListareclamacoesclientesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ReclamacaoCliente8DComponent, canActivate: [LoginService], data: { breadcrumb: "Reclamação Cliente" } },
      { path: 'duplicar', component: ReclamacaoCliente8DComponent, canActivate: [LoginService], data: { breadcrumb: "Duplicar" } },
      { path: 'editar', component: ReclamacaoCliente8DComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ReclamacaoCliente8DComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'reclamacoesfornecedores', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Reclamações Fornecedor" },
    children: [
      { path: '', component: ListareclamacoesfornecedoresComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ReclamacaoFornecedorComponent, canActivate: [LoginService], data: { breadcrumb: "Reclamação Fornecedor" } },
      { path: 'duplicar', component: ReclamacaoFornecedorComponent, canActivate: [LoginService], data: { breadcrumb: "Duplicar" } },
      { path: 'editar', component: ReclamacaoFornecedorComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ReclamacaoFornecedorComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'seccoes', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Secções" },
    children: [
      { path: '', component: ListaSeccoesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormSeccoesComponent, canActivate: [LoginService], data: { breadcrumb: "Secção" } },
      { path: 'editar', component: FormSeccoesComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormSeccoesComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'grupos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Grupos" },
    children: [
      { path: '', component: ListaGruposComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormGruposComponent, canActivate: [LoginService], data: { breadcrumb: "Grupo" } },
      { path: 'editar', component: FormGruposComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormGruposComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RodapeComponent,
    CabecalhoComponent,
    MenuComponent,
    HomeComponent,
    RouterComponent,
    FornecedoresComponent,
    TinasComponent,
    FormComponent,
    TinasformComponent,
    ComponentesComponent,
    CompformComponent,
    UtilizadoresComponent,
    UtlformComponent,
    BanhosComponent,
    BanhosformComponent,
    ControlosComponent,
    PerfilComponent,
    ConfiguracoesComponent,
    RegistoanalisesComponent,
    RegistoformComponent,
    ManutencaoComponent,
    ManutencaoformComponent,
    LinhasComponent,
    UnidadesmedidaComponent,
    ZonasComponent,
    TurnosComponent,
    TipoadicaoComponent,
    TipomanutenacaoComponent,
    TipooperacaoComponent,
    RegistoparametrosComponent,
    RegistoparaformComponent,
    RelatorioViewerComponent,
    ArmazensComponent,
    GestaoeventosComponent,
    EventoslistaComponent,
    HistoricoAnalisesComponent,
    ListaComponent,
    ConfComponent,
    HeaderComponent,
    ViewerComponent,
    HeaderGroupComponent,
    HistoricoManutencoesComponent,
    ParametrosComponent,
    GestaoTarefasComponent,
    FormTarefasComponent,
    ConstrucaoBanhosComponent,
    ConstbanhosformComponent,
    GestaoBanhosComponent,
    ManutencaoReposicaoComponent,
    ManutecaoReposicaoformComponent,
    ManutencaoNaoProgramadaComponent,
    MantencaoNaoProgramadafromComponent,
    ParametrosRaksComponent,
    CartelasComponent,
    CalendarioComponent,
    ListagemManutencoesComponent,
    AnaliseconsumosComponent,
    GestaoeventostemporaisComponent,
    ListaeventostempComponent,
    CorrecaoquantidadesComponent,
    AnaliseEtiquetasComponent,
    AnaliseconsumosetiquetasComponent,
    TarefasComponent,
    ProcessosComponent,
    ProdutosComponent,
    ReclamacaoCliente8DComponent,
    RejeicoesComponent,
    TiposreclamacoesComponent,
    GrausimportanciaComponent,
    TiposdefeitoComponent,
    FicheirosanaliseComponent,
    DepartamentosComponent,
    ListareclamacoesclientesComponent,
    TemposrespostaComponent,
    ListaSeccoesComponent,
    FormSeccoesComponent,
    FormGruposComponent,
    ListaGruposComponent,
    GTDICTarefasComponent,
    PaginatarefaComponent,
    ReclamacaoFornecedorComponent,
    ListareclamacoesfornecedoresComponent,
    TiponaodetecaoComponent,
    TipoocorrenciaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataTableModule,
    Ng2MaskModule,
    SharedModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    ToggleButtonModule,
    HttpModule,
    ReactiveFormsModule,
    DialogModule,
    RadioButtonModule,
    ColorPickerModule,
    TreeModule,
    ConfirmDialogModule,
    PickListModule,
    ChartModule,
    CheckboxModule,
    MultiSelectModule,
    EditorModule,
    ListboxModule,
    FileUploadModule,
    AutoCompleteModule,
    ProgressBarModule,
    DragDropModule,
    ScheduleModule,
    OrderListModule,
    SelectButtonModule,
    PanelModule,
    AgGridModule.withComponents(
      [
        HeaderGroupComponent,
        HeaderComponent,

      ]
    ),
    routing
  ],
  providers: [AppGlobals,
    LoginService,
    ConfirmationService,
    GERUTILIZADORESService,
    ABDICTINAService,
    ABDICTINAService,
    ABDICTURNOService,
    ABDICZONAService,
    ABMOVMANUTENCAOService,
    ABDICTIPOADICAOService,
    ABDICTIPOOPERACAOService,
    EmailService,
    ABDICTIPOMANUTENCAOService,
    ADMOVREGPARAMOPERACAOService,
    ABDICBANHOService,
    ABDICBANHOCOMPONENTEService,
    ABMOVMANUTENCAOCABService,
    ABMOVMANUTENCAOLINHAService,
    ABDICCOMPONENTEService,
    ABDICLINHAService,
    ABMOVANALISEService,
    ABDICBANHOADITIVOService,
    ABMOVANALISELINHAService,
    ABUNIDADADEMEDIDAService,
    GERMODULOService,
    GERPERFILLINService,
    RelatoriosService,
    GERPERFILCABService,
    GERUTZPERFILService,
    GERARMAZEMService,
    GERANALISESService,
    GEREVENTOSCONFService,
    GERPARAMETROSService,
    UploadService,
    GERVISTASService,
    RegistoProducao,
    GERCAMPOSDISPService,
    GERPOSTOSService,
    ABDICLINHAOFService,
    ABMOVMANUTENCAOETIQService,
    GEREVENTOSPROGRAMADOSService,
    RCDICTIPODEFEITOService,
    RCDICTIPORECLAMACAOService,
    RCDICREJEICAOService,
    RCDICGRAUIMPORTANCIAService,
    RCDICFICHEIROSANALISEService,
    RCMOVRECLAMACAOService,
    RCDICTEMPORESPOSTAService,
    RCMOVRECLAMACAOENVIOSGARANTIDOSService,
    RCMOVRECLAMACAOPLANOACCOESCORRETIVASService,
    RCMOVRECLAMACAOARTIGOSIMILARESService,
    RCMOVRECLAMACAOEQUIPAService,
    RCMOVRECLAMACAOFICHEIROSService,
    GERSECCAOCHEFESService,
    GERGRUPOUTZService,
    GERGRUPOService,
    GERSECCAOUTZService,
    RCDICACCOESRECLAMACAOService,
    GERSECCAOService,
    GERDEPARTAMENTOService,
    RCMOVRECLAMACAOSTOCKService,
    GTMOVTAREFASService,
    RCMOVRECLAMACAOENCOMENDASService,
    RCMOVRECLAMACAOTIPONAODETECAOService,
    RCMOVRECLAMACAOTIPOOCORRENCIAService,
    GERATUALIZACAOSILVERBITABELASService,
    GERFORNECEDORService],
  bootstrap: [AppComponent]
})
export class AppModule { }
