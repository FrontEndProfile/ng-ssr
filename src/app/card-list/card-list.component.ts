import { Component,inject } from '@angular/core';
import { Firestore ,collection , collectionData } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
  firestore : Firestore = inject(Firestore);
  cards_list$: Observable<any[]>

  constructor() {
    const aCollection = collection(this.firestore, 'media');
    this.cards_list$ = collectionData(aCollection, { idField: 'id' }).pipe(
      map((data: any[]) => {
        // Add the id property to each item in the array
        return data.map(item => ({ id: item.id, ...item }));
      })
    );
  }

}
