import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, USER_NAME_KEY } from '../auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.authService.onGetData.subscribe(
      res => this.getUserName()
    )
  }

  isExpanded = false;
  userName: string;

  isLogged(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  getUserName(): void {
    this.userName = localStorage.getItem(USER_NAME_KEY);
  }

  collapse(): void {
    this.isExpanded = false;
  }

  toggle(): void {
    this.isExpanded = !this.isExpanded;
  }
}
