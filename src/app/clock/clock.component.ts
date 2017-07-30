import {Component, OnInit, ViewChild} from '@angular/core';
import {AnalogClockComponent} from '../child-components/analog-clock/analog-clock.component';
import {DigitalDisplayComponent} from '../child-components/digital-display/digital-display.component';
import {TimeService} from '../time.service';

@Component({
	selector: 'app-clock',
	providers: [TimeService],
	templateUrl: './clock.component.html',
	styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {
	constructor(private service: TimeService) {
	}

	@ViewChild(AnalogClockComponent) private analogClockComponent: AnalogClockComponent;
	@ViewChild(DigitalDisplayComponent) private digitalDisplayComponent: DigitalDisplayComponent;

	ngOnInit(): void {
		setInterval(() => this.setTime(), 1000);
	}


	public setTime(): void {
		const timeNow = this.service.getTimeNow();
		const digitalTime = this.service.getTimeString(timeNow);

		this.analogClockComponent.setTime(timeNow);
		this.digitalDisplayComponent.setDisplay(digitalTime);
	}
}
