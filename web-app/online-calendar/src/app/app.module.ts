import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './layout/nav-bar/nav-bar.module';
import { AppointmentEffects } from './pages/calendar/store/effects/appointment.effect';
import { CalendarEffects } from './pages/calendar/store/effects/calendar.effects';
import { appointmentReducer } from './pages/calendar/store/reducers/appointment.reducer';
import { calendarReducer } from './pages/calendar/store/reducers/calendar.reducer';
import { selectedCalendarReducer } from './pages/calendar/store/reducers/selected-calendar.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavBarModule,
    HttpClientModule,
    EffectsModule.forRoot([CalendarEffects, AppointmentEffects]),
    StoreModule.forRoot(
      {
        selectedCalendar: selectedCalendarReducer,
        calendars: calendarReducer,
        appointments: appointmentReducer,
      },
      {}
    ),
    StoreDevtoolsModule.instrument(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
