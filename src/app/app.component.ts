import { Component } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'organic-shop';
  users: Observable<any[]>;
  constructor (firestore: AngularFirestore) {
    this.users = firestore.collection('users').valueChanges()
  }
  
}