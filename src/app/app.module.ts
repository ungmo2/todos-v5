import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {
  TodosContainerComponent,
  TodoFormComponent,
  TodoNavComponent,
  TodoListComponent,
  TodoFooterComponent
} from './components';

import { TodosFilterPipe } from './pipes/todos-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodosContainerComponent,
    TodosFilterPipe,
    TodoFormComponent,
    TodoNavComponent,
    TodoListComponent,
    TodoFooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
