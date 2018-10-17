import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Weather {
  windSpeed:String
  name:String
  temp:number
    humidity: number
    lat:string
    long:string
    country:String
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  title = 'app';
  url = "http://api.openweathermap.org/data/2.5/weather?q="
  appid="&appid=45f4dd45e0f724512ba044c5a2caf4bc"
  weather:Weather= {
    windSpeed:"",
  name:"",
  temp:0,
    humidity:0,
    lat:"",
    long:"",
    country:""
  };
  city:String;

  
    error:String;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    }

    
  validate() {
    
    if(this.city) {
      this.error="";
      return true;
    } else {
      this.weather.name = "";
      this.error = "City is Empty";
    }
    return false;
  }

  
  getWeather() {
 if(this.validate()) {
    //console.log(this.url+this.city+this.appid)
    this.http.get(this.url+this.city+this.appid).subscribe((data)=>{
      console.log(data);
      this.weather.country=data['sys'].country;
      this.weather.windSpeed = data['wind'].speed;
      this.weather.name = data['name'];
      this.weather.temp = data['main'].temp;
      this.weather.humidity = data['main'].humidity;
      this.weather.lat=data['coord'].lat;
      this.weather.long=data['coord'].lon;
    },(error)=>{
      this.error=error.error.message;
      this.weather.name = "";
    })}

  }
  

}


