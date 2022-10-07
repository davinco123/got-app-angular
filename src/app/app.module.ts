import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderNavbarComponent } from './domains/header/components/header-navbar/header-navbar.component';
import { HeaderPageComponent } from './domains/header/pages/header-page/header-page.component';
import { ShareModule } from './domains/share/share.module';

@NgModule({
  declarations: [AppComponent, HeaderPageComponent, HeaderNavbarComponent],
  imports: [BrowserModule, AppRoutingModule, ShareModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
