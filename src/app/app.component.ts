import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'air-wheels';
  componentTest = "I am a component from app.component.ts"

  clickHandler() {
    alert("I got clicked!");
  }
}
