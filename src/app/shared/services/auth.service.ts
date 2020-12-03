import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { map, switchMap } from 'rxjs/operators';
import {of} from 'rxjs';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(user => {
        if (user) {
          this.userService.save(user.user)
          let returnUrl = localStorage.getItem('returnUrl');
          this.router.navigateByUrl(returnUrl)
        }
      });
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    
    return this.user$.pipe(switchMap(user => {
      if (user) return this.userService.get(user.uid).valueChanges();

      return of(null)
    }))
  }

}
