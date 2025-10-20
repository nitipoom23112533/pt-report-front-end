import { Routes } from '@angular/router';
import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { InvitationComponent } from './invitation/invitation.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { SurveyAdhocComponent } from './survey-adhoc/survey-adhoc.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login',component: LoginComponent},
    { 
        path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'invitation',  // Redirect มาที่ invitation โดย default
                pathMatch: 'full',
            },
            { path: 'invitation', component: InvitationComponent },
            { path: 'transaction', component: TransactionComponent },
        ] 
    }, // ✅ ใช้ authGuard
    { path: 'survey-adhoc', component: SurveyAdhocComponent, canActivate: [authGuard] }, // ✅ ใช้ authGuard}
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // ✅ แก้ pathMatch ให้เป็น 'full'
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }