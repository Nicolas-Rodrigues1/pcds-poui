import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { PouiModule } from "../core/po-ui/poui.module";

@NgModule({
    declarations:[
        HomeComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        PouiModule,
        HomeRoutingModule
    ],
    exports:[
        HomeComponent
    ]
})

export class HomeModule{}