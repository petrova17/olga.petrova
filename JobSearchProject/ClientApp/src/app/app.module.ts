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
import { AddResumeComponent } from './resume/add-resume/add-resume.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ProfileComponent } from './profile/profile.component';
import { MyResumeComponent } from './resume/my-resume/my-resume.component';
import { ShowResumeComponent } from './resume/show-resume/show-resume.component';
import { ShowResumeMatchedToVacancyComponent } from './resume/show-resume-matched-to-vacancy/show-resume-matched-to-vacancy.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AddVacancyComponent,
    ShowVacancyComponent,
    MyVacancyComponent,
    AddResumeComponent,
    ProfileComponent,
    MyResumeComponent,
    ShowResumeComponent,
    ShowResumeMatchedToVacancyComponent
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
      { path: 'add-resume', component: AddResumeComponent, canActivate: [AuthorizeGuard] },
      { path: 'my-vacancy', component: MyVacancyComponent, canActivate: [AuthorizeGuard] },
      { path: 'my-resume', component: MyResumeComponent, canActivate: [AuthorizeGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthorizeGuard] },
      { path: 'show-vacancy/:id', component: ShowVacancyComponent },
      { path: 'show-resume/:id', component: ShowResumeComponent },
      { path: 'show-resume-matched/:id', component: ShowResumeMatchedToVacancyComponent },
    ]),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
