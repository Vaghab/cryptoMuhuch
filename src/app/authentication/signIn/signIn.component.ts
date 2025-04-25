import { LoginUser } from 'src/interfaces/interfaces';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';

import {
  ChangeDetectionStrategy,
  Component,
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
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sign-in',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    RouterLink,
    FormsModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    PasswordModule,
  ],
})
export class SignInComponent {
  public readonly signInForm: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
  }> = new FormGroup({
    login: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  readonly loginUser: OutputEmitterRef<LoginUser> = output();

  onFieldDataChanged(event: any) {
    const { dataField, value } = event;
    const control = this.signInForm.get(dataField);
    if (control) {
      control.setValue(value);
    }
  }

  signIn() {
    this.loginUser.emit(this.signInForm.getRawValue());
  }
}
