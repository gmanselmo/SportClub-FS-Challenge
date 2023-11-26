import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { 
    path: 'home', 
    canActivate: [AuthGuard.AuthGuardActivate],
    component:HomeComponent,
  },
  // { 
  //   path: "browse/aat/series", 
  //   canActivate: [AuthGuard.AuthGuardActivate],
  //   component:BrowseComponent,
  // },
  // { 
  //   path: "browse/aat/movies", 
  //   canActivate: [AuthGuard.AuthGuardActivate],
  //   component:BrowseComponent,
  // },
  // { 
  //   path: "browse/aat/popular", 
  //   canActivate: [AuthGuard.AuthGuardActivate],
  //   component:BrowseComponent,
  // },
  // { 
  //   path: "browse/aat/mylist", 
  //   canActivate: [AuthGuard.AuthGuardActivate],
  //   component:BrowseComponent,
  // },
  // { 
  //   path: "browse/aat/search", 
  //   canActivate: [AuthGuard.AuthGuardActivate],
  //   component:BrowseComponent,
  // },
  // { 
  //   path: "about", 
  //   canActivate: [AuthGuard.AuthGuardActivate],
  //   component:AboutContactComponent,
  // },
  // { 
  //   path: "contact", 
  //   canActivate: [AuthGuard.AuthGuardActivate],
  //   component:AboutContactComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
