import { Component, OnInit, Input } from '@angular/core';

//closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//brings in the API calls from fetch
import { UserLoginService } from '../fetch-api-data.service';
//used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };
  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      //Logic for a successful user registration goes HERE ---------
      this.dialogRef.close(); //closes modal on success
      console.log(response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user.Username);

      this.snackBar.open('User logged in successfully!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
