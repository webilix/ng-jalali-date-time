import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

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
