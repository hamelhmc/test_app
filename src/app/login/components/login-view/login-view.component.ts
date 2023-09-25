import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

const debounceDelay = 300;

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css'],
})
export class LoginViewComponent {
  public formGroup: FormGroup;
  public hide = true;

  public isEmailRequiredError = false;
  public isEmailInvalidError = false;
  public isPasswordRequiredError = false;
  public isPasswordMinLengthError = false;

  constructor(private readonly formBuilder: FormBuilder) {
    this.formGroup = this.buildForm();

    this.formGroup
      .get('email')
      ?.valueChanges.pipe(debounceTime(debounceDelay), distinctUntilChanged())
      .subscribe(() => {
        this.shouldShowErrors();
      });

    this.formGroup
      .get('password')
      ?.valueChanges.pipe(debounceTime(debounceDelay), distinctUntilChanged())
      .subscribe(() => {
        this.shouldShowErrors();
      });
  }

  private buildForm(): FormGroup<{
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    rememberMe: FormControl<boolean | null>;
  }> {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [false], // Campo de recordatorio
    });
  }

  public login(): void {
    const user = this.formGroup.value;
    // eslint-disable-next-line no-console
    console.log('🐛 login ➜ user:', user);
  }

  public shouldShowErrors(): void {
    const emailControl = this.formGroup.get('email');
    const passwordControl = this.formGroup.get('password');

    this.isEmailRequiredError = emailControl?.hasError('required') ?? false;
    this.isEmailInvalidError = emailControl?.hasError('email') ?? false;
    this.isPasswordRequiredError = passwordControl?.hasError('required') ?? false;
    this.isPasswordMinLengthError = passwordControl?.hasError('minlength') ?? false;
  }
}
