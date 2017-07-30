import {Component} from '@angular/core';
import {AnalogClock} from './analog-clock';
import {AnalogClockService} from './analog-clock.service';
import {Time} from '../../time';

@Component({
	selector: 'app-analog-clock',
	providers: [AnalogClockService],
	templateUrl: './analog-clock.component.html',
	styleUrls: ['./analog-clock.component.css']
})
export class AnalogClockComponent {
	analogClock: AnalogClock;


	constructor(private analogClockService: AnalogClockService) {
		this.analogClock = new AnalogClock();
	}

	setTime(time: Time): void {
		this.analogClock = this.analogClockService.getAnalogClock(time);
	}
}
