import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Cliente, Pedido, Produto } from 'src/app/core/types/type';
import { ClienteService } from '../services/cliente.service';
import { ProdutoService } from '../services/produto.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedido-venda',
  templateUrl: './pedido-venda.component.html',
  styleUrl: './pedido-venda.component.scss'
})
export class PedidoVendaComponent implements OnInit{
  @ViewChild('modalCliente') modalCliente!: PoModalComponent;

  cliente: Cliente = {
    id: 0,
    nome: '',
    nascimento: '',
    cpf: '',
    cep: '',
    telefone: '',
    email: '',
    genero: ''
  }
  listaClientes: Cliente[] = [];
  clienteSelecionado: Cliente | null = null;
  produtoSelecionado: Produto | null = null;
  status = 'Pendente';

  listaProdutosCarrinho: number[] = []
  listaProdutosCarrinhoShow: Produto[] = []
  listaProdutos: Produto[] = [];
  listaPedidos: Pedido[] = []
  produtosFiltrados: Produto[] = [];
  categoriaSelecionada = '';
  page = 1;
  pageSize = 12;

  constructor(
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService
  ){}

  ngOnInit(): void {
    this.clienteService.clienteSelecionado$.subscribe(cliente => {
      this.clienteSelecionado = cliente;
      if(cliente){
        this.listarProdutos();
      }
      // console.log(cliente)
    });
  }

  openModal(){
    this.modalCliente.open()
    this.listarClientes()
  }

  listarClientes(){
    this.clienteService.listar(this.page, this.pageSize).subscribe((listaClientes) =>{
      this.listaClientes = listaClientes
    })
  }

  selecionarCliente(cliente: Cliente){
    this.clienteService.selecionarCliente(cliente)
    if(this.clienteSelecionado!.id !== 0){
      this.modalCliente.close()
    } 
    console.log(this.clienteSelecionado)
    // console.log(cliente)
  }

  selecionarProduto(produto: Produto){
    this.produtoSelecionado = produto;
    // console.log(produto)
    this.adicionarProdutoCarrinho()
  }

  listarProdutos(){
    this.produtoService.listar(this.page, this.pageSize).subscribe((listaProdutos) => {
      this.listaProdutos = listaProdutos
      this.filtrarProdutos()
      // console.log(this.produtosFiltrados)
      // console.log(listaProdutos)
    })
  }

  filtrarProdutos(){
    if (this.categoriaSelecionada) {
      this.produtosFiltrados = this.listaProdutos.filter(produto => produto.categoria === this.categoriaSelecionada);
    } else {
      this.produtosFiltrados = [...this.listaProdutos];
    }
  }

  adicionarProdutoCarrinho(){
    if(this.produtoSelecionado){
      this.listaProdutosCarrinho.push(this.produtoSelecionado.id);
      this.listaProdutosCarrinhoShow.push(this.produtoSelecionado);
      // console.log(this.listaProdutosCarrinho, 'adicionado')
      // console.log(this.listaProdutosCarrinhoShow)
    }
  }

  removerProduto(produto: Produto){
    const index = this.listaProdutosCarrinhoShow.findIndex(p => p.id === produto.id)
    this.listaProdutosCarrinho.splice(index, 1)
    this.listaProdutosCarrinhoShow.splice(index, 1)
    // console.log(this.listaProdutosCarrinho,'produto removido do carrinho')
  }

  realizarPedido(){
    console.log(this.clienteSelecionado)
    console.log(this.produtoSelecionado)
    if(this.clienteSelecionado && this.produtoSelecionado){
      const novoPedido: Pedido = {
        id: Math.floor(Math.random() * 1000000000),
        status: this.status,
        cliente: this.clienteSelecionado.id,
        produto: this.listaProdutosCarrinho
      };

      this.pedidoService.criarPedido(novoPedido).subscribe(() => {
        console.log('pedido realizado com sucesso')
      })
    }
    this.listaProdutosCarrinho = []
    this.listaProdutosCarrinhoShow = []
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
