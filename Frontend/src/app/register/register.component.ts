import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http : Http, private route : Router) { }

  ngOnInit() {
  }

  checkbox = false;

  checkboxChecked(status) {
    if (status.target.checked) {
      this.checkbox = true
    } else {
      this.checkbox = false
    }
  }

  Register(f : NgForm){

    if(f.value.name != null && f.value.name != "" && f.value.password != null && f.value.password != "" && f.value.email != null && f.value.email != "" && this.checkbox == true) {
      console.log(this.checkbox);
      let obj = {
        name : f.value.name,
        email : f.value.email,
        password : f.value.password
      }

      let header = new Headers({"Content-Type" : "application/json"});
      let options = new RequestOptions({headers : header});

      this.http.post("http://localhost:3000/api/user/register", obj, options)
      .subscribe(
        result => {
          this.route.navigate(['/']);
        },
        error => {
          console.log("Error !");
        }
      )
    }else{
      console.log("Please input all fields")
    }
  }

}
