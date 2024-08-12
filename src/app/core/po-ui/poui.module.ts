import { NgModule } from "@angular/core";
import { PoButtonModule, PoModule, PoWidgetModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoDynamicModule } from '@po-ui/ng-components';
import { PoMenuModule } from '@po-ui/ng-components';
import { PoModalModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from "@po-ui/ng-templates";
import { PoTableModule } from '@po-ui/ng-components';
import { PoChartModule } from '@po-ui/ng-components';

@NgModule({
    exports:[
        PoModule,
        PoButtonModule,
        PoFieldModule,
        PoDynamicModule,
        PoMenuModule,
        PoModalModule,
        PoTemplatesModule,
        PoWidgetModule,
        PoDynamicModule,
        PoTableModule,
        PoChartModule
    ]
})

export class PouiModule {}