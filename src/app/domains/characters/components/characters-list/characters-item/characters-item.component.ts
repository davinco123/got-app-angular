import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../../models/characters.model';

@Component({
  selector: 'app-characters-item',
  templateUrl: './characters-item.component.html',
})
export class CharactersItemComponent {
  @Input() public characterList: Character[];
  @Output() public scrollingFinished = new EventEmitter<void>();

  onScrollingFinished(): void {
    this.scrollingFinished.emit();
  }
}
