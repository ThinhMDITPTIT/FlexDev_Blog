import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarModule } from './commons/shared-modules/navbar/navbar.module';
import { FooterModule } from './commons/shared-modules/footer/footer.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthItcInterceptor } from './core/interceptors/auth-itc.interceptor';
import { MarkdownModule } from 'ngx-markdown';
import { SecurityContext } from '@angular/core';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgParticlesModule } from 'ng-particles';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NavbarModule,
    FooterModule,
    HttpClientModule,
    // turn off sanitization
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE,
    }),
    NgxWebstorageModule.forRoot(),
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-top-right',
      tapToDismiss: true,
      newestOnTop: true,
    }),
    BrowserAnimationsModule,
    NgParticlesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthItcInterceptor,
      multi: true,
    },
  ],
  exports: [MarkdownModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
