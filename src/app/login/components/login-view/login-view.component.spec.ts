import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginViewComponent } from './login-view.component';
describe('LoginViewComponent', () => {
  let fixture: ComponentFixture<LoginViewComponent>;
  let component: LoginViewComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginViewComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        BrowserAnimationsModule,
        MatCardModule,
      ],
    });

    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const formValues = component.formGroup.value;
    expect(formValues.email).toEqual('');
    expect(formValues.password).toEqual('');
    expect(formValues.rememberMe).toEqual(false);
  });

  it('should set email as required error when form is submitted without email', () => {
    component.login();
    expect(component.formGroup.get('email')?.hasError('required')).toBeTrue();
  });

  it('should set password as required error when form is submitted without password', () => {
    component.login();
    expect(component.formGroup.get('password')?.hasError('required')).toBeTrue();
  });

  it('should set email as invalid error when form is submitted with an invalid email', () => {
    component.formGroup.get('email')?.setValue('invalid-email');
    component.login();
    expect(component.formGroup.get('email')?.hasError('email')).toBeTrue();
  });

  it('should set password as min length error when form is submitted with a short password', () => {
    component.formGroup.get('password')?.setValue('1234');
    component.login();
    expect(component.formGroup.get('password')?.hasError('minlength')).toBeTrue();
  });

  it('should set password as min length error when form is submitted with a short password', () => {
    component.formGroup.get('password')?.setValue('1234');
    component.shouldShowErrors();
    expect(component.formGroup.get('password')?.hasError('minlength')).toBeTrue();
  });
});
