import { NgModule } from "@angular/core";
import { BannerComponent } from "./banner/banner.component";
import { CardComponent } from "./card/card.component";
import { ContainerComponent } from "./container/container.component";
import { CommonModule } from "@angular/common";
import { PouiModule } from "../core/po-ui/poui.module";

@NgModule({
    declarations:[
        BannerComponent,
        CardComponent,
        ContainerComponent
    ],
    imports:[
        CommonModule,
        PouiModule
        
    ],
    exports:[
        BannerComponent,
        CardComponent,
        ContainerComponent
    ]
})

export class SharedModule{}