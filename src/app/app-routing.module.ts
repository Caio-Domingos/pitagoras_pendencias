import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { HomeUserComponent } from './home-user/home-user.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'upload',
    component: UploadComponent
  },
  {
    path: 'home',
    component: HomeUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
