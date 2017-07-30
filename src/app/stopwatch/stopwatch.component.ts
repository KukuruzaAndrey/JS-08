import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {AnalogClockComponent} from '../child-components/analog-clock/analog-clock.component';
import {DigitalDisplayComponent} from '../child-components/digital-display/digital-display.component';
import {TimeService} from '../time.service';
import {Stopwatch} from './stopwatch';
import {Lap} from './lap/lap';

@Component({
	selector: 'app-stopwatch',
	providers: [TimeService],
	templateUrl: './stopwatch.component.html',
	styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements AfterViewInit {
	@ViewChildren(AnalogClockComponent) analogClockComponents: QueryList<AnalogClockComponent>;
	@ViewChildren(DigitalDisplayComponent) digitalDisplayComponents: QueryList<DigitalDisplayComponent>;

	mainStopwatch = new Stopwatch();
	lapStopwatch = new Stopwatch();

	laps: Array<Lap> = [];

	constructor(private timeService: TimeService) {
	}

	ngAfterViewInit(): void {
		//TODO
		//я не розібрався як краще тут зробити
		this.mainStopwatch.analogClockComponent = this.analogClockComponents.first;
		this.lapStopwatch.analogClockComponent = this.analogClockComponents.last;
		this.mainStopwatch.digitalDisplayComponent = this.digitalDisplayComponents.first;
		this.lapStopwatch.digitalDisplayComponent = this.digitalDisplayComponents.last;
	}

	start(): void {
		this.startStopwatch(this.mainStopwatch);
		if (this.lapStopwatch.isStarted) {
			this.startStopwatch(this.lapStopwatch);
		}
	}

	pause() {
		this.mainStopwatch.isStarted = false;
		clearTimeout(this.mainStopwatch.timerID);
		clearTimeout(this.lapStopwatch.timerID);
	}

	stop() {
		this.stopStopwatch(this.mainStopwatch);
		this.stopStopwatch(this.lapStopwatch);
		this.laps = [];
	}

	lap() {
		if (!this.lapStopwatch.isStarted && !this.mainStopwatch.isStarted) {
			return;
		}
		const lap = new Lap();
		//надіюсь це ніхто не побачить
		lap.time = this.lapStopwatch.isStarted ? this.lapStopwatch.rawDSecondCount : this.mainStopwatch.rawDSecondCount;
		lap.timeRelativePrev = this.lapStopwatch.isStarted ? this.laps[0].time - lap.time : 0;
		lap.timeRelativeAvg = this.lapStopwatch.isStarted ? Math.round(this.laps.reduce((sum, el) => sum + el.time, 0) / this.laps.length) - lap.time : 0;
		this.laps.unshift(lap);

		this.stopStopwatch(this.lapStopwatch);
		if (this.mainStopwatch.isStarted) {
			this.startStopwatch(this.lapStopwatch);
		}
	}

	private startStopwatch(stopwatch: Stopwatch): void {
		stopwatch.isStarted = true;
		stopwatch.timerID = setInterval(() => {
			this.setTime(stopwatch);
			stopwatch.rawDSecondCount++;
		}, 100);
	}

	private stopStopwatch(stopwatch: Stopwatch): void {
		stopwatch.isStarted = false;
		stopwatch.rawDSecondCount = 0;
		clearTimeout(stopwatch.timerID);
		this.setTime(stopwatch);
	}

	private setTime(stopWatch: Stopwatch): void {
		const currTime = this.timeService.getTime(stopWatch.rawDSecondCount);
		const digitalTime = this.timeService.getTimeStringWithDSeconds(stopWatch.rawDSecondCount);

		stopWatch.analogClockComponent.setTime(currTime);
		stopWatch.digitalDisplayComponent.setDisplay(digitalTime);
	}
}
