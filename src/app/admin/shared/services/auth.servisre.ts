import { environment } from './../../../../environments/environment';
import { User, FbAuthResponse } from './../components/admin-layaut/interfaces';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthService{
     constructor (private http: HttpClient){}

     get token():string{
        return ''
    }

     login(user:User): Observable<any>{
        user.returnSecureToken =true
        return this.http?.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(tap(()=>this.setToken))
     }

     logout(): void{

     }
     
     isAuthenticated():boolean{
         return !!this.token
     }

     private setToken(response: FbAuthResponse){
      const expDate = new Date(new Date().getTime()+ +response?.expiresIn * 1000 ) 
      localStorage.setItem('fb-token', response?.idToken)
      localStorage.setItem('fb-token-exp', expDate.toString())
     }
}