import {AfterViewInit, Component} from '@angular/core';

const DEFAULT_OPTION = {
	dotColor: '#5CBDAA',
	lineColor: '#5CBDAA',
	minSpeedX: 0.3,
	maxSpeedX: 0.8,
	minSpeedY: 0.3,
	maxSpeedY: 0.8,
	directionX: 'right', // 'center', 'left' or 'right'
	directionY: 'down', // 'center', 'up' or 'down'
	density: 4000, // one particle every n pixels.
	particleRadius: 5,
	lineWidth: 1,
	curvedLines: false, // 曲线
	proximity: 80, // 两点距离多远连接
	parallax: false, // 跟随鼠标
};

@Component({
	selector: 'app-particle-ground',
	template: `
      <style>
          :host {
              display: block;
              width: 100%;
              height: 100%;
              background-color: #16A085;
              position: relative;
          }

          .fill-in {
              position: absolute;
              width: 100%;
              height: 100%;
              left: 0;
              right: 0;
              top: 0;
              bottom: 0;
          }
      </style>
      <div id="particles" class="fill-in">
      </div>
      <div class="fill-in">
          <ng-content></ng-content>
      </div>
	`
})
export class ParticleGroundComponent implements AfterViewInit {

	constructor() {
	}

	ngOnInit() {
	}

	ngAfterViewInit(): void {
		// Thanks for https://github.com/jnicol/particleground
		let option = {
			dotColor: '#5cbdaa',
			lineColor: '#5cbdaa'
		};
		particleground(document.getElementById('particles'), option);
	}

}
