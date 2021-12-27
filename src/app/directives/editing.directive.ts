import { Directive, Renderer2, ElementRef, HostListener, Input, DoCheck } from "@angular/core";

@Directive({
  selector: "[btnEdit]"
})
export class EditingDirective implements DoCheck {

  @Input("btnEdit")
  isReset: boolean = false;

  private _isClick: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngDoCheck(): void{
    if (!this.isReset && this._isClick){
      this._isClick = false;
      setTimeout(() => {
        this.renderer.removeStyle(this.el.nativeElement.parentElement.parentElement, "backgroundColor");
      }, 800);
    }
  }

  @HostListener("click")
  changeStyle(): void{
    this.renderer.setStyle(this.el.nativeElement.parentElement.parentElement, "backgroundColor", "#D9FFB4");
    this._isClick = true;
  }

  @HostListener("mousemove")
  addClassSearch(): void{
    this.renderer.setAttribute(this.el.nativeElement.firstElementChild, "class", "animationEdit");
  }

  @HostListener("mouseleave")
  removeClassSearch(): void{
    this.renderer.removeClass(this.el.nativeElement.firstElementChild, "animationEdit");
  }

}
