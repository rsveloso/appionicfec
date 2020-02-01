import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ServiceService } from './service';
import { Push } from '@ionic-native/push/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp({
      apiKey: 'API_KEY',
      authDomain: 'testeionic3push-144b6.firebaseapp.com',
      databaseURL: 'https://testeionic3push-144b6.firebaseio.com',
      projectId: 'testeionic3push-144b6',
      storageBucket: 'testeionic3push-144b6.appspot.com',
      messagingSenderId: '322516920929',
      appId: '1:322516920929:web:326a2f3c6216e98dd19820',
      measurementId: 'G-7LEFMLV3WP'
    }),
    AngularFireDatabaseModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    ServiceService,
    Push,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
