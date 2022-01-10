import { Directive, Renderer2, ElementRef, HostListener, DoCheck, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Directive({
  selector: "[btnEdit]"
})
export class EditingDirective implements DoCheck {
  private _isClick: boolean = false;

  @Input("btnEdit")
  score: number = 0;

  constructor(private _renderer: Renderer2, private _el: ElementRef, private _activatedRoute: ActivatedRoute) {
  }

  ngDoCheck(): void{
    if ((this._activatedRoute.snapshot.queryParams["id"] === undefined) && this._isClick){
      this._isClick = false;
      setTimeout(() => {
        this._renderer.removeStyle(this._el.nativeElement.parentElement.parentElement, "backgroundColor");
      }, 800);
    }
  }

  @HostListener("click")
  changeStyle(): void{
    if (this.score < 5){
      this._renderer.setStyle(this._el.nativeElement.parentElement.parentElement, "backgroundColor", "#D9FFB4");
      this._isClick = true;
    }
  }

  @HostListener("mousemove")
  addClassSearch(): void{
    this._renderer.setAttribute(this._el.nativeElement.firstElementChild, "class", "animationEdit");
  }

  @HostListener("mouseleave")
  removeClassSearch(): void{
    this._renderer.removeClass(this._el.nativeElement.firstElementChild, "animationEdit");
  }

}
