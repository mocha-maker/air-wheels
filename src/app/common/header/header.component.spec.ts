import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show logo', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="logo"]')
    ).toBeTruthy();
  });

  it('should show search', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="search"]')
    ).toBeTruthy();
  });

  it('should show menu', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="menu"]')
    ).toBeTruthy();
  });

  // Filter Buttons
  it('should show filters', () => {
    expect(
      fixture.nativeElement.querySelector('[data-test="date-selector"]')
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('[data-test="price-selector"]')
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('[data-test="size-selector"]')
    ).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('[data-test="brand-selector"]')
    ).toBeTruthy();
  });
});
