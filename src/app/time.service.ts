import {Injectable} from '@angular/core';
import {Time} from './time';

@Injectable()
export class TimeService {
	private time: Time;

	constructor() {
		this.time = new Time;
	}

	getDSecondsCount({hours, mins, seconds}: Time): number {
		return (hours * 3600 + mins * 60 + seconds) * 10;
	}

	getTime(rawTimeCount: number): Time {
		let restSeconds: number = Math.floor(rawTimeCount / 10);
		this.time.hours = Math.floor(restSeconds / 3600);
		restSeconds %= 3600;
		this.time.mins = Math.floor(restSeconds / 60);
		this.time.seconds = restSeconds % 60;
		return this.time;
	}

	getTimeStringWithDSeconds(rawTimeCount: number): string {
		if (rawTimeCount < 0) {
			// noinspection AssignmentToFunctionParameterJS
			rawTimeCount = -rawTimeCount;
		}
		const {hours, mins, seconds} = this.getTime(rawTimeCount);
		return `${this.toTimeView(hours)}:${this.toTimeView(mins)}:${this.toTimeView(seconds)}.${rawTimeCount % 10}`;
	}

	getTimeString({hours, mins, seconds}: Time): string {
		return `${this.toTimeView(hours)}:${this.toTimeView(mins)}:${this.toTimeView(seconds)}`;
	}

	getTimeNow(): Time {
		const now = new Date();
		this.time.seconds = now.getSeconds();
		this.time.mins = now.getMinutes();
		this.time.hours = now.getHours();
		return this.time;
	}

	private toTimeView(time: number): string {
		return time.toString().padStart(2, '0');
	}
}
