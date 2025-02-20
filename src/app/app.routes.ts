import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './componentes/home/home.component';
import { UserpanelComponent } from './componentes/ui/userpanel/userpanel.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './componentes/ui/about/about.component';
import { NewTripComponent } from './componentes/ui/userpanel/new-trip/new-trip.component';
import { TripComponent } from './componentes/ui/userpanel/trip/trip.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'userpanel', component: UserpanelComponent, canActivate: [AuthGuard] },
    { path: 'trip/:id', component: TripComponent, canActivate: [AuthGuard]},
    { path: 'newtrip', component: NewTripComponent, canActivate: [AuthGuard] },
];
