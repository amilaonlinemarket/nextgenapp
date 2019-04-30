import { Component, OnInit,ElementRef, Input } from '@angular/core';
import { Button } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';
//import the do function to be used with the http library.
import "rxjs/add/operator/do";
//import the map function to be used with the http library
import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const URL = 'http://localhost:3000/api/business';
import {UtilityService} from '../services/utility.service';
import { empty } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { post } from 'selenium-webdriver/http';
import { RestclientService} from '../services/restclient.service';

declare var $:any;
export interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
 
  subCategory =[
    {
      category:"education",
      sub:[
        {"id": "ol","name": "O/L Classes"}, 
        {"id": "al","name": "A/L Classes"},
        {"id": "it","name": "IT Education"},
        {"id": "dancing","name": "Dancing"},
        {"id": "primary","name": "Primary Education"},
        {"id": "english","name": "English classes"},
        {"id": "beauty","name": "Beauty cluture classes"}
      ]
    },
    {
      category:"agri",
      sub:[
        {"id":"fv","name":"Fruit and Vegitables"}
      ]
    },
    {
      category:"property",
      sub:[
        {"id": "house","name": "House" },
        {"id": "room","name": "Rooms" },
        {"id": "building","name": "Building" },
        {"id": "land","name": "Land" }
      ]
    },
    {
      category:"construction",
      sub:[
        {"id": "buildCon","name": "Building contractors" },
        {"id": "soil","name": "Soil suppilers" },
        { "id": "hardware","name": "Hardware & Raw Materials" },
        {"id": "archi","name": "Architects" },
        {"id": "engCon","name": "Enginner & Consultants" },
        {"id": "eleWir","name": "Electrical Wiring" },
        { "id": "mason","name": "Mason" },
        {"id": "plumber","name": "Plumbers" },
        {"id": "wrw", "name": "Wood & Roof Workers" },
        { "id": "paint", "name": "Painters" },
        {"id": "timber","name": "Timber suppliers" },
        { "id": "concrete", "name": "Concrete workers" },
        {"id": "rent","name": "Rent Construction tools" }
      ]
    },
    {  
      category:"accomadation",
      sub:[
        {"id": "hotel","name": "Hotels" },
        {"id": "resorts","name": "Resorts" },
        { "id": "gh","name": "Guest House" },
        {"id": "hostels","name": "Hostels" },
        {"id": "hb","name": "holiday bungalows" },
        {"id": "rooms","name": "Rooms" }
      ]
    },
    {  
      category:"printing",
      sub:[
        {"id": "digiPrint","name": "Digital printing" }
      ]
    },
    {  
      category:"health",
      sub:[
        {"id": "doctor","name": "Doctors" },
        {"id": "lab","name": "Laboraraty services" },
        { "id": "pharmacy","name": "Pharmacies" }
      ]
    },
    {  
      category:"wed",
      sub:[
        {"id": "bridal","name": "Bridal Dressing" },
        {"id": "flower","name": "Flower Decos" },
        { "id": "photography","name": "Photography" },
        {"id": "groomswear","name": "Groomewear" },
        {"id": "cake","name": "Cake Creations" },
        {"id": "trad","name": "Traditional dancers" }
      ]
    },
    {  
      category:"pestcontrol",
      sub:[
        {"id": "pest","name": "Pest control" }
      ]
    },
    {
      category:"auto",
      sub:[
        {"id": "vehicles","name": "Vehicles" },
        {"id": "mechGar","name": "Mechinal Garage" },
        {"id": "motorSco","name": "Motor bike & scootrs" },
        {"id": "partAcc","name": "Spare parts" },
        {"id": "serStation","name": "Service stations" }
      ]
    },
    {
      category:"sports",
      sub:[
        {"id": "badminton","name": "Badminton" },
        {"id": "tennis","name": "Tennis" },
        {"id": "swimming","name": "Swimming" },
        {"id": "ws","name": "Water sports" },
        {"id": "equ","name": "Sport Equipments" },
        {"id": "gym","name": "Gym" }
      ]
    },
    {
      category:"beauty",
      sub:[
        {"id": "saloon","name": "Saloon" },
        {"id": "spa","name": "Spa" }
      ]
    },
    {
      category:"animal",
      sub:[
        {"id": "pets","name": "Pets" },
        {"id": "acc","name": "Pet Accsosories" },
        {"id": "petfood","name": "Pet foods" },
        {"id": "vet","name": "Veterinary Services" }
      ]
    },
];
model: any = {};
cities = [];
devisions =[];
form: FormGroup;
name="";
message:string;

posts:any ={
  category:null,
  sub:null,
  name:'',
  description:'',
  features:[],
  owner:'',
  email:'',
  contactNo:'',
  address:
    {city:null,
    devision:null,
    streetAddress:''}
  ,
  price:'',
  rate:null,
  imagePath:''
}

