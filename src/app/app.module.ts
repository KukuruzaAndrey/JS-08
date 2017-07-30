import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ClockComponent} from './clock/clock.component';
import {TimerComponent} from './timer/timer.component';
import {FormsModule} from '@angular/forms';
import {AnalogClockComponent} from './child-components/analog-clock/analog-clock.component';
import {DigitalDisplayComponent} from './child-components/digital-display/digital-display.component';
import {StopwatchComponent} from './stopwatch/stopwatch.component';
import {LapComponent} from './stopwatch/lap/lap.component';

@NgModule({
	declarations: [
		AppComponent,
		ClockComponent,
		TimerComponent,
		AnalogClockComponent,
		DigitalDisplayComponent,
		StopwatchComponent,
		LapComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
