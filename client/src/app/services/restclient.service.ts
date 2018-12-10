
import { Injectable } from '@angular/core';
import User from '../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import {Response} from '@angular/http';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/map';

export interface contactUs {
	name: string;
	email: string;
	subject: string;
  message:string;
}
export interface edu{
	category: string;
	name:string;
	description:string;
  location:string;
}
  
 interface Response{
    token :string
 }
  

@Injectable()
export class RestclientService {
  apiEndPoint = 'http://localhost:3000';
	userEndPoint = this.apiEndPoint+'/api/contactUs';

  constructor(
    private http: HttpClient
  ) { }

  submitContactUs(contactUs: any): Observable<any>{
    return this.request('post','contactUs',contactUs);
	}
	
	// getItems(criteria?:any,type:string){
	// 	return this.request('get',type);
	// }

	// updateUser(user:User): Observable<any>{
	// 	return this.request('put','profile',user);
	// }
  
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
  
   request(method: 'post'|'get'|'put',type:'business'|'education'|'users'|'register'|'profile'|'contactUs'|'property'|'vehicle',reqObj?:any,query?:any):Observable<any>{
		let base;
		console.log('request dispathing to server [query] :%s',query);
		if(method === 'post'){
			base = this.http.post(`http://127.0.0.1:3000/api/${type}`,reqObj);
		}else if(method === 'put'){
			console.log('request dispathing pppppppppppppppppp :%s',reqObj);
			base = this.http.put(`http://127.0.0.1:3000/api/${type}`,reqObj);
		}
		else if(method='get'){
			if(query!=''){
				base = this.http.get(`http://127.0.0.1:3000/api/${type}?${query}`);
			}else{
				base = this.http.get(`http://127.0.0.1:3000/api/${type}`);
			}
			// base = this.http.get(`http://127.0.0.1:3000/api/${type}`,{headers:{Authorization:`Bearer ${this.getToken()}`}});
		}
		const request = base.pipe(
			map((data: Response)=>{
				return data;
			})
    );
		return request;
	}
}
