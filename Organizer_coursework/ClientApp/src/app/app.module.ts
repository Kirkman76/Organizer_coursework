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
import { NewListComponent } from './new-list/new-list.component';
import { ReactiveFormsModule }   from '@angular/forms';
import { NewItemComponent } from './new-item/new-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ListComponent,
    ButtonComponent,
    ListsComponent,
    ListDetailsComponent,
    ItemComponent,
    NewListComponent,
    NewItemComponent,
    EditItemComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ListsComponent, pathMatch: 'full' },
      { path: 'details', component: ListDetailsComponent },
      { path: 'new-list', component: NewListComponent },
      { path: 'new-item', component: NewItemComponent },
      { path: 'edit-item', component: EditItemComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
