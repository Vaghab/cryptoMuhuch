import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DxButtonModule, DxFormModule } from 'devextreme-angular';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DxFormModule, ReactiveFormsModule, DxButtonModule],
})
export class AuthenticationComponent implements OnInit {
  public readonly signUpForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
    }),
    surname: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: Validators.required,
    }),
    phone: new FormControl('', {
      validators: Validators.required,
    }),
    password: new FormControl('', {
      validators: Validators.required,
    }),
    confirmPassword: new FormControl('', {
      validators: Validators.required,
    }),
    terms: new FormControl(false, {
      validators: Validators.required,
    }),
    agree: new FormControl(false, {
      validators: Validators.required,
    }),
  });

  ngOnInit() {}

  signUp() {
    console.log(this.signUpForm.value);
  }

  onFieldDataChanged(event: any) {
    const { dataField, value } = event;
    const control = this.signUpForm.get(dataField);
    if (control) {
      control.setValue(value);
    }
  }
}
