import { Component } from '@angular/core';
import { Input, Output, EventEmitter, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { JwtToken } from '../models/jwt-token.model';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    NgbDropdownModule
  ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  isMobile = false

  @Input()
  showMenu = false;

  @Output()
  toggleMenu = new EventEmitter<void>();

  user: JwtToken = {} as JwtToken;

  opportalURL = environment.opportalURL;

  constructor(
    private authService: AuthService,
    // private apiService: ApiService
  ) {}

  ngOnInit() {
    this.isMobile = window.innerWidth <= 767;
    const user = this.authService.getUser();
    if (user) {
      this.user = user;
    } else {
      // กรณีไม่มี user (null)
      // คุณอาจจะ redirect ไปหน้า login หรือกำหนดค่า default
      // this.user = {} as JwtToken; // หรือ handle ตามที่เหมาะสม
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth <= 767;
  }
  
  onToggleMenu() {
    this.toggleMenu.emit();
  }

  logout() {
    this.authService.clearToken();
    window.location.href = environment.opportalURL

  }

}
