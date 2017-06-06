import {AfterViewInit, Component, OnInit} from "@angular/core";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {


    constructor() {
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        // Thanks for https://github.com/jnicol/particleground
        particleground(document.getElementById('particles'), {
            dotColor: '#70C1E3',
            lineColor: '#70C1E3',
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
        });
    }


}
