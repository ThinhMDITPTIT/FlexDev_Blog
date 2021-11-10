import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  public showSpinner() {
    this.spinner.show('loading_spinner');
  }

  public hideSpinner() {
    this.spinner.hide('loading_spinner');
  }
}
