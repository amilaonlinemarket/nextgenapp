import { Injectable } from '@angular/core';
import User from '../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import {Response} from '@angular/http';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/map';

export interface UserInfo {
	firstname: string;
	lastname: string;
	email: string;
	password:string;
  phone:string;
  address:{
		street:string,
		city:string
	};
	isAgreed:boolean;
  }

 interface Response{
    token :string
 }
  

@Injectable()
export class UserService {
  apiEndPoint = 'http://localhost:3000';
	userEndPoint = this.apiEndPoint+'/api/users';

  constructor(
    private http: HttpClient
  ) { }

  createUser(user: User): Observable<any>{
    return this.request('post','register',user);
	}
	updateUser(user:User): Observable<any>{
		return this.request('put','profile',user);
	}
  
  // public request(user?:UserInfo):Observable<any>{
	// 	let base;
	// 	console.log('Dispathing user infos : %s',JSON.stringify(user));
	// 		base = this.http.post(`http://127.0.0.1:3000/api/register`,user);
	// 	  const request = base.pipe(
	// 		map((data: Response)=>{
	// 			if(data){
	// 				console.log('.........................data............. %s',data);
  //       }
  //       console.log('========= response ======================== %s',JSON.stringify(data));
	// 			return data;
	// 		})
	// 	);
	// 	console.log('?????????????????????????????????????????')
	// 	return request;
  // }
  
  private request(method: 'post'|'get'|'put',type:'users'|'register'|'profile'|'resetPassword',user?:UserInfo):Observable<any>{
		let base;
		console.log('request dispathing to server :%s',JSON.stringify(user));
		if(method === 'post'){
			base = this.http.post(`http://127.0.0.1:3000/api/${type}`,user);
		}else if(method === 'put'){
			console.log('request dispathing pppppppppppppppppp :%s',user);
			base = this.http.put(`http://127.0.0.1:3000/api/${type}`,user);
		}
		else{
			//base = this.http.get(`http://127.0.0.1:3000/api/${type}`,{headers:{Authorization:`Bearer ${this.getToken()}`}});
		}
		const request = base.pipe(
			map((data: Response)=>{
					console.log('Response : %s',JSON.stringify(data));
				return data;
			})
    );
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++rrrrr')
		return request;
	}

}
