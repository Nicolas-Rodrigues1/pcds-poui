import { Component, Input, OnInit, ViewChild } from '@angular/core';

// import { MatDialog } from '@angular/material/dialog';
import { Produto } from 'src/app/core/types/type';
import { ProdutoService } from '../../services/produto.service';
import { PoDynamicFormField, PoModalComponent } from '@po-ui/ng-components';


@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit{
  @ViewChild('modalExcluir') modalExcluir!: PoModalComponent;
  @ViewChild('modalEditar') modalEditar!: PoModalComponent;

  listaProdutos: Produto[] = [];
  produtoSelecionado: Produto | null = null;
  page = 1;
  pageSize = 12;

  @Input() produto: Produto = {
    id: 0,
    categoria: '',
    nome: ''
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
      fieldLabel: 'categoria',
      fieldValue: 'code'
    }
  ]

  constructor(
    private produtoService: ProdutoService
  ){}

  ngOnInit():void {
    this.listarProdutos();
  }

  listarProdutos(): void{
    this.produtoService.listar(this.page, this.pageSize).subscribe((listaProdutos) => {
      this.listaProdutos = listaProdutos
    })  
  }

  selecionarProduto(produto: Produto){
    this.produtoSelecionado = produto
  }

  openExcluir(produto: Produto){
    this.produto = produto
    this.modalExcluir.open()
    // console.log(this.produto)
  }

  excluirProduto(){
    this.produtoService.excluir(this.produto.id).subscribe(() => {
      console.log('Produto excluído com sucesso')
      this.modalExcluir.close();
      this.listarProdutos()
    })
  }

  openEditar(produto: Produto){
    this.produto = produto
    this.modalEditar.open()
    
  }

  editarProduto(){
    this.produtoService.editar(this.produto).subscribe(() =>{
      console.log('Produto editado')
      console.log(this.produto)
      this.modalEditar.close()
      this.listarProdutos()
    })
  }

  cancelar(){
    this.modalEditar.close()
    this.modalExcluir.close()
    this.listarProdutos()
  }

  proximaPagina(): void{
    this.page++;
    this.listarProdutos();
  }

  paginaAnterior(): void{
    if (this.page > 1) {
      this.page--;
      this.listarProdutos();
    }
  }
}