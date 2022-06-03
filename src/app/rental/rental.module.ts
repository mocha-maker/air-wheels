import { NgModule } from '@angular/core';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalItemComponent } from './rental-item/rental-item.component';
import { RentalComponent } from './rental.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalRoutingModule } from './rental-routing.module';
import { MapComponent } from '../common/map/map.component';
import { BookingComponent } from './rental-detail/booking/booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalItemComponent,
    RentalDetailComponent,
    MapComponent,
    BookingComponent,
  ],
  imports: [
    CommonModule,
    RentalRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  providers: [RentalService],
})
export class RentalModule {}