import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UtilityService {
  category:string;
  cities =[
    {"id":0,"name":"All Sri lanka",
      "divisions":[]},
    {"id":1,"name":"Colombo",
    "divisions":["colombo 01","colombo 02","colombo 03","colombo 04","colombo 05","colombo 06","colombo 07","colombo 08",
    "colombo 09","colombo 10","colombo 11","colombo 12","colombo 13","colombo 14","colombo 15","Nugegoda","Kohuwala","Malabe",
    "Dehiwala", "Piliyandala", "Angoda","Athurugiriya","Avissawella","Battaramulla","Boralesgamuwa"]},
    {"id":2,"name":"Gampaha",
    "divisions":["Gampaha","Kalaniya","Ja-ela","Seeduwa","Negambo","Kadawatha","Delgoda","Divulapitiya","Ganemulla","Kadana",
    "Katunayake","Kiribathgoda","Minuwangoda","Mirigama","Nittambuwa","Ragama","Veyangoda","Wattala","Amandoluwa"]},
    {"id":3,"name":"Anuradhapura",
    "divisions":["Anuradhapura","Kekirawa","Tambuttegama","Nochchiyagama","Medawachchiya","Eppawala","Galenbindunuwewa","Galnewa",
    "Habarana","Mihintale","Talawa"]},
    {"id":4,"name":"Galle",
  "divisions":["Galle","Elpitiya","Ambalangoda","Baddegama","Karapitiya","Ahangama","Batapola","Bentota","Hikkaduwa"]},
    {"id":5,"name":"Matara",
  "divisions":["Matara","Weligama","Hakmana","Akuressa","Dikwella","Deniyaya","Kamburugamuwa","Kamburupitiya","Kekanadurra"]},
    {"id":6,"name":"Kurunegala",
    "divisions":["Kurunegala","Kuliyapitiya","Mawathagama","Narammala","Pannala","Alawwa","Bingiriya","Galgamuwa","Giriulla",
    "Hettipola","Ibbangamuwa","Nikaweratiya"]},
    {"id":7,"name":"Kandy",
  "divisions":["Kandy","Katugastota","Peradeniya","Gampola","Kundasale","Akurana","Ampitiya","Digana","Galagedara","Gelioya",
  "Kadugannawa","Madawala Bazaar","Nawalapitiya","Pilimatalawa","Wattegama",]},
    {"id":8,"name":"Kaluthara",
  "divisions":["Panadura","Kalutara","Horana","Matugama","Bandaragama","Alutgama","Beruwala","Ingiriya","Wadduwa"]},
    {"id":9,"name":"Badulla",
  "divisions":["Badulla","Bandarawela","Mahiyanganaya","Welimada","Passara","Diyatalawa","Hali Ela","Haputale"]},
    {"id":10,"name":"Ampara",
  "divisions":["Ampara","Kalmunai","Akkarepattu","Sainthamaruthu"]},
    {"id":11,"name":"Batticoloa",
  "divisions":["Batticaloa"]},
    {"id":12,"name":"Hambantota",
  "divisions":["Tissamaharama","Tangalla","Beliatta","Hambantota","Ambalantota"]},
    {"id":13,"name":"Jaffna",
  "divisions":["Jaffna","Chavakachcheri","Nallur"]},
    {"id":14,"name":"Mannar",
  "divisions":["Mannar"]},
    {"id":15,"name":"Matale",
  "divisions":["Matale","Dambulla","Galewela","Ukuwela","Palapathwela","Rattota","Sigiriya","Yatawatta"]},
    {"id":16,"name":"Moneragala",
  "divisions":["Moneragala","Wellawaya","Bibile","Buttala","Kataragama"]},
    {"id":17,"name":"Nuwara Eliya",
  "divisions":["Nuwara Eliya","Hatton","Ginigathena"]},
    {"id":18,"name":"Polonnaruwa",
    "divisions":["Polonnaruwa","Hingurakgoda","Kaduruwela","Medirigiriya"] },
    {"id":19,"name":"Puttalam",
    "divisions":["Wennappuwa","Chilaw","Marawila","Dankotuwa","Nattandiya","Puttalam"]},
    {"id":20,"name":"Rathnapura",
    "divisions":["Ratnapura","Embilipitiya","Balangoda","Pelmadulla","Kuruwita","Eheliyagoda"]},
    {"id":21,"name":"Trincomalee",
    "divisions":["Trincomalee","Kinniya"]},
    {"id":21,"name":"Vavuniya",
    "divisions":["Vavuniya"]}
  ]

  constructor(private route: ActivatedRoute) { }

  getCities(){
    return this.cities;
  }

  findCity(id):Observable<any>{
    var tmp = this.cities[id];
    console.log('Finding a city :%s',JSON.stringify(tmp));
    return Observable.of(tmp);
  }

  // loadDevisions(city:number){
  //   // let devisionList =[];
  //   return JSON.stringify(this.cities[city].divisions);

  // }

  loadDevisions(city:number):string[]{
    // let devisionList =[];
    return this.cities[city].divisions;

  }

  displaySelectedCity =function(selectedCity,devision){
    if(selectedCity.split('→')[1] !=undefined){
      selectedCity = (selectedCity.split('→')[0]).concat("→").concat(devision);
    }else{
      selectedCity = selectedCity.concat('→').concat(devision);
    }
    return selectedCity;
  }

  findQueryParams(queryParams):Observable<any>{
    var q={}
    queryParams
      // .filter(params=>params.category)
      .subscribe(params=>{
        q['category'] = params.category;
        q['sub']=params.sub;
        q['viewTemplate']=params.viewTemplate})
      return Observable.of(q);
  }
}
