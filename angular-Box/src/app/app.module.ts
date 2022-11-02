import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {BoxesComponent} from './boxes/boxes.component';
import {BoxDetailComponent} from './box-detail/box-detail.component';
import {MessagesComponent} from './messages/messages.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';
import { BoxSearchComponent } from './box-search/box-search.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responseng generate service InMemoryDatas.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false})

  ],

  declarations: [
    AppComponent,
    BoxesComponent,
    BoxDetailComponent,
    MessagesComponent,
    DashboardComponent,
    BoxSearchComponent,
  ],


  bootstrap: [AppComponent]


})
export class AppModule {
}
