import { NgModule } from '@angular/core';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalItemComponent } from './rental-item/rental-item.component';
import { RentalComponent } from './rental.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [RentalComponent, RentalListComponent, RentalItemComponent],
  imports: [CommonModule],
})
export class RentalModule {}
