import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface AuthResponse{
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiUrl: string = environment.apiUrl


  constructor(
    private userService: UserService,
    private http: HttpClient
  ) { }

  autenticar(login: string, password: string): Observable<HttpResponse<AuthResponse>>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/v1/login`, {login, password}, {observe: 'response'}
    ).pipe(
    tap((response) => {
      const authToken = response.body?.token || ''; 
      this.userService.salvarToken(authToken);
      console.log(authToken);  
    })
  );
}
}