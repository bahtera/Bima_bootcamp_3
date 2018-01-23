import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http : Http, private route : Router) { }

  ngOnInit() {
  }

  checkbox = false;

  checkboxChecked(status) {
    if (status.target.checked) {
      this.checkbox = true;
    } else {
      this.checkbox = false;
    }
  }

  Login(f : NgForm){
    let obj = {};
    if (f.value.input == null || f.value.password == null || f.value.input =="" || f.value.password == "") {
    } else {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(f.value.input)) {
        obj = {
          email : f.value.input,
          password: f.value.password
        }
      } else {
        obj = {
          name : f.value.input,
          password: f.value.password
        }
      }

      let header = new Headers({"Content-Type" : "application/json"});
      let options = new RequestOptions({headers : header});

      this.http.post("http://localhost:3000/api/user/login", obj, options)
      .subscribe(
      result => {
        if (this.checkbox == true) {
          localStorage.setItem("token", result.json().token);
        } else {
          sessionStorage.setItem("token", result.json().token);
        }
        this.route.navigate(["/main"]);
      },
      error => {
        console.log("User Not Found");
      }
      )

    }
  }

}
