import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(document:click)': 'toggleMenu($event)'
  }
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu', { static: false }) menu: ElementRef;

  constructor(private renderer: Renderer2, private _eref: ElementRef) {}

  ngOnInit() {}

  toggleMenu(event?) {
    if (event) {
      if (!this._eref.nativeElement.contains(event.target)) {
        this.renderer.removeClass(this.menu.nativeElement, 'showMenu');
      }
    } else {
      if (this.menu.nativeElement.classList.contains('showMenu')) {
        this.renderer.removeClass(this.menu.nativeElement, 'showMenu');
      } else {
        this.renderer.addClass(this.menu.nativeElement, 'showMenu');
      }
    }
  }
}
