import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  DxButtonModule,
  DxFormModule,
  DxToastModule,
} from 'devextreme-angular';
import { AuthenticationService } from 'src/services/authentication.service';
import { allowedEmailDomainsValidator } from 'src/utils/validators';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DxFormModule,
    ReactiveFormsModule,
    DxButtonModule,
    TranslateModule,
    DxToastModule,
  ],
})
export class AuthenticationComponent implements OnInit {
  private readonly authService = inject(AuthenticationService);
  public readonly signUpForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    surname: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        allowedEmailDomainsValidator,
      ],
      nonNullable: true,
    }),
    phone: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirmPassword: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    terms: new FormControl(false, {
      validators: Validators.required,
      nonNullable: true,
    }),
    agree: new FormControl(false, {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  public formInvalid: boolean = true;
  public passwordConfirm: boolean | null = null;

  ngOnInit(): void {}

  signUp() {
    const { agree, terms, confirmPassword, ...data } =
      this.signUpForm.getRawValue();
    this.authService.createUser(data);
  }

  onFieldDataChanged(event: any) {
    const { dataField, value } = event;
    const control = this.signUpForm.get(dataField);
    if (control) {
      control.setValue(value);
    }

    if (
      this.signUpForm.valid &&
      this.signUpForm.controls.agree.value === true &&
      this.signUpForm.controls.terms.value === true &&
      this.signUpForm.controls.password.value ===
        this.signUpForm.controls.confirmPassword.value
    ) {
      this.formInvalid = false;
    }

    this.passwordConfirmation();
  }

  passwordConfirmation() {
    const password = this.signUpForm.controls.password.value;
    const confirmPassword = this.signUpForm.controls.confirmPassword.value;

    // Проверка, что значения не пустые и пароли совпадают
    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password !== confirmPassword
    ) {
      this.passwordConfirm = true;
    } else this.passwordConfirm = null;
  }
}
