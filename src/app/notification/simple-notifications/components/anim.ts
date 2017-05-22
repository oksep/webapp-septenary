import {animate, state, style, transition, trigger} from "@angular/animations";

export default trigger('enterLeave', [

    // Enter from right
    state('fromRight', style({opacity: 1, transform: 'translateX(0)'})),
    transition('* => fromRight', [
        style({opacity: 0, transform: 'translateX(5%)'}),
        animate('400ms ease-in-out')
    ]),
    state('fromRightOut', style({opacity: 0, transform: 'translateX(-5%)'})),
    transition('fromRight => fromRightOut', [
        style({opacity: 1, transform: 'translateX(0)'}),
        animate('300ms ease-in-out')
    ]),

    // Enter from left
    state('fromLeft', style({opacity: 1, transform: 'translateX(0)'})),
    transition('* => fromLeft', [
        style({opacity: 0, transform: 'translateX(-5%)'}),
        animate('400ms ease-in-out')
    ]),
    state('fromLeftOut', style({opacity: 0, transform: 'translateX(5%)'})),
    transition('fromLeft => fromLeftOut', [
        style({opacity: 1, transform: 'translateX(0)'}),
        animate('300ms ease-in-out')
    ]),

    // Rotate
    state('scale', style({opacity: 1, transform: 'scale(1)'})),
    transition('* => scale', [
        style({opacity: 0, transform: 'scale(0)'}),
        animate('400ms ease-in-out')
    ]),
    state('scaleOut', style({opacity: 0, transform: 'scale(0)'})),
    transition('scale => scaleOut', [
        style({opacity: 1, transform: 'scale(1)'}),
        animate('400ms ease-in-out')
    ]),

    // Scale
    state('rotate', style({opacity: 1, transform: 'rotate(0deg)'})),
    transition('* => rotate', [
        style({opacity: 0, transform: 'rotate(5deg)'}),
        animate('400ms ease-in-out')
    ]),
    state('rotateOut', style({opacity: 0, transform: 'rotate(-5deg)'})),
    transition('rotate => rotateOut', [
        style({opacity: 1, transform: 'rotate(0deg)'}),
        animate('400ms ease-in-out')
    ])
]);