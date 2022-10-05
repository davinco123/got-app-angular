import { Directive, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollTracker]',
})
export class ScrollTrackerDirective {
  @Output() public scrollingFinished = new EventEmitter<void>();
  private emitted = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.emitted
    ) {
      this.emitted = true;
      this.scrollingFinished.emit();
    } else if (
      window.innerHeight + window.scrollY <
      document.body.offsetHeight
    ) {
      this.emitted = false;
    }
  }
}
