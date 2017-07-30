import {AfterContentInit, Component, ViewChild} from '@angular/core';
import {DigitalDisplayComponent} from '../child-components/digital-display/digital-display.component';
import {AnalogClockComponent} from '../child-components/analog-clock/analog-clock.component';
import {TimeService} from '../time.service';
import {Time} from '../time';


@Component({
	selector: 'app-timer',
	providers: [TimeService],
	templateUrl: './timer.component.html',
	styleUrls: ['./timer.component.css']
})
export class TimerComponent implements AfterContentInit {
	constructor(private timeService: TimeService) {
		this.inputTime = new Time();
	}

	public inputTime: Time;
	public isStarted = false;

	@ViewChild(AnalogClockComponent) private analogClockComponent: AnalogClockComponent;
	@ViewChild(DigitalDisplayComponent) private digitalDisplayComponent: DigitalDisplayComponent;

	private rawTimerCount = 0;
	private timerID;

	ngAfterContentInit(): void {
		this.digitalDisplayComponent.setDisplay('00:00:00.0');
	}

	onUserInput() {
		this.rawTimerCount = this.timeService.getDSecondsCount(this.inputTime);
		this.setTime();
	}

	setTime() {
		const restTime = this.timeService.getTime(this.rawTimerCount);
		const digitalTime = this.timeService.getTimeStringWithDSeconds(this.rawTimerCount);

		this.analogClockComponent.setTime(restTime);
		this.digitalDisplayComponent.setDisplay(digitalTime);
	}

	start() {
		if (this.rawTimerCount === 0) {
			return;
		}
		this.isStarted = true;
		this.timerID = setInterval(() => {
			if (this.rawTimerCount === 0) {
				this.stop();
			}
			this.setTime();
			this.rawTimerCount--;
		}, 100);
	}

	pause() {
		this.isStarted = false;
		clearTimeout(this.timerID);
	}

	stop() {
		this.isStarted = false;
		this.inputTime = new Time();
		this.rawTimerCount = 0;
		clearTimeout(this.timerID);
		this.setTime();
	}
}
