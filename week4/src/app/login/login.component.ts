import { Component, OnInit } from '@angular/core';
import {FormsModule} from  "@angular/forms";
import {Router} from  '@angular/router';
import {HttpClient} from  '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  username:string ='';
  password:string = '';
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit() {
    if(sessionStorage.getItem("username") != null){
      this.router.navigateByUrl('/account')
    }
  }
  // loginUser(event){
  //   event.preventDefault();
  //   if (this.username == "" && this.password == "" ){
  //     this.router.navigateByUrl('/account');
  //   }else{
  //     alert("Incorrect Username or Password ")
  //   }
  // }

  public loginUser(): void {
  
    event.preventDefault();
    if (this.username === "" && this.password === "") {
        alert("You must enter an email and a username!");
        return;
    } else if (typeof(Storage) !== "undefined") {

        const req =this.http.post('http://localhost:3000/api/auth', {
                username: this.username,
                password: this.password,
            })
            .subscribe((data: any) => {
                    if (data.success) {
                        alert("Login Successful!");
                        this.router.navigateByUrl('/account');
                        sessionStorage.setItem("username", data.username);
                        sessionStorage.setItem("password", data.password);
                    } else {
                        alert('Username/Email incorrect!')
                    }
                },
                err => {
                    alert('An error has occured trying to create user.')
                    console.log("Error occured");
                    return;
                });
    } else {
        console.log('Local Storage Undefined');
        alert("Error: Local Storage Undefined!")
        return;
    }
}
}

