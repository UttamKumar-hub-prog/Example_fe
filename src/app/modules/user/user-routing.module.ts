import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/dashboard/user-dashboard.component';
import { UsersAccountsComponent } from './components/accounts/users-accounts.component';
import { UserCustomerComponent } from './components/customers/users-customers.component';
import { UsersPaymentsComponent } from './components/payments/users-payments.component';
import { UsersFeedbacksComponent } from './components/feedback/user-feedbacks.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent, // parent wrapper with <router-outlet>
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'userdashboard', component: UserDashboardComponent },
      { path: 'useraccount', component: UsersAccountsComponent },
      { path: 'usercustomer', component: UserCustomerComponent },
      { path: 'userpayment', component: UsersPaymentsComponent },
      { path: 'userfeedback', component: UsersFeedbacksComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
