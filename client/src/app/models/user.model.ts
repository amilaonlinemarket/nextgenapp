class User{
	//_id:string;
	firstname:string;
	lastname:string;
	email:string;
	password:string;
	phone:string;
	address:{
		street:string,
		city:string
	};
	isAgreed:boolean;

	constructor(){
	this.firstname =""
	this.lastname = ""
	this.email=""
	this.password=""
	this.phone=""
	this.address.street="",
	this.address.city="",
	this.isAgreed=false;

	}
}

export default User;
