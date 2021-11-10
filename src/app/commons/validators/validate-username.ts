import { AbstractControl, ValidationErrors } from '@angular/forms';
import { time } from 'console';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthApiService } from 'src/app/core/services/apis/auth-api.service';

export class ValidateUsername {

  constructor(private readonly authApiService: AuthApiService) {}

}
