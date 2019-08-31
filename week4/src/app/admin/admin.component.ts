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
	addGgroupname: string = '';
	username: string = '';
	password: string = '';
	groupname: string = '';
	deletedGroup: string;
	groups = [{}];
	addGusername: string = '';
	role: string = '';
	deletedUser: string;
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
											
												console.log('data', data.userData);
												this.users = data.userData;
												console.log('thisusers', this.users);
										},
										);
							} 
						},
					);
			}
		}
	}


public deleteUser(deletedUser) {
	if (sessionStorage.role == "superAdmin") {
		if (deletedUser) {
			event.preventDefault();
			console.log(deletedUser);
			const req = this.http.post('http://localhost:3000/api/del', {
					username: this.deletedUser
				})
				.subscribe((data: any) => {
						console.log(data);
						console.log(data.success);
						if (data.success) {
							alert('User deleted successfully!');
							this.deletedUser = '';
							const req = this.http.post('http://localhost:3000/api/users', {})
							.subscribe((data: any) => {
								
									console.log('data', data.userData);
									this.users = data.userData;
									console.log('thisusers', this.users);
								
							},
							);
				} 
			},
			);
} 
} 
}


public createGroup() {
	// Function used to create group & post to backend API
	event.preventDefault();
	if (!this.groupname) {
		alert("Group name field must not be blank!");
	} else {
		const req = this.http.post('http://localhost:3000/api/groupreg', {
				groupname: this.groupname
			})
			.subscribe((data: any) => {
					if (data.success) {
						console.log(data);
						alert('Group created successfully!');
						this.groupname = '';
						const req = this.http.post('http://localhost:3000/api/groups', {})
							.subscribe((data: any) => {
									
										console.log('groupdata', data.groupData);
										this.groups = data.groupData;
										console.log('thisgroups', this.groups);
									
								},
								);
					} 
				},
			);
	}
}



public deleteGroup(deletedGroup) {
	// Deletes a user from the database
	if (sessionStorage.role != "user") {
		if (deletedGroup) {
			event.preventDefault();
			console.log(deletedGroup);
			const req = this.http.post('http://localhost:3000/api/groupdel', {
					groupname: this.deletedGroup
				})
				.subscribe((data: any) => {
						console.log(data);
						console.log(data.success);
						if (data.success) {
							alert('Group deleted successfully!');
							this.deletedGroup = '';
							const req = this.http.post('http://localhost:3000/api/groups', {})
								.subscribe((data: any) => {
										
											console.log('data', data.groupData);
											this.groups = data.groupData;
											console.log('thisgroups', this.groups);
										
									},
									);
						} 
					},
					);
		} 
	} 
}


}