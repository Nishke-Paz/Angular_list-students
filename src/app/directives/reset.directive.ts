import { Directive, Renderer2, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[btnReset]"
})
export class ResetDirective {

  @Input("btnReset")
  reset: () => void = () => {};

  @HostListener("click")
  change(): void{
    this.reset();
    this.renderer.setAttribute(this.el.nativeElement, "disabled", "true");
    const originalText = this.el.nativeElement.innerText;
    this.el.nativeElement.innerText = "сброшено";
    setTimeout(() => {
      this.renderer.removeAttribute(this.el.nativeElement, "disabled");
      this.el.nativeElement.innerText = originalText;
    }, 1000);
  }

  constructor(public renderer: Renderer2, public el: ElementRef) {
  }

}
