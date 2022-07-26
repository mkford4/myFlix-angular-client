import { Component, OnInit, Input } from '@angular/core';

//closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//brings in the API calls from fetch
import { FetchApiDataService } from '../fetch-api-data.service';
//used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * sends the registration form inputs to the backend via FetchApiDataService
   * @function userRegistration
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      //Logic for a successful user registration goes HERE ---------
      this.dialogRef.close(); //closes modal on success
      console.log(response);
      this.snackBar.open('User registered successfully!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

}
