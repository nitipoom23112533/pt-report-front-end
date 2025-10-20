import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import {environment} from '../environments/environment'
import { environment } from '../../environments/environment.development';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router ,private route: ActivatedRoute,) {}
  
  opportalURL = environment.opportalURL;

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    // if (token != null) {
    //   this.authService.verifyToken(token).subscribe({
    //     next: () => {
    //       console.log('Token is valid, redirecting to dashboard...');
    //       this.authService.saveToken(token); // ✅ บันทึก token
    //       this.router.navigate(['/invitation']);
    //     },
    //     error: () => {
    //       console.error('Invalid token, redirecting to login...');
    //       window.location.href = this.opportalURL;
    //     }
    //   });
    // }else{
    //   window.location.href = this.opportalURL;
    // }
    if (token) {
      this.authService.verifyToken(token).then(valid => {
        if (valid) {
          console.log('Token is valid, redirecting to dashboard...');
          this.authService.saveToken(token); // ✅ บันทึก token
          this.router.navigate(['dashboard/invitation']);

        } else {
          window.location.href = this.opportalURL;
        }
      });
    } else {
      setTimeout(() => {
        window.location.href = this.opportalURL;
      });
    }
  }
}
