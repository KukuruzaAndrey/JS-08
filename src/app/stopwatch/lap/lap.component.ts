import {Component, Input, OnInit} from '@angular/core';
import {Lap} from './lap';
import {TimeService} from '../../time.service';

@Component({
	selector: 'app-lap',
	providers: [TimeService],
	templateUrl: './lap.component.html',
	styleUrls: ['./lap.component.css']
})
export class LapComponent implements OnInit {


	@Input() private lap: Lap;
	@Input() public ind: number;
	classForPrev = '';
	classForAvg = '';
	lapTime: string;
	lapTimeRelativePrev: string;
	lapTimeRelativeAvg: string;

	constructor(private timeService: TimeService) {
	}

	ngOnInit(): void {
		this.lapTime = this.timeService.getTimeStringWithDSeconds(this.lap.time);
		this.lapTimeRelativePrev = this.timeService.getTimeStringWithDSeconds(this.lap.timeRelativePrev);
		this.lapTimeRelativeAvg = this.timeService.getTimeStringWithDSeconds(this.lap.timeRelativeAvg);
		if (this.lap.timeRelativePrev > 0) this.classForPrev = 'better';
		if (this.lap.timeRelativePrev < 0) this.classForPrev = 'worse';
		if (this.lap.timeRelativeAvg > 0) this.classForAvg = 'better';
		if (this.lap.timeRelativeAvg < 0) this.classForAvg = 'worse';
	}
}
