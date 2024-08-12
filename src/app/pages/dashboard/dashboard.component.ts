import { Component, OnInit } from '@angular/core';
import { PoChartSerie, PoChartType } from '@po-ui/ng-components';
import { PedidoService } from '../services/pedido.service';
import { Pedido } from 'src/app/core/types/type';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  quantidadePedidoPorCliente: Array<PoChartSerie> = [] 
  quantidadePedidoPorStatus: Array<PoChartSerie> = []
  quantidadePedidoPorStatusType: PoChartType = PoChartType.Donut;

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService
  ){}

  ngOnInit(): void {
    this.carregarQuantidadePedidoPorCliente();
    this.carregarQuantidadePedidoPorStatus();
  }

  carregarQuantidadePedidoPorCliente(){
    this.pedidoService.getItems().subscribe((pedidos: Pedido[]) => {
      const contagemPedidosPorCliente: { [clienteId: number]: number } = {};

      pedidos.forEach(pedido => {
        if (contagemPedidosPorCliente[pedido.cliente]) {
          contagemPedidosPorCliente[pedido.cliente]++;
        } else {
          contagemPedidosPorCliente[pedido.cliente] = 1;
        }
      });

      this.clienteService.getClientes().subscribe(clientes => {
        this.quantidadePedidoPorCliente = clientes.map(cliente => {
          return {
            label: cliente.nome,
            data: contagemPedidosPorCliente[cliente.id] || 0
          };
        });

        this.quantidadePedidoPorCliente = this.quantidadePedidoPorCliente.filter(serie => serie.data);
      });
    });
  }

  carregarQuantidadePedidoPorStatus(){
    this.pedidoService.getItems().subscribe((pedidos: Pedido[]) =>{
      const contagemPedidoPorStatus: { [status: string]: number} = {};

      pedidos.forEach(pedido => {
        console.log(contagemPedidoPorStatus)
        if(contagemPedidoPorStatus[pedido.status]){
          contagemPedidoPorStatus[pedido.status]++;
        } else {
          contagemPedidoPorStatus[pedido.status] = 1;
        }
        console.log('das',contagemPedidoPorStatus)
      });

      this.quantidadePedidoPorStatus = Object.keys(contagemPedidoPorStatus).map(status =>{
        return {
          label: status,
          data: contagemPedidoPorStatus[status]
        }
      })
    })
  }
}

