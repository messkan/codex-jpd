import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuSidebarComponent } from './main/menu-sidebar/menu-sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { UsersComponent } from './pages/users/users.component';
import { AuthorizationService } from '../app/utils/services/authorization.service';
import { ErrorComponent } from './error/error.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UsersUpdateComponent } from './pages/users/users-update/users-update.component';
import { UsersAddComponent } from './pages/users/users-add/users-add.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';

import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;  

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    UsersComponent,
    ErrorComponent,
    UsersUpdateComponent,
    UsersAddComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1100,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }) , 
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('token');},
        whitelistedDomains: [`${apiUrl}`],
        blacklistedRoutes: [`${apiUrl}/auth/login`]
      }
    })
  ],
  providers: [AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
