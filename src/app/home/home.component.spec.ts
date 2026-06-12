import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render wife name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(component.wifeName);
  });

  it('should navigate to coupons when openCoupons is called', () => {
    component.openCoupons();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/coupons']);
  });
});
