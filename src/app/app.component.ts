import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'template-driven-form';

  passwordsDoNotMatch: boolean = false;
  // passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor() {
    this.loginForm = {} as NgForm;  // Initialize with an empty object of type NgForm
  }

  OnFormSubmitted() {
    this.trimSpacesOnSubmit('FName');
    this.trimSpacesOnSubmit('LName');

    if (this.loginForm.valid && !this.passwordsDoNotMatch) {
      console.log(this.loginForm.value);
    } else {
      this.validatePasswordMatch();
      this.loginForm.form.markAllAsTouched();
      console.log("sadaskjklj")
    }
  }

  validatePasswordMatch() {
    const password = this.loginForm.controls['password'].value;
    const cpassword = this.loginForm.controls['cpassword'].value;
    this.passwordsDoNotMatch = password !== cpassword;
  }

  normalizeSpaces(controlName: string) {
    const control = this.loginForm.controls[controlName];
    if (control && control.value) {
      const normalizedValue = control.value.replace(/\s+/g, ' ').replace(/(^\s+|\s+$)/g, '') + (control.value.endsWith(' ') ? ' ' : '');
      control.setValue(normalizedValue, {
        emitEvent: false,
        emitModelToViewChange: true,
        emitViewToModelChange: false
      });
    }
  }

  trimSpacesOnSubmit(controlName: string) {
    const control = this.loginForm.controls[controlName];
    if (control && control.value) {
      const trimmedValue = control.value.trim();
      control.setValue(trimmedValue, {
        emitEvent: false,
        emitModelToViewChange: true,
        emitViewToModelChange: false
      });
    }
  }
}
