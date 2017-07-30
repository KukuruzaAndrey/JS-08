import {Injectable} from '@angular/core';
import {AnalogClock} from './analog-clock';
import {Time} from '../../time';

@Injectable()
export class AnalogClockService {
	public analogClock: AnalogClock;

	constructor() {
		this.analogClock = new AnalogClock();
	}

	getAnalogClock({hours, mins, seconds}: Time): AnalogClock {
		this.analogClock.secondsDegrees = ((seconds / 60) * 360);
		this.analogClock.minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6);
		this.analogClock.hourDegrees = ((hours / 12) * 360) + ((mins / 60) * 30);
		return this.analogClock;
	}
}
