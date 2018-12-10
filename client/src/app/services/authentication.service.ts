import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

export interface UserDetails {
	_id: string;
	email: string;
	exp: number;
	iat: number;
  }
  
  interface TokenResponse {
	  token: string;
  }
  
  export interface UserPayload {
	email?: string;
	password: string;
	name?: string;
	newPassword? : string;
	token? : string;
  }

@Injectable()
export class AuthenticationService{
	private token: string;
	
	constructor(
	private http: HttpClient, private router:Router){}

	private saveToken(token:string):void{
		localStorage.setItem('app-token',token);
	}

	private getToken():string{
		if(!this.token){
			this.token = localStorage.getItem('app-token');
		}
		return this.token;
	}

	public getUserDetails():UserDetails{
		const token = this.getToken();
		let payload;
		if(token){
			payload = token.split('.')[1];
			payload = window.atob(payload);
			// console.log(JSON.parse(payload))
			return JSON.parse(payload);
		}else{
			return null;
		}
	}

	public isLoggedIn():boolean{
		const user = this.getUserDetails();
		if(user){
			return user.exp > Date.now()/1000;
		}else{
			return false;
		}
	}

	private request(method: 'post'|'get',type:'login'|'register'|'profile'|'resetPassword',user?:UserPayload):Observable<any>{
		let base;
		console.log('request dispathing to server :%s',user);
		if(method === 'post'){
			base = this.http.post(`http://127.0.0.1:3000/api/${type}`,user);
		}else{
			base = this.http.get(`http://127.0.0.1:3000/api/${type}`,{headers:{Authorization:`Bearer ${this.getToken()}`}});
		}
		const request = base.pipe(
			map((data: TokenResponse)=>{
				if(data.token){
					console.log('logged user token : %s',data);
					this.saveToken(data.token);
				}
				return data;
			})
		);
		return request;
	}

	public login(user: UserPayload): Observable<any>{
		return this.request('post','login',user);
	}
	
	public resetPassword(user: UserPayload):Observable<any>{
		console.log('reset user password :%s',JSON.stringify(user));
		return this.request('post','resetPassword',user);
	}

	public logout():void{
		this.token ="";
		window.localStorage.removeItem('app-token');
		this.router.navigateByUrl('/');
	}
	
}