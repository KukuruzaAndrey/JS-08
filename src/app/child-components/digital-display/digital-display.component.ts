import {Component} from '@angular/core';

@Component({
	selector: 'app-digital-display',
	templateUrl: './digital-display.component.html',
	styleUrls: ['./digital-display.component.css']
})
export class DigitalDisplayComponent {
	public display: string;


	public setDisplay(display: string) {
		this.display = display;
	}
}
