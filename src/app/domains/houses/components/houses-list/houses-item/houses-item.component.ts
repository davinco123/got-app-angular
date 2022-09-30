import { Component, EventEmitter, Input, Output } from '@angular/core';
import { House } from '../../../models/houses.model';

@Component({
  selector: 'app-houses-item',
  templateUrl: './houses-item.component.html',
  styleUrls: ['./houses-item.component.scss'],
})
export class HousesItemComponent {
  @Input() public houseList: House[] = [];
  @Output() public scrollingFinished = new EventEmitter<void>();

  onScrollingFinished() {
    this.scrollingFinished.emit();
  }
}
