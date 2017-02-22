/* tslint:disable:member-ordering no-unused-variable */
import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf
}       from '@angular/core';

import {CommonModule}      from '@angular/common';

import {FooterComponent}    from './footer/footer.component';
import {HeaderComponent}    from './header/header.component';

@NgModule({
    imports: [CommonModule],
    declarations: [FooterComponent, HeaderComponent],
    exports: [FooterComponent, HeaderComponent]
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
        };
    }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */