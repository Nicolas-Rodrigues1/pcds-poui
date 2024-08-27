import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PoDynamicFormComponent, PoDynamicFormField, PoModalComponent } from '@po-ui/ng-components';
import { Cliente } from 'src/app/core/types/type';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent implements OnInit{
  @ViewChild('modalExcluir') modalExcluir!: PoModalComponent;
  @ViewChild('modalEditar') modalEditar!: PoModalComponent;

  listaClientes: Cliente[] = [];
  clienteSelecionado: Cliente | null = null;
  page = 1;
  pageSize = 8;

  @Input() cliente: Cliente = {
    id: 0,
    nome: '',
    nascimento: '',
    cpf: '',
    cep: '',
    telefone: '',
    email: '',
    genero: ''
  }

  fields: Array<PoDynamicFormField> = [
    {
      property: 'nome',
      required: true,
      placeholder: 'Digite o nome do cliente'
    },
    {
      property: 'email',
      required: true,
      placeholder: 'Digite o email'
    },
    { 
      property: 'cpf', 
      label: 'CPF', 
      mask: '999.999.999-99',  
      required: true
    },
    {
      property: 'cep',
      label: 'CEP',
      mask: '99999-999',
      required: true
    },
    {
      property: 'genero',
      options:['masculino','feminino','outro'],
      required: true,
      label: 'Gênero'
    },
    {
      property: 'telefone',
      label: 'Telefone',
      required: true,
      mask: '99 99999-9999'
    },
    {
      property: 'nascimento',
      label: 'Data de nascimento',
      type: 'date',
      format: 'mm/dd/yyyy',
      required: true
    }
  ]

  constructor(private clienteService: ClienteService){}

  ngOnInit(): void {
    this.listarClientes()
  }

  listarClientes(): void{
    this.clienteService.listar(this.page, this.pageSize).subscribe((listaClientes) =>{
      this.listaClientes = listaClientes
    })
  }

  selecionarCliente(cliente: Cliente){
    this.clienteSelecionado = cliente
  }

  openExcluir(cliente: Cliente){
    this.cliente = cliente
    this.modalExcluir.open()
  }

  excluirCliente(){
    this.clienteService.excluir(this.cliente.id).subscribe(() =>{
      console.log('Cliente excluído')
      this.modalExcluir.close()
      this.listarClientes()
    })
  }

  openEditar(cliente: Cliente){
    this.cliente = cliente
    this.modalEditar.open()
  }

  editarCliente(){
    this.clienteService.editar(this.cliente).subscribe(() => {
      console.log('Cliente alterado')
      this.modalEditar.close()
      this.listarClientes()
    })
  }

  cancelar(){
    this.modalEditar.close()
    this.modalExcluir.close()
    this.listarClientes()
  }

  proximaPagina(): void{
    this.page++;
    this.listarClientes();
  }

  paginaAnterior(): void{
    if (this.page > 1) {
      this.page--;
      this.listarClientes();
    }
  }
}
