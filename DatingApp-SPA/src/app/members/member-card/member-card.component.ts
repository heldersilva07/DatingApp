import { AlertifyService } from './../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';
import { User } from './../../_models/user';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {}

  sendLike(id: number) {
    this.userService
      .sendLike(this.authService.decodedToken.nameid, id)
      .subscribe(
        (data) => {
          this.alertify.success('you have liked:' + this.user.knownAs);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
