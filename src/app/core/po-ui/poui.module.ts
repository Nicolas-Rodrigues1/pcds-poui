import { NgModule } from "@angular/core";
import { PoModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoDynamicModule } from '@po-ui/ng-components';

@NgModule({
    exports:[
        PoModule,
        PoFieldModule,
        PoDynamicModule
    ]
})

export class PouiModule {}