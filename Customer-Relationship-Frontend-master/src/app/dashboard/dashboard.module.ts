import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { ChartComponent } from './chart/chart.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { FrameComponent } from './frame/frame.component';
import { GarbageManagementComponent } from './garbage-point/garbage-management/garbage-management.component';
import { GarbagePointComponent } from './garbage-point/garbage-point.component';
import { HeaderComponent } from './header/header.component';
import { LeftSidenavComponent } from './left-sidenav/left-sidenav.component';
import { ManagerManagementComponent } from './manager-management/manager-management.component';
import { BackAccountFormatPipe } from './pipes/back-account-format.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { ProfileComponent } from './profile/profile.component';
import { RightSidenavComponent } from './right-sidenav/right-sidenav.component';
import { EmployeeManagementComponent } from './user-list/employee-management/employee-management.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewEmployeeComponent } from './user-list/view-employee/view-employee.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import{MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ChatComponent } from './chat/chat.component';
import { CommandComponent } from './command/command.component';
import { ClientComponent } from './client/client.component';
import { ClientFormComponent } from './client/client-form/client-form.component';
import { ViewClientComponent } from './client/view-client/view-client.component';
import { UserbyidBarchartComponent } from './chart/userbyid-barchart/userbyid-barchart.component';
import { NgChartsModule } from 'ng2-charts';
import { EmployeeComponent } from './employee/employee.component';
import { CommandManagementComponent } from './command/command-management/command-management.component';
import { ViewCommandComponent } from './command/view-command/view-command.component';
import { TaskComponent } from './task/task.component';
import { UserjoinedDateComponent } from './chart/userjoined-date/userjoined-date.component';
import { DonotUserStatsComponent } from './chart/donot-user-stats/donot-user-stats.component';
import { SexClientStatComponent } from './chart/sex-client-stat/sex-client-stat.component';
import { ContactClientsComponent } from './contact-clients/contact-clients.component';
import { ReadMailComponent } from './contact-clients/read-mail/read-mail.component';
import { AssignEmployeeTaskComponent } from './assign-employee-task/assign-employee-task.component';
import { ContentTaskComponent } from './content/content-task/content-task.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { CrmServicesComponent } from './crm-services/crm-services.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ServicesDialogComponent } from './crm-services/services-dialog/services-dialog.component';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [
    DashboardComponent,
    TruncatePipe,
    LeftSidenavComponent,
    RightSidenavComponent,
    FooterComponent,
    ContentTaskComponent,
    DashboardComponent,
    ContentComponent,
    HeaderComponent,
    UsermanagementComponent,
    ChartComponent,
    ProfileComponent,
    FrameComponent,
    CapitalizePipe,
    BackAccountFormatPipe,
    EmployeeManagementComponent,
    ManagerManagementComponent,
    AdminManagementComponent,
    UserListComponent,
    ViewEmployeeComponent,
    GarbagePointComponent,
    GarbageManagementComponent,
    ChatComponent,
    CommandComponent,
    ClientComponent,
    ClientFormComponent,
    ViewClientComponent,
    UserbyidBarchartComponent,
    EmployeeComponent,
    CommandManagementComponent,
    ViewCommandComponent,
    TaskComponent,
    UserjoinedDateComponent,
    DonotUserStatsComponent,
    SexClientStatComponent,
    ReadMailComponent,
    ContactClientsComponent,
    AssignEmployeeTaskComponent,
    CrmServicesComponent,
    ServicesDialogComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatAutocompleteModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    NgChartsModule,
    
  ]
})
export class DashboardModule { }
