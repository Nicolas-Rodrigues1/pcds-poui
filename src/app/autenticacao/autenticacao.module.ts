import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { PouiModule } from "../core/po-ui/poui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login/login.component";
import { AutenticacaoRoutingModule } from "./autenticacao-routing.module";
import { CadastroComponent } from "./cadastro/cadastro.component";

@NgModule({
    declarations:[
        LoginComponent,
        CadastroComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        PouiModule,
        ReactiveFormsModule,
        FormsModule,
        AutenticacaoRoutingModule
    ],
    exports:[
        LoginComponent
    ]
})

export class AutenticacaoModule {}