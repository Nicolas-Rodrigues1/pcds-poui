import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

interface AuthResponse{
  acess_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiUrl: string = environment.apiUrl;


  constructor(
    private userService: UserService,
    private http: HttpClient
  ) { }

  autenticar(email: string, senha: string): Observable<HttpResponse<AuthResponse>>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, {email, senha}, {observe: 'response'}
    ).pipe(
      tap((response) => {
        const authToken = response.body?.acess_token || '';
        //this.userService.salvarToken(authToken)
      })
    )
      
  }
}