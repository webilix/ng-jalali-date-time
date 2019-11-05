import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatCardModule, MatDividerModule, MatSelectModule } from '@angular/material';

import { AppComponent } from './app.component';

import { NgJalaliDateTimeModule } from '../../projects/ng-jalali-date-time/src/public-api';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatCardModule,
        MatDividerModule,
        MatSelectModule,
        NgJalaliDateTimeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
