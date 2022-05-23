import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RentalService } from '../shared/rental.service';
import { RentalListComponent } from './rental-list.component';

describe('RentalComponent', () => {
  let component: RentalListComponent;
  let fixture: ComponentFixture<RentalListComponent>;
  let service: jasmine.SpyObj<RentalService>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [RentalListComponent],
      providers: [RentalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create rentals', () => {
    expect(component).toBeTruthy();
  });

  it('should use RentalService', () => {
    service = TestBed.get(RentalService);
  });

  it('should show wheels for rent', () => {
    expect(
      fixture.nativeElement
        .querySelectorAll('[data-test="wheel"')
        .length.toBe(3)
    );
  });
});
