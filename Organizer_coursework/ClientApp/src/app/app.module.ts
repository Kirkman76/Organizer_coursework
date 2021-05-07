import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ListComponent } from './list/list.component';
import { ButtonComponent } from './shared-ui/button/button.component';
import { ListsComponent } from './lists/lists.component';
import { ListDetailsComponent } from './list-details/list-details.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ListComponent,
    ButtonComponent,
    ListsComponent,
    ListDetailsComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ListsComponent, pathMatch: 'full' },
      { path: 'details', component: ListDetailsComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
