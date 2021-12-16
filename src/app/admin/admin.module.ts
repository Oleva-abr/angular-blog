import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AdminLayautComponent } from './shared/components/admin-layaut/admin-layaut.component';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
    declarations: [AdminLayautComponent, LoginPageComponent],
    imports:[
        CommonModule,
        RouterModule.forChild([
            {path:'',component:AdminLayautComponent, children:[
                {path:'', redirectTo:'/admin/login', pathMatch:'full'},
                {path: 'login',component:LoginPageComponent}
            ]}
        ])
    ],
    exports:[RouterModule],
  })
export class AdminModule{

}