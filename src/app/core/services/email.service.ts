import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private emailSubject = new BehaviorSubject<string | null>(null);
  email$ = this.emailSubject.asObservable();

  setEmail(email: string) {
    this.emailSubject.next(email);
  }

  getEmail(): string | null {
    return this.emailSubject.getValue();
  }
}
