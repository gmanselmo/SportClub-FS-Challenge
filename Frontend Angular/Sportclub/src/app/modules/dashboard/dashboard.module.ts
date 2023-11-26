import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { DisplayTableComponent } from './components/display-table/display-table.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms'
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DataTransfer } from './services/dataTransfer.service';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    DisplayTableComponent,
    SearchBarComponent,
    HeaderComponent,
    FooterComponent
    
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
  ],
  providers: [
    DataTransfer
  ]
})
export class DashboardModule { }
