import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Pedido } from 'src/app/core/types/type';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:3000/pedidos'

  constructor(private http: HttpClient) { }

  criarPedido(pedido: Pedido): Observable<Pedido>{
    return this.http.post<Pedido>(this.apiUrl, pedido)
  }

  listarPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  getItems(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  excluir(id: number): Observable<Pedido>{
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<Pedido>(url)
  }

  editar(pedido: Pedido): Observable<Pedido>{
    const url = `${this.apiUrl}/${pedido.id}`
    return this.http.put<Pedido>(url, pedido)

  }
}