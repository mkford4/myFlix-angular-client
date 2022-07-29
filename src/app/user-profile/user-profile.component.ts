import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];

  @Input() userData: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  deleteProfile(): void {
    if (confirm("Are you sure you want to delete your profile? There's no going  back!")) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('You have successfully deleted your profile.', 'OK', {
          duration: 2000
        });
      })
      this.fetchApiData.deleteUser().subscribe((response) => {
        console.log(response);
        localStorage.clear();
      });
    }
  }

  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log(response);
      this.snackBar.open('Successfully updated profile!', 'OK', {
        duration: 2000
      });
      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Please login again with your updated profile', 'OK', {
          duration: 2000
        });
      }
    })
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  //checks if movie is already in user's favorites list
  isFav(_id: string): boolean {
    return this.favoriteMovies.includes(_id)
  }

  addFavoriteMovie(_id: string): void {
    console.log(_id);
    this.fetchApiData.addFavoriteMovie(_id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    })
  }

  removeFavoriteMovie(_id: string): void {
    console.log(_id);
    this.fetchApiData.removeFavoriteMovie(_id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    })
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  openDirectorDialog(
    name: string, bio: string, birth: Date, death: Date
  ): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death,
      },
      width: '500px'
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    });
  }

}