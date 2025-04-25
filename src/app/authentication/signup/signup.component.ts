import { UserData } from 'src/interfaces/interfaces';
import { allowedEmailDomainsValidator } from 'src/utils/validators';

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
  OutputEmitterRef,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { PasswordModule } from 'primeng/password';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-sign-up',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    ButtonModule,
    InputGroupModule,
    PasswordModule,
    InputGroupAddonModule,
  ],
})
export class SignUpComponent {
  readonly newUser: OutputEmitterRef<UserData> = output();

  public readonly signUpForm = new FormGroup({
    login: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
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

  signUp() {
    const { agree, terms, confirmPassword, ...data } =
      this.signUpForm.getRawValue();
    this.newUser.emit(data);
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
