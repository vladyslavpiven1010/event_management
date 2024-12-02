import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { EventModule } from './modules/event/event.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { AuthModule } from './modules/auth/auth.module';
import { CoreModule } from './modules/core/core.modules';

@NgModule({
  declarations: [AppComponent,/* ProductDetailsComponent*/],
  imports: [HttpClientModule, BrowserModule, FormsModule, AppRoutingModule, SharedModule, CoreModule, EventModule, TicketModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
