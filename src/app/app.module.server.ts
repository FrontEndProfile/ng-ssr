import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { FirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FirestoreModule
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
