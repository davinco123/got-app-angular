import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '../../models/characters.model';

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.scss'],
})
export class CharactersDetailComponent implements OnInit {
  public character: Character;
  public spouseId = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(() => {
      this.character = this.route.snapshot.data.character;
      this.spouseId = this.character.spouse.replace(/[^0-9]/g, '');
    });
  }
}
