import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AddVacancyComponent } from './vacancy/add-vacancy/add-vacancy.component';
import { ShowVacancyComponent } from './vacancy/show-vacancy/show-vacancy.component';
import { MyVacancyComponent } from './vacancy/my-vacancy/my-vacancy.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { CacheInterceptor } from './core/interceptors/cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddVacancyComponent,
    ShowVacancyComponent,
    MyVacancyComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      ApiAuthorizationModule,
      RouterModule.forRoot([
        { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: 'add-vacancy', component: AddVacancyComponent, canActivate: [AuthorizeGuard] },
        { path: 'my-vacancy', component: MyVacancyComponent, canActivate: [AuthorizeGuard] },
        { path: 'show-vacancy/:id', component: ShowVacancyComponent },
      ])
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