category:any=null;

  //private filesToUpload = null;
  filesToUpload: Array<File> = [];
  constructor(private http: HttpClient, private el: ElementRef,private utilityService: UtilityService,
    private formBuilder: FormBuilder,private restclientService:RestclientService) { }

  selectedFile: File
  url1 = '';
  url2 = '';
  url3 = '';
  url4 = '';
  url5 = '';
  pointVal:string=null;
  features:any=[];
  contactNumbers =[];
  location =[];
  subCat =[];
  public loading = false;
  error:boolean=false;
  success :boolean;
  

  isFieldValid(field: string) {
    // console.log('field :'+this.form.get(field));
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }
  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
  public getColor(){
    if(this.success==true){
      return "alert alert-success"
    }else if(this.error==true){
      return "alert alert-danger"
    }
  }

  public getMessage(){
    return this.message;
  }
  public isSuccess(){
    if(this.success==true){
      return true
    }
  }
  public isFailed(){
    if(this.error==true){
      return true
    }
  }
  

  onSubmit() {
    this.loading =true;
    var featureList ='';
    var contactNumberList='';
    var addressList='';
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();

    for(let i=0;i<this.features.length;i++){
      featureList = featureList.concat((this.features[i].display).concat("|").concat(this.features[i].words).concat("|").concat(this.features[i].isHighlight).concat("||"));
    }
    for(let i=0;i<this.contactNumbers.length;i++){
      contactNumberList = contactNumberList.concat(this.contactNumbers[i].concat("|"));
    }
    for(let i=0;i<this.location.length;i++){

      addressList =addressList.concat((this.location[i].streetAddress.replace(',', " ")).concat("|").concat(this.location[i].devision).concat("|").concat(this.location[i].city).concat("||")) ;
    }
    console.log('form vlaues :'+JSON.stringify(this.posts));
    formData.append('category',this.posts.category);
    formData.append('sub',this.posts.sub);
    formData.append('name',this.posts.name);
    formData.append('description',this.posts.description);
    formData.append('owner',this.posts.owner);
    formData.append('title',this.posts.title);
    formData.append('email',this.posts.email);
    console.log('cccccccccccccccccccccccccccc '+contactNumberList)
    if(contactNumberList!=''){
      formData.append('phone',contactNumberList.substring(0, contactNumberList.length - 1));
    }else{
      formData.append('phone',"NOT_GIVEN");
    }
    // formData.append('phone',contactNumberList.substring(0, contactNumberList.length - 1));
    console.log('cccccccccccccccccccccccccccc '+addressList)
    formData.append('location',addressList.substring(0, addressList.length - 1));
    formData.append('price',this.posts.price);
    formData.append('rate',this.posts.rate);
    formData.append('keyPoints',featureList.substring(0, featureList.length - 1));
    
    for(let i =0; i < inputEl.files.length; i++){ 
      formData.append('image', inputEl.files.item(i),inputEl.files.item(i).name);
    }
    console.log('FormData obj generated. Invoking business post service' +formData);
    console.log(formData.get('category'));
    console.log(formData.get('image')); 
  
    this.restclientService.request('post', 'business', formData, null).subscribe((data) => {
      console.log('ssssss :'+JSON.stringify(data));
      this.message ="Successfully post your business";
      this.loading = false;
      this.success =true;
    }, (err) => {
      console.error('Error occur :%s', JSON.stringify(err));
      this.loading = false;
      this.error= true;
      console.log('==========loading======================'+this.loading);
      console.log(err.error)
      this.message = err.error;
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      // console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
}

  submit(form){
    var addressList='';
    var featureList ='';
    var contactNumberList='';
    console.log(this.category);
    let formValue = form.value;
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    for(let i=0;i<this.location.length;i++){
      addressList =addressList.concat((this.location[i].streetAddress.replace(',', " ")).concat("|").concat(this.location[i].devision).concat("|").concat(this.location[i].city).concat(",")) ;
    }
    for(let i=0;i<this.features.length;i++){
      featureList = featureList.concat((this.features[i].display).concat("|").concat(this.features[i].words).concat("|").concat(this.features[i].isHighlight).concat(","));
    }
    for(let i=0;i<this.contactNumbers.length;i++){
      contactNumberList = contactNumberList.concat(this.contactNumbers[i].concat("|"));
    }
    formData.append('category',formValue.category);
    formData.append('sub',formValue.sub);
    formData.append('name',formValue.name);
    formData.append('description',formValue.description);
    formData.append('owner',formValue.owner);
    formData.append('title',formValue.title);
    formData.append('email',formValue.email);
    
    formData.append('location',addressList.substring(0, addressList.length - 1));
    formData.append('price',formValue.price);
    formData.append('rate',formValue.rate);
    formData.append('keyPoints',featureList.substring(0, featureList.length - 1));
    
    for(let i =0; i < inputEl.files.length; i++){ 
      formData.append('image', inputEl.files.item(i),inputEl.files.item(i).name);
    }
    console.log(formData);
    this.http.post(URL, formData).map((res:Response) => res.json()).subscribe(
      (success) => {
       alert('Successfully posted your ad.');
      },
       (error) => alert(error.error))    
  }

  addFeatures(point:string){
    console.log('mmmmmmmmmmmmmmmmmmmmmmmmmm '+point);
    if(point !=""){
      var points ={
        display: '10000',
        words: point,
        isHighlight : false
      }
      this.features.push(points);
      console.log(this.features);
      this.pointVal=null;
    }else{
      alert("fill the business feature before add to bucket")
    }
  
  }

  clear(point){
    console.log('clearing the input value')
    this.pointVal="";
  }

  addAddress(city:string,devision:string,street:string){
    console.log(' city :%s devision :%s streetAddess :%s',city,devision,street);
    if(city!=null && devision !="Choose"){
      var address = {
        streetAddress :street.replace(',', " "),
        devision :devision,
        city : this.utilityService.getCity(city).name
      }
      console.log('addess :'+JSON.stringify(address));
      console.log('location '+JSON.stringify(this.location))
      this.location.push(address);
      console.log('====================='+JSON.stringify(this.location));
    }else{
      alert("Select bith city and devision ")
    }
    
  }

  addContactNo(contact:string){
    var contactNo =contact;
    this.contactNumbers.push(contactNo);
  }
  deleteContactNo(i){
    console.log('Deleting contact number ') ;
    this.contactNumbers.splice(i,1);
   }

  deleteAddress(i){
    console.log("Deleting address :"+i);
    this.location.splice(i,1);
  }

  deleteRow(i){
    console.log("Deleting row : "+i)
    this.features.splice(i, 1);
  }

  makeImportant(value:any,i){
    console.log('make it important' +value.currentTarget.checked)
    if(value.currentTarget.checked){
      this.features[i].isHighlight =true;
    }else{
      this.features[i].isHighlight =true;
    }
  }

  setInFront(value:any,i){
    console.log('set in front '+value.target.checked+'.....'+i);
    this.features.forEach(element => {
      element.display ='O';
    });
      this.features[i].display ='F';
    
  }


  files(files) {
    this.message = '';
    this.filesToUpload = files;
}
onChange(id){
  console.log('ccccccccccccccccccccccccccccccccc :'+id)
  this.devisions = this.utilityService.loadDevisions(id);
}
upload() {
  //locate the file element meant for the file upload.
      let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
  //get the total amount of files attached to the file input.
      let fileCount: number = inputEl.files.length;
  //create a new fromdata instance
      let formData = new FormData();
  //check if the filecount is greater than zero, to be sure a file was selected.
  for(let i =0; i < inputEl.files.length; i++){ // a file was selected
          //append the key name 'photo' with the first file in the element
              formData.append('photo', inputEl.files.item(i),inputEl.files.item(i).name);
              formData.append('photo', inputEl.files.item(i),inputEl.files.item(i).name);
              formData.append('name',"HarryPorter");
          //call the angular http method
          this.http
      //post the form data to the url defined above and map the response. Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
              .post(URL, formData).map((res:Response) => res.json()).subscribe(
              //map the success function and alert the response
               (success) => {
                       alert(success._body);
              },
              (error) => alert(error))
        }
}


fileChangeEvent(fileInput: any) {
  this.filesToUpload = <Array<File>>fileInput.target.files;
  //this.product.photo = fileInput.target.files[0]['name'];
}
changeCategory(value:any){
  console.log("???????????????????????? "+value)
  for ( var i = 0; i < this.subCategory.length; i++) {
    console.log(value==this.subCategory[i].category)
    if(value==this.subCategory[i].category){
      this.subCat = this.subCategory[i].sub;
    }
  }
  console.log(this.subCat);  
}

  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   category: [null, Validators.required],
    //   sub: [null, Validators.required],
    //   email: [null, Validators.required]
    // });

    this.cities = this.utilityService.getCities();
    this.devisions = this.utilityService.loadDevisions(5);
    console.log(this.devisions)

    // var $vendor = $('#category');
    // var $model = $('#sub');
    // $vendor.change(function () {
    //   var selectedVal = $('#category :selected').val();
    //   $model.empty().append(function () {
    //     var output = '';
    //     $.each(subCategory, function (index, value) {
    //       if (value.category == selectedVal) {
    //         $.each(value.sub, function (index, val) {
    //           output += "<option value='" + val.id + "'>" + val.name + "</option>";
    //         });
    //       }
    //     });
    //     return output;
    //   });
    // }).change();

    $(".add-contact-row").click(function () {
      var point = $("#contact-primary-input").val();
      //  var email = "fffff"// $("#email").val();
      // var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + point + "</td><td>" + email + "</td></tr>";
      var markup = "<tr><td><input type='checkbox' name='contact-record'></td><td>" + point + "</td></tr>";
      $("table[id=contacts] tbody").append(markup);
    });

    // Find and remove selected table rows
    $(".delete-row").click(function () {
      $("table tbody").find('input[name="record"]').each(function () {
        if ($(this).is(":checked")) {
          $(this).parents("tr").remove();
        }
      });
    });

    $(".delete-contact-row").click(function () {
      $("table tbody").find('input[name="contact-record"]').each(function () {
        if ($(this).is(":checked")) {
          $(this).parents("tr").remove();
        }
      });
    });

    
}

}
