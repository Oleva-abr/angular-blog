import { PostPageComponent } from './post-page/post-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayautComponent } from './shared/components/main-layaut/main-layaut.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';

const routes: Routes = [
  {
    path:'', component: MainLayautComponent, children:[
      {path:'', redirectTo:'/',pathMatch:'full'},
      {path:'', component: HomePageComponent},
      {path: 'post/:id', component:PostPageComponent}
    ]
  },
  {path:'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
