import { NgModule } from '@angular/core';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalItemComponent } from './rental-item/rental-item.component';
import { RentalComponent } from './rental.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RentalService } from './shared/rental.service';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalRoutingModule } from './rental-routing.module';

@NgModule({
  declarations: [
    RentalComponent,
    RentalListComponent,
    RentalItemComponent,
    RentalDetailComponent,
  ],
  imports: [CommonModule, RentalRoutingModule, HttpClientModule],
  providers: [RentalService],
})
export class RentalModule {}
