import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { SwipeGestureEventData, GesturesObserver, GestureTypes } from "ui/gestures";
import { GridLayout, ItemSpec, GridUnitType } from "ui/layouts/grid-layout";
import { AbsoluteLayout } from "ui/layouts/absolute-layout";
import { Label } from "ui/label";
import { CardService } from './card.service';
import { Emoji } from './emoji';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

@Component({
    moduleId: module.id,
    templateUrl: "./card.component.html"
})
export class CardComponent implements OnInit, AfterViewInit {

    constructor(
        private cardService: CardService,
        private fonticon: TNSFontIconService
    ){}

    emoji: Emoji[];
    code: string;
    i: number = 0;
    @ViewChild("absolutelayout") al: ElementRef;
    @ViewChild("yes") yes: ElementRef;
    @ViewChild("no") no: ElementRef;
    absolutelayout: AbsoluteLayout; 
    

    ngOnInit(){
        this.emoji = this.cardService.getEmoji();
        this.code = this.emoji[this.i].code;
    }

    ngAfterViewInit(){
        this.absolutelayout = this.al.nativeElement;

        for(var key in this.emoji) {
            this.i--;
            let grid = new GridLayout();
            let emoji = new Label();
            emoji.text = this.emoji[key].code;
            grid.addChild(emoji);
            grid.cssClass = 'card ' + this.emoji[key].color;
            grid.id = 'card'+Number(key);
            grid.marginTop = this.i;

            this.absolutelayout.addChild(grid)
            //make card swipable

            let yes = <Label>this.yes.nativeElement;
            let no = <Label>this.no.nativeElement;

            grid.on(GestureTypes.swipe, function (args: SwipeGestureEventData) {
                if(args.direction == 1){

                    console.log("swipe right")
                    
                    let duration = 100;
                    yes.animate({ opacity: 0, duration: duration })
                        .then(() => yes.animate({ opacity: 1, duration: duration }))
                        .then(() => yes.animate({ opacity: 0, duration: duration }))
                        .catch((e) => {
                            console.log(e.message);
                        });

                      grid.animate({ translate: { x: 1000, y: 100 } })
                        .then(function () { return grid.animate({ translate: { x: 0, y: -2000 } }); })
                        .catch(function (e) {
                            console.log(e.message);
                        });
                    }
                else {
                    
                    let duration = 100;
                    no.animate({ opacity: 0, duration: duration })
                        .then(() => no.animate({ opacity: 1, duration: duration }))
                        .then(() => no.animate({ opacity: 0, duration: duration }))
                        .catch((e) => {
                            console.log(e.message);
                        });

                console.log("swipe left")
                grid.animate({ translate: { x: -1000, y: 100} })
                        .then(function () { return grid.animate({ translate: { x: 0, y: -2000 } }); })	
                        .catch(function (e) {
                            console.log(e.message);
                    });

                }
            });
        }
        
    }

    
}