import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBsComponent } from './navbar-bs.component';

describe('NavbarBsComponent', () => {
  let component: NavbarBsComponent;
  let fixture: ComponentFixture<NavbarBsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarBsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarBsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
