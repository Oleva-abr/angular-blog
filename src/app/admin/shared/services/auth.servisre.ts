import { environment } from './../../../../environments/environment';
import { User, FbAuthResponse } from './../components/admin-layaut/interfaces';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';

@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>()
  constructor(private http: HttpClient) {}

  get token(): string | null {
    const expDate = localStorage.getItem('fb-token-exp')
        if (new Date() > new Date(expDate as string)) {
      this.logout()
      return null
    }
  
    return localStorage.getItem('fb-token')
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((response)=>this.setToken(response as FbAuthResponse)),
        catchError(this.handleError.bind(this))
      )
  }

  logout(): void {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Wrong email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Wrong password')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('There is no such email')
        break
    }

    return throwError(error)
  }

  private setToken(response: FbAuthResponse | null  ) {
    if (response) {
      const expDate = new Date(new Date().getTime() + Number(response.expiresIn) * 1000)
      localStorage.setItem('fb-token', response.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
