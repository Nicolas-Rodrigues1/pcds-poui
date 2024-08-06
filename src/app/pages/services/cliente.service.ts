import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cliente, Clientelogin } from 'src/app/core/types/type';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:3000/clientes';
  private apiUrlEmail = 'http://localhost:3000'
  private apiUrlLogin: string = environment.apiUrl;
  private clienteSelecionadoSubject = new BehaviorSubject<Cliente | null>(null);
  clienteSelecionado$ = this.clienteSelecionadoSubject.asObservable();

  constructor(private http: HttpClient) { }

  selecionarCliente(cliente: Cliente){
    this.clienteSelecionadoSubject.next(cliente)
  }

  listar(page: number, pageSize: number): Observable<Cliente[]>{
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit',pageSize.toString());

    return this.http.get<Cliente[]>(this.apiUrl, { params })
  }

  criar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.apiUrl, cliente)
  }

  excluir(id: number): Observable<Cliente>{
    const url = `${this.apiUrl}/${id}`
    return this.http.delete<Cliente>(url)
  }

  editar(cliente: Cliente): Observable<Cliente>{
    const url = `${this.apiUrl}/${cliente.id}`
    return this.http.put<Cliente>(url, cliente)
  }

  criarLogin(email: string, senha: string): Observable<Clientelogin>{
    const params = {email, senha}
    return this.http.post<Clientelogin>(`${this.apiUrlLogin}/login`, params)
  }


  getClientePorEmail(email: string): Observable<Cliente> {
    return this.http.get<Cliente[]>(`${this.apiUrlEmail}/clientes?email=${email}`).pipe(
      map(clientes => clientes[0])
    );
}


}