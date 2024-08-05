import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/core/types/type';


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:3000/produtos'

  constructor(private http: HttpClient) { }

  getProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.apiUrl);
  }

  listar(page: number, pageSize: number): Observable<Produto[]> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', pageSize.toString());

    return this.http.get<Produto[]>(this.apiUrl, { params });
  }
  
  criar(produto: Produto): Observable<Produto>{
    return this.http.post<Produto>(this.apiUrl, produto)
  }

  excluir(id: number): Observable<Produto>{
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<Produto>(url)
  }

  editar(produto: Produto): Observable<Produto>{
    const url = `${this.apiUrl}/${produto.id}`
    return this.http.put<Produto>(url, produto)
  }
  
}