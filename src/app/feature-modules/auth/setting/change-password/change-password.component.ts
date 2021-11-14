import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ValidatePassword } from 'src/app/commons/validators/validate-password';
import { AuthApiService } from 'src/app/core/services/apis/auth-api.service';
import { LoadingSpinnerService } from './../../../../core/services/spinner/loading-spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  isWhitespace = /^[\S]*$/;
  isContainLetter = /^(?=.*[a-zA-Z])/;
  isContainNumber = /^(?=.*[0-9])/;

  changePwForm = this._fb.group({
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        ValidatePassword.patternValidator(this.isWhitespace, {
          hasWhitespace: true,
        }),
        ValidatePassword.patternValidator(this.isContainLetter, {
          hasLetter: true,
        }),
        ValidatePassword.patternValidator(this.isContainNumber, {
          hasNumber: true,
        }),
      ],
    ],
    confirmPassword: ['', Validators.required],
  },
  {
    validators: [ValidatePassword.matchValidator],
  });

  constructor(
    public activeModal: NgbActiveModal,
    private readonly _fb: FormBuilder,
    private readonly authApiService: AuthApiService,
    private readonly spinner: LoadingSpinnerService,
    private readonly toastr: ToastrService
  ) {}

  get password(){
    return this.changePwForm.get('password') as FormControl
  }

  get confirmPassword(){
    return this.changePwForm.get('confirmPassword') as FormControl
  }

  changePassword(){
    const user = {
      password: this.password.value
    }
    setTimeout(() => {
      this.spinner.showSpinner();
    }, 500);
    if(this.changePwForm.valid){
      this.authApiService.updateUser({user}).subscribe(() => {
        setTimeout(() => {
          this.spinner.hideSpinner();
          this.toastr.success('', 'Change Password Successfully!');
          this.activeModal.close();
        }, 1000)
      }, () => {
        this.toastr.error('', 'Something Wrong!');
      })
    }
  }
}
