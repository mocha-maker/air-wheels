import { NgModule } from '@angular/core';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalItemComponent } from './rental-item/rental-item.component';
import { RentalComponent } from './rental.component';
import { CommonModule } from '@angular/common';
import { RentalService } from './shared/rental.service';

@NgModule({
  declarations: [RentalComponent, RentalListComponent, RentalItemComponent],
  imports: [CommonModule],
  providers: [RentalService],
})
export class RentalModule {}
