import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aw-rental-item',
  templateUrl: './rental-item.component.html',
  styleUrls: ['./rental-item.component.scss'],
})
export class RentalItemComponent implements OnInit {
  @Input() rental: any;

  constructor() {}

  ngOnInit(): void {}
}
