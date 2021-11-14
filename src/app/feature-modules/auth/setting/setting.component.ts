import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthStateService } from './../../../core/services/states/auth-state.service';
import { UserStateService } from 'src/app/core/services/states/user-state.service';
import { LocalStorageService } from 'ngx-webstorage';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthApiService } from 'src/app/core/services/apis/auth-api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoadingSpinnerService } from './../../../core/services/spinner/loading-spinner.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {

  public profile: any = {};
  public currentUser: any = {};

  modalOption: NgbModalOptions = {};

  settingForm = this._fb.group({
    username: ['', [Validators.required, Validators.minLength(6)]],
    bio: [''],
    image: [''],
    email: [{value: '', disabled: true}]
  });

  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly authStateService: AuthStateService,
    private readonly userStateService: UserStateService,
    private readonly authApiService: AuthApiService,
    private readonly _fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly spinner: LoadingSpinnerService,
    private readonly modal: NgbModal
  ) {}

  get username() {
    return this.settingForm.get('username') as FormControl
  }

  get bio() {
    return this.settingForm.get('bio') as FormControl
  }

  get image() {
    return this.settingForm.get('image') as FormControl
  }

  get email() {
    return this.settingForm.get('email') as FormControl
  }

  ngOnInit() {
    this.getProfileUser();
  }

  getProfileUser() {
    if(this.localStorage.retrieve('token')){
      this.authStateService.getCurrentUserInfo().pipe(
        switchMap(res => {
          this.currentUser = res;
          return this.userStateService.getUserProfileByUsername(res.user.username);
        })
      )
      .subscribe(res => {
        this.profile = res.profile;
        this.username.setValue(this.profile.username);
        this.bio.setValue(this.profile.bio);
        this.image.setValue(this.profile.image);
        this.email.setValue(this.currentUser.user.email);
        this.image.valueChanges.subscribe(value => this.profile.image = value);
      });
    }
  }

  updateProfile() {
    const user = {
      username: this.username.value,
      bio: this.bio.value,
      image: this.image.value
    }
    if(this.settingForm.valid){
      setTimeout(() => {
        this.spinner.showSpinner();
      }, 500)
      this.authApiService.updateUser({user}).subscribe(res => {
        setTimeout(() => {
          this.spinner.hideSpinner();
          this.toastr.success('', 'Update Successfully!');
          this.authStateService.currentLoggedIn$.next(res.user.username);
        }, 1000)
      }, err => {
        setTimeout(() => {
          this.spinner.hideSpinner();
        }, 1000);
        setTimeout(() => {
          const error = err.error.errors;
          if (error.username) {
            this.username.setErrors({ usernameAlreadyTaken: true });
          }
          this.toastr.error('', 'Username is already taken!');
        }, 1500)
      });
    }
  }

  openModal(){
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modal.open(ChangePasswordComponent, this.modalOption);
  }
}
