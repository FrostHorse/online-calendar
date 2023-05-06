import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarModule } from './layout/nav-bar/nav-bar.module';
import { CalendarEffects } from './pages/calendar/store/effects/calendar.effects';
import { calendarReducer } from './pages/calendar/store/reducers/calendar.reducer';
import { selectedCalendarReducer } from './pages/calendar/store/reducers/selected-calendar.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavBarModule,
    HttpClientModule,
    EffectsModule.forRoot([CalendarEffects]),
    StoreModule.forRoot(
      { selectedCalendar: selectedCalendarReducer, calendars: calendarReducer },
      {}
    ),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
