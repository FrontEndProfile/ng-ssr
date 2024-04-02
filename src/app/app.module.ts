import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { DeatilCardComponent } from './deatil-card/deatil-card.component';
import { CardListComponent } from './card-list/card-list.component';

import { AngularFireModule } from '@angular/fire/compat';


@NgModule({
  declarations: [
    AppComponent,
    DeatilCardComponent,
    CardListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"ng-asmco","appId":"1:703566400674:web:4e5cc351c409bfcaa21bfb","storageBucket":"ng-asmco.appspot.com","apiKey":"AIzaSyA0E_oGL3oBpvLSQNt2zhY7QLNv3PbWqo4","authDomain":"ng-asmco.firebaseapp.com","messagingSenderId":"703566400674"})),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    // AngularFireModule,
    FirestoreModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
