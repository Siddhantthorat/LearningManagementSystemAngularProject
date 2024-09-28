import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  
  title = 'LMS';
  isadmin=false;
  isMenurequired=false;
  constructor(private route:Router){
    // let role=sessionStorage.getItem('role');
    // if(role=='admin'){
    //   this.isadmin=true;
    // }
  }
  ngDoCheck(): void {
    let currentroute = this.route.url;
    let role=sessionStorage.getItem('role');
    if (currentroute == '/login' || currentroute == '/register') {
      this.isMenurequired = false
    } else {
      this.isMenurequired = true
    }

    // if (role == 'admin') {
    //   this.isadmin = true;
    // }else{
    //   this.isadmin = false;
    // }
  }
}
