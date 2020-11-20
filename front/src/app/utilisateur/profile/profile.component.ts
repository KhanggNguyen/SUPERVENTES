import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userInfos: User;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService
      .getUserProfile()
      .subscribe((data: any) => (this.userInfos = data['user']));
  }
}
