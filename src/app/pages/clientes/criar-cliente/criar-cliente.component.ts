import { Component, OnInit } from '@angular/core';
import { PoDynamicFormField } from '@po-ui/ng-components';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-cliente',
  templateUrl: './criar-cliente.component.html',
  styleUrl: './criar-cliente.component.scss'
})
export class CriarClienteComponent implements OnInit{
  cliente = {
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

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ){}

  ngOnInit(): void {

  }

  criarCliente(){
    const cliente = this.cliente
    if (cliente.id === 0){
      cliente.id = Math.floor(Math.random() * 1000000000);
    }
    console.log(cliente)
    this.clienteService.criar(cliente).subscribe(() => {
      this.router.navigate(['/pages/clientes'])
    })
  }

  cancelar() {
    this.router.navigate(['/pages/clientes']);
  }
}
