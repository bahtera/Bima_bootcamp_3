import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private http : Http, private route : Router){ }

  ngOnInit() {
    const token = sessionStorage.getItem("token");
    console.log(token);
    if(!token){
      //redirect to login
      this.route.navigate(['/']);
    }else{
      let header = new Headers({ "Authorization" : "Bearer "+token});
      let options = new RequestOptions({ headers : header});
      console.log(header)

      this.http.post("http://localhost:3000/api/validatetoken", {}, options)
      .subscribe(
        result => {
        
        },
        error => {
          sessionStorage.removeItem("token")
          this.route.navigate(['/']);
        }
      );
    }
  }

}
