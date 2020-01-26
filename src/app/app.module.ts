import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AttackEditComponent } from './attack-edit/attack-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAngleDoubleDown, faAngleLeft, faAngleRight, faCalendarAlt, faPlus} from '@fortawesome/free-solid-svg-icons';
import { TestComponent } from './test/test.component';
import {HttpClientModule} from '@angular/common/http';
import {AttackService} from './services/attack.service';
import { ErrorComponent } from './modals/error/error.component';
import { SuccessComponent } from './modals/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    AttackEditComponent,
    TestComponent,
    ErrorComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}, AttackService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faAngleLeft);
    library.add(faAngleRight);
    library.add(faPlus);
    library.add(faCalendarAlt);
    library.add(faAngleDoubleDown);
  }
}
