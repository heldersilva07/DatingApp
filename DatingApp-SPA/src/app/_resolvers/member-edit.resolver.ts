import { AuthService } from './../_services/auth.service';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Inject, Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private route: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving your data');
        this.route.navigate(['/members']);
        return of(null);
      })
    );
  }
}
