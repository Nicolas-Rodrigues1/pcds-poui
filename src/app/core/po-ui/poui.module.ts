import { NgModule } from "@angular/core";
import { PoModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';

@NgModule({
    exports:[
        PoModule,
        PoFieldModule
    ]
})

export class PouiModule {}