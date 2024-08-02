import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { PouiModule } from "../core/po-ui/poui.module";
import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
    declarations:[

    ],
    imports:[
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        PouiModule,
        PagesRoutingModule
    ],
    exports:[

    ]
})

export class PagesModule {}