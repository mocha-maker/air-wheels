import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './common/header/header.component';
import { RentalModule } from './rental/rental.module';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AuthService } from './auth/shared/auth.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RentalModule,
    NgPipesModule,
    AuthModule,
    FormsModule,
    RouterModule,
    NgxDaterangepickerMd.forRoot({ separator: ' - ', applyLabel: 'Go' }),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
