import {Component, OnInit} from '@angular/core';

declare var jQuery: any;
declare const onBootstrap: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Ahhaahahha , app works!';

    ngOnInit(): void {
        this.title = 'Hello ngOnInit!'
        // jQuery("#testH1").t
        onBootstrap('App component invoked');
    }
}
