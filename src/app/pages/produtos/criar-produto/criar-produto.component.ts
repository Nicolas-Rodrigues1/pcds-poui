import { Component, OnInit } from '@angular/core';


import { Router } from '@angular/router';
import { MensagemService } from 'src/app/core/services/mensagem.service';
import { Produto } from 'src/app/core/types/type';
import { ProdutoService } from '../../services/produto.service';
import { PoDynamicFormComponent, PoDynamicFormField } from '@po-ui/ng-components';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.scss']
})
export class CriarProdutoComponent implements OnInit{

  produto = {
    id: 0,
    nome: '',
    categoria: ''
  }

  fields: Array<PoDynamicFormField> = [
    {
      property: 'nome',
      required: true,
      icon: 'ph ph-envelope',
      placeholder: 'Digite o nome do produto'
    },
    {
      property: 'categoria',
      required: true,
      options: [
        {categoria: 'Processador', code: 'processador'},
        {categoria: 'Placa Mãe', code: 'placaMae'},
        {categoria: 'Memória Ram', code: 'memoriaRam'},
        {categoria: 'Armazenamento', code: 'armazenamento'},
        {categoria: 'Mouse', code: 'mouse'},
        {categoria: 'Teclado', code: 'teclado'},
        {categoria: 'Monitor', code: 'monitor'},
      ],
      fieldLabel: 'Selecione a categoria',
      fieldValue: 'code'
    }
  ]

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private mensagemService: MensagemService 
  ) {}

  ngOnInit(): void {
  }

  criarProduto(){
    const produto = this.produto
    if (produto.id === 0) {
      produto.id = Math.floor(Math.random() * 1000000000);
    }
    console.log(produto)
    this.produtoService.criar(produto).subscribe(() => {
      this.router.navigate(['/pages/produtos'])
    })
  }

  cancelar() {
    this.router.navigate(['/pages/produtos']);
  }

}