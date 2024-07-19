import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_services/auth.guard';
import { BoardUserComponent } from './board-user/board-user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminManagementComponent } from './dashboard/admin-management/admin-management.component';
import { ChartComponent } from './dashboard/chart/chart.component';
import { ContentComponent } from './dashboard/content/content.component';
import { GarbageManagementComponent } from './dashboard/garbage-point/garbage-management/garbage-management.component';
import { GarbagePointComponent } from './dashboard/garbage-point/garbage-point.component';
import { ManagerManagementComponent } from './dashboard/manager-management/manager-management.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { EmployeeManagementComponent } from './dashboard/user-list/employee-management/employee-management.component';
import { UserListComponent } from './dashboard/user-list/user-list.component';
import { ViewEmployeeComponent } from './dashboard/user-list/view-employee/view-employee.component';
import { BlockHomeGuard } from './_services/block-home.guard';
import { ChatComponent } from './dashboard/chat/chat.component';
import { CommandComponent } from './dashboard/command/command.component';
import { ClientComponent } from './dashboard/client/client.component';
import { ViewClientComponent } from './dashboard/client/view-client/view-client.component';
import { ClientFormComponent } from './dashboard/client/client-form/client-form.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { CommandManagementComponent } from './dashboard/command/command-management/command-management.component';
import { ViewCommandComponent } from './dashboard/command/view-command/view-command.component';
import { TaskComponent } from './dashboard/task/task.component';
import { ContactClientsComponent } from './dashboard/contact-clients/contact-clients.component';
import { AssignEmployeeTaskComponent } from './dashboard/assign-employee-task/assign-employee-task.component';
import { CrmServicesComponent } from './dashboard/crm-services/crm-services.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivateChild: [AuthGuard],
    children: [
      { path: 'home', component: ContentComponent },
      { path: 'employee', component: EmployeeManagementComponent },
      { path: 'emp/:id', component: EmployeeManagementComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'charts', component: ChartComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'manager', component: ManagerManagementComponent },
      { path: 'admin', component: AdminManagementComponent },
      { path: 'userList', component: UserListComponent },
      { path: 'adminList', component: AdminManagementComponent },
      { path: 'command', component: CommandComponent },
      { path: 'client', component: ClientComponent },
      { path: 'tasks', component: TaskComponent },
      { path: 'contactclients', component: ContactClientsComponent },
      { path: 'newCommand', component: CommandManagementComponent },
      { path: 'viewCommand/:id', component: ViewCommandComponent },
      { path: 'client/:id', component: ClientFormComponent },
      { path: 'viewemp/:id', component: ViewEmployeeComponent },
      { path: 'viewclient/:id', component: ViewClientComponent },
      { path:'assigTasks', component:AssignEmployeeTaskComponent},
      { path:'services', component:CrmServicesComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]
  },
  { path: 'home', component: HomeComponent, canActivate: [BlockHomeGuard] },
  { path: 'login', component: LoginComponent, canActivate: [BlockHomeGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [BlockHomeGuard] },
  { path: 'user', component: BoardUserComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
