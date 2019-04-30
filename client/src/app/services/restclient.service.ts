
import { Injectable } from '@angular/core';
import User from '../models/user.model';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import {Response} from '@angular/http';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/map';
import { Http, Response, RequestOptions,ResponseType } from '@angular/http';

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
  
//  interface Response{
//     token :string
//  }
  

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
  
	 request(method: 'post'|'get'|'put',type:'business'|'education'|'users'|'register'|'profile'|'contactUs'|'property'|'vehicle',
	 reqObj?:any,query?:any):Observable<any>{
		// let base;
		// console.log('request dispathing to server [query] :%s',query);
		// if(method === 'post'){
		// 	base = this.http.post(`http://127.0.0.1:3000/api/${type}`,reqObj);
		// }else if(method === 'put'){
		// 	console.log('request dispathing pppppppppppppppppp :%s',reqObj);
		// 	base = this.http.put(`http://127.0.0.1:3000/api/${type}`,reqObj);
		// }
		// else if(method='get'){
		// 	if(query!=''){
		// 		base = this.http.get(`http://127.0.0.1:3000/api/${type}?${query}`);
		// 	}else{
		// 		base = this.http.get(`http://127.0.0.1:3000/api/${type}`);
		// 	}
		// 	// base = this.http.get(`http://127.0.0.1:3000/api/${type}`,{headers:{Authorization:`Bearer ${this.getToken()}`}});
		// }
		// const request = base.pipe(
		// 	map((data: Response)=>{
		// 		return data;
		// 	})
    // );
		// return request;

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'enctype': 'multipart/form-data',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With'
	});
			let options ={
				 headers: headers,
				 ResponseType:'json'
			} 
		 console.log('======================================='+reqObj);
		 console.log("................................ "+JSON.stringify(reqObj));
		 if(method === 'post'){
				return this.http.post<any>("http://127.0.0.1:3000/api/business", reqObj); 
		 }else if(method ==='get'){
			 console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>> '+type);
			 console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>> '+query);
			 var response =  this.http.get(`http://127.0.0.1:3000/api/${type}?${query}`);
			 console.log("GET response :"+JSON.stringify(response));
			 return response;
				// return this.http.get(`http://127.0.0.1:3000/api/${type}?${query}`);
		 }
		
		// console.log('mmmmmmmmmmmmmm :'+JSON.stringify(res));
		 
		//.catch((error:HttpErrorResponse) => this.handleError(error));


		  // this.http.post("http://127.0.0.1:3000/api/business", reqObj,options).subscribe(
			// 	data => {
			// 		console.log("User Login: " + JSON.stringify(data));
			// 		return;
				
			// 	},
			// 	err => {
			// 		console.log("Error occured.")
			// 		return Observable.throw( 'Server error');
			// 	}
			// );

	}

	request1(method: 'post'|'get'|'put',type:'business'|'education'|'users'|'register'|'profile'|'contactUs'|'property'|'vehicle',reqObj?:any,query?:any){
		let base;
		// console.log('request dispathing to server [query] :%s',query);
		// if(method === 'post'){
		// 	base = this.http.post(`http://127.0.0.1:3000/api/${type}`,reqObj);
		// }else if(method === 'put'){
		// 	console.log('request dispathing pppppppppppppppppp :%s',reqObj);
		// 	base = this.http.put(`http://127.0.0.1:3000/api/${type}`,reqObj);
		// }
		// else if(method='get'){
		// 	if(query!=''){
		// 		base = this.http.get(`http://127.0.0.1:3000/api/${type}?${query}`);
		// 	}else{
		// 		base = this.http.get(`http://127.0.0.1:3000/api/${type}`);
		// 	}
		// 	// base = this.http.get(`http://127.0.0.1:3000/api/${type}`,{headers:{Authorization:`Bearer ${this.getToken()}`}});
		// }
		// const request = base.pipe(
		// 	map((data: Response)=>{
		// 		return data;
		// 	})
    // );
		// return request;

		let headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Headers': 'Content-Type,X-Requested-With'
	});
			let options ={
				 headers: headers,
				 ResponseType:'json'
			} 
		 
		// return this.http.post<any>("http://127.0.0.1:3000/api/business", reqObj,options) // ...using post request
		// .map((res:Response) => {
		// console.log('mmmmmmmmmmmmmm :'+JSON.stringify(res));
		//  res.json()})
		// .catch((error:HttpErrorResponse) => this.handleError(error));


		  this.http.post("http://127.0.0.1:3000/api/business", reqObj,options).subscribe(
				data => {
					console.log("User Login: " + JSON.stringify(data));
					return data;;
				
				},
				err => {
					console.log("Error occured.")
				throw err;
				}
			);

	}

	handleError(error: HttpErrorResponse) {
		console.log('eeeeeeeeee :'+JSON.stringify(error));
		return Observable.throw( 'Server error');
}
}
