import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { CardComponent } from "./cards/card.component";

const routes: Routes = [
    { path: "", redirectTo: "/card", pathMatch: "full" },
    { path: "card", component: CardComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }