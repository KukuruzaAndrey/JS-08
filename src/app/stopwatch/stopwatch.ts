import {AnalogClockComponent} from '../child-components/analog-clock/analog-clock.component';
import {DigitalDisplayComponent} from '../child-components/digital-display/digital-display.component';

export class Stopwatch {
	isStarted: boolean;
	timerID;
	rawDSecondCount: number;
	analogClockComponent: AnalogClockComponent;
	digitalDisplayComponent: DigitalDisplayComponent;

	constructor() {
		this.rawDSecondCount = 0;
		this.isStarted = false;
	}
}
