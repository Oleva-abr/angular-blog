import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminLayautComponent } from './shared/components/admin-layaut/admin-layaut.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AdminLayautComponent, LoginPageComponent, DashboardPageComponent, CreatePageComponent, EditPageComponent],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path:'',component:AdminLayautComponent, children:[
                {path:'', redirectTo:'/admin/login', pathMatch:'full'},
                {path: 'login',component:LoginPageComponent},
                {path: 'dashboard', component:DashboardPageComponent},
                {path:'create', component: CreatePageComponent},
                {path:'post/:id/edit', component: EditPageComponent},
            ]}
        ])
    ],
    exports:[RouterModule],
  })
export class AdminModule{

}