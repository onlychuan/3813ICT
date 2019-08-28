import { Component, OnInit } from '@angular/core';
import {Router} from  '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	constructor(private router: Router, private http: HttpClient) {}
	username: string = '';
	password: string = '';
	role: string = '';


	users = [{}];
	

  ngOnInit(): void {
    // Check for valid user & pull data from server
		if (!sessionStorage.username || !sessionStorage.password) {
			alert("You are not logged in!")
			this.router.navigateByUrl('');
		} else if (sessionStorage.role != "superAdmin" && sessionStorage.role != "groupAdmin") {
			alert("You ara not superadmin!")
			this.router.navigateByUrl('/profile');
    }	
	}


	public createUser() {
		// Function used to create user & post to backend API
		event.preventDefault();
		if (sessionStorage.role != "user") {
			if (this.username === "" || this.password === "" || this.role === "") {
				alert("All fields must not be blank!");
			} else {
				const req = this.http.post('http://localhost:3000/api/reg', {
						username: this.username,
            password: this. password,
						role: this.role
					})
					.subscribe((data: any) => {
							if (data.success) {
								alert('User created successfully!');
								this.username = '';
								this.password = '';
								this.role = '';
								const req = this.http.post('http://localhost:3000/api/users', {})
									.subscribe((data: any) => {
											if (data.userData) {
												console.log('data', data.userData);
												this.users = data.userData;
												console.log('thisusers', this.users);
											} else {
												alert('Error!');
												return;
											}
										},
										err => {
											alert('An error has occured trying to create user.')
											console.log("Error occured");
											return;
										});
							} else {
								alert('Error!');
								return;
							}
						},
						err => {
							alert('An error has occured trying to create user.')
							console.log("Error occured");
							return;
						});
			}
		}
	}



}