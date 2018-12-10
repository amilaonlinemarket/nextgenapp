import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/map';

// export interface Response{
// 	res :string
//   }

export interface UserDetails {
	firstname: string;
	lastname: string;
	email: string;
	username:string;
	password:string;
	phone:string;
	isAgreed:boolean;
  }

@Injectable()
export class EmailService {
  apiUrl = 'http://localhost:3000/api';
	emailApi = this.apiUrl+'/email';
	asyncResult:string;
  
  constructor(private http: HttpClient) { }

  public signUpEmail(email): Observable<any>{
		return this.request('post','signup',email);
	}

	// public request(type,context,email):Observable<any>{
	// 	let base;
	// 	 console.log('Calling email service : %s',email);
	// 		base = this.http.post(`http://127.0.0.1:3000/api/email/signup`,email);
	// 	  const request = base.pipe(
	// 		map((data: Response)=>{
	// 			if(data){
	// 				console.log('.........................data............. %s',data);
  //       }
  //       console.log('========= response ======================== %s',JSON.stringify(data));
	// 			return data;
	// 		})
	// 	);
	// 	return request;
  // }
  
	private request(method: 'post'|'get',type:'signup'|'register'|'profile'|'resetPassword',email):Observable<any>{
		let base;
		console.log('request dispathing to server :%s',email);
		if(method === 'post'){
			base = this.http.post(`http://127.0.0.1:3000/api/email/${type}`,email);
		}else{
		//	base = this.http.get(`http://127.0.0.1:3000/api/email/${type}`,{headers:{Authorization:`Bearer ${this.getToken()}`}});
		}
		const request = base.pipe(
			map((data: Response)=>{
				if(data){
					console.log('Response of the email : %s',data);
				}
				return data;
			})
		);
		return request;
	}

	async getAsyncData(email) {
		var body={
			email:email
		}
		var obj = await this.http.post(`http://127.0.0.1:3000/api/forgetpassword`,body).toPromise();
		console.log('================= '+JSON.stringify(obj))
    console.log('No issues, I will wait until promise is resolved..');
	}

	  //Default Error handling method.
  	private handleError(error: any): Promise<any> {
    	console.error('An error occurred', error); // for demo purposes only
    	return Promise.reject(error.message || error);
	}


}

