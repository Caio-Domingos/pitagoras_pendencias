import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent, VerPendentesComponent } from './upload/upload.component';

import { MaterialBundleModule } from '../material-bundle/material-bundle.module';

// External
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { InputFileConfig, InputFileModule } from 'ngx-input-file';
import { HomeUserComponent } from './home-user/home-user.component';

const config: InputFileConfig = {};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UploadComponent,
    VerPendentesComponent,
    HomeUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialBundleModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    InputFileModule.forRoot(config),

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [VerPendentesComponent]
})
export class AppModule { }
