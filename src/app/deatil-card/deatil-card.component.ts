import { Component, inject } from '@angular/core';
import { Firestore, doc, getDoc, DocumentData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deatil-card',
  template: `
    <div *ngIf="detail_page$ | async as cardDetail">

      <div class="container">
        <div class="row">
          <div class="col-md-10 mx-auto">
            <div class="card w-100 my-4">
              <img [src]="cardDetail.media_base_url" class="card-img-top" [alt]="cardDetail.media_base_alt">
              <div class="card-body">
                <h1>Product Name: {{ cardDetail.card_name }}</h1>
                <h3>Product status: {{ cardDetail.card_publish }}</h3>
                <p>Product Base Name : {{ cardDetail.media_base_name }}</p>
                <hr>
                <div class="card_slice d-flex align-items-start justify-content-between flex-wrap">
                  <img [src]="cardDetail.media_one_url" class="card-img-top w-50 p-2" [alt]="cardDetail.media_one_alt">
                  <img [src]="cardDetail.media_two_url" class="card-img-top w-50 p-2" [alt]="cardDetail.media_two_alt">
                  <img [src]="cardDetail.media_three_url" class="card-img-top w-50 p-2" [alt]="cardDetail.media_three_alt">
                  <img [src]="cardDetail.media_four_url" class="card-img-top w-50 p-2" [alt]="cardDetail.media_four_alt">
                </div>
                <hr>
                <ul>
                  <li>Image One Alt Is : {{ cardDetail.media_one_alt }}</li>
                  <li>Image Two Alt Is : {{ cardDetail.media_two_alt }}</li>
                  <li>Image Three Alt Is : {{ cardDetail.media_three_alt }}</li>
                  <li>Image Four Alt Is : {{ cardDetail.media_four_alt }}</li>
                </ul>

                <!-- RichText  -->
                <hr>
                <h6>Product Description</h6>
                <div class="card">
                  <div class="card-body">
                    <span [innerHTML]="cardDetail.product_description_editor"></span>
                  </div>
                </div>
                <hr>

                <h6>Product Detail</h6>
                <div class="card">
                  <div class="card-body">
                    <span [innerHTML]="cardDetail.product_detail_editor"></span>
                  </div>
                </div>
                <hr>

                <h6>Product Info</h6>
                <div class="card">
                  <div class="card-body">
                    <span [innerHTML]="cardDetail.product_info_editor"></span>
                  </div>
                </div>
                <hr>

                <h6>Product Scenarios</h6>
                <div class="card">
                  <div class="card-body">
                    <span [innerHTML]="cardDetail.product_scenarios_editor"></span>
                  </div>
                </div>
                <hr>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styleUrl: './deatil-card.component.scss'
})
export class DeatilCardComponent {
  detail_page$: Promise<DocumentData> | null = null;
  firestore: Firestore = inject(Firestore);


  constructor(private route: ActivatedRoute) {
    this.fetchCardDetails();
  }

  async fetchCardDetails(): Promise<void> {
    const cardId = this.route.snapshot.paramMap.get('id');
    if (cardId) {
      const docRef = doc(this.firestore, 'media', cardId);
      console.log('Document Reference:', docRef); // Log the document reference
      const docSnap = await getDoc(docRef);
      console.log('Document Snapshot:', docSnap); // Log the document snapshot
      if (docSnap.exists()) {
        this.detail_page$ = Promise.resolve(docSnap.data());
        console.log('Detail Page Data:', this.detail_page$); // Log the detail page data
      } else {
        console.error('Document does not exist.');
      }
    } else {
      console.error('Card ID not found.');
    }
  }
}
