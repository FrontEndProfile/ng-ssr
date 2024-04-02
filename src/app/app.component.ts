import { Component,OnInit,inject } from '@angular/core';
import { Firestore ,collection , collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-ssr';

  products: any[] = [];


  // firestore : Firestore = inject(Firestore);
  // view$: Observable<any[]>

  constructor(){
    // const aCollection = collection(this.firestore, 'media')
    // this.view$ = collectionData(aCollection)
  }


}
