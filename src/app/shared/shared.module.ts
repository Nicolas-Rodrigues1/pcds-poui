import { NgModule } from "@angular/core";
import { BannerComponent } from "./banner/banner.component";
import { CardComponent } from "./card/card.component";
import { ContainerComponent } from "./container/container.component";
import { CommonModule } from "@angular/common";
import { PouiModule } from "../core/po-ui/poui.module";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AutenticacaoRoutingModule } from "../autenticacao/autenticacao-routing.module";

@NgModule({
    declarations:[
        BannerComponent,
        CardComponent,
        ContainerComponent,
        SideMenuComponent
    ],
    imports:[
        CommonModule,
        PouiModule,
        RouterModule,
        ReactiveFormsModule,
        AutenticacaoRoutingModule
    ],
    exports:[
        BannerComponent,
        CardComponent,
        ContainerComponent,
        SideMenuComponent
    ]
})

export class SharedModule{}