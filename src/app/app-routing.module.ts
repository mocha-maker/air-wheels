import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentalComponent } from './rental/rental.component';

const routes: Routes = [{ path: '', component: RentalComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
