import { Component, OnInit, ViewChild } from '@angular/core';
import { PoModalComponent } from '@po-ui/ng-components';
import { Cliente, Pedido, PedidoDetail, Produto } from 'src/app/core/types/type';
import { ClienteService } from '../services/cliente.service';
import { ProdutoService } from '../services/produto.service';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-pedido-venda',
  templateUrl: './pedido-venda.component.html',
  styleUrls: ['./pedido-venda.component.scss']
})
export class PedidoVendaComponent implements OnInit {
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

  
  listaDetail: PedidoDetail[] = [];
  listaProdutosCarrinho: number[] = [];
  listaProdutosCarrinhoShow: Produto[] = [];
  listaProdutos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  categoriaSelecionada = '';
  page = 1;
  pageSize = 12;

  constructor(
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.clienteService.clienteSelecionado$.subscribe(cliente => {
      this.clienteSelecionado = cliente;
      if (cliente) {
        this.listarProdutos();
      }
    });
  }

  openModal() {
    this.modalCliente.open();
    this.listarClientes();
  }

  listarClientes() {
    this.clienteService.listar(this.page, this.pageSize).subscribe((listaClientes) => {
      this.listaClientes = listaClientes;
    });
  }

  selecionarCliente(cliente: Cliente) {
    this.clienteService.selecionarCliente(cliente);
    this.clienteSelecionado = cliente;
    if (this.clienteSelecionado.id !== 0) {
      this.modalCliente.close();
      this.listarProdutos(); 
    }
  }

  selecionarProduto(produto: Produto) {
    this.produtoSelecionado = produto;
    this.adicionarProdutoCarrinho();
  }

  listarProdutos() {
    this.produtoService.listar(this.page, this.pageSize).subscribe((listaProdutos) => {
      this.listaProdutos = listaProdutos;
      this.filtrarProdutos();
    });
  }

  onCategoriaChange(categoria: string) {
    this.categoriaSelecionada = categoria;
    this.filtrarProdutos();
  }

  filtrarProdutos() {
    if(this.categoriaSelecionada !== 'todos'){
      if (this.categoriaSelecionada) {
        this.produtosFiltrados = this.listaProdutos.filter(produto => produto.categoria === this.categoriaSelecionada);
      } else {
        this.produtosFiltrados = [...this.listaProdutos];
      }
      // console.log('Produtos filtrados:', this.produtosFiltrados); 
    } else {
      this.produtosFiltrados = this.listaProdutos
      this.listarProdutos()
    }
  }

  adicionarProdutoCarrinho() {
    if (this.produtoSelecionado) {
      this.listaProdutosCarrinho.push(this.produtoSelecionado.id);

      const detalheProduto: PedidoDetail = {
        nome: this.produtoSelecionado.nome,
        categoria: this.produtoSelecionado.categoria
      }

      this.listaDetail.push(detalheProduto)
      this.listaProdutosCarrinhoShow.push(this.produtoSelecionado);
    }
  }

  removerProduto(produto: Produto) {
    const index = this.listaProdutosCarrinhoShow.findIndex(p => p.id === produto.id);
    if (index !== -1) {
      this.listaProdutosCarrinho.splice(index, 1);
      this.listaProdutosCarrinhoShow.splice(index, 1);
    }
  }

  realizarPedido() {
    if (this.clienteSelecionado) {
      const novoPedido: Pedido = {
        id: Math.floor(Math.random() * 1000000000),
        status: this.status,
        cliente: this.clienteSelecionado.id,
        produto: this.listaProdutosCarrinho,
        detail: this.listaDetail
      };
      console.log(this.listaDetail)

      this.pedidoService.criarPedido(novoPedido).subscribe(() => {
        console.log('Pedido realizado com sucesso');
      });
    }
    this.listaProdutosCarrinho = [];
    this.listaProdutosCarrinhoShow = [];
  }

  proximaPagina(): void {
    this.page++;
    this.listarProdutos();
  }

  paginaAnterior(): void {
    if (this.page > 1) {
      this.page--;
      this.listarProdutos();
    }
  }
}
