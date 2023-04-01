import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'calendar',
    canActivate: [authGuard.canActivate],
    loadChildren: () =>
      import('../app/pages/calendar/calendar.module').then(
        (m) => m.CalendarModule
      ),
  },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('../app/pages/sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('../app/pages/sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
