import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NameAndId } from 'src/app/domains/characters/models/characters.model';
import { House } from '../../models/houses.model';

@Component({
  selector: 'app-houses-detail',
  templateUrl: './houses-detail.component.html',
  styleUrls: ['./houses-detail.component.scss'],
})
export class HousesDetailComponent {
  public house: House;
  public currentLord: NameAndId;
  public overlord: NameAndId;
  public heir: NameAndId;
  public founder: NameAndId;
  public cadetBranches: NameAndId[];
  public swornMembers: NameAndId[];

  constructor(route: ActivatedRoute) {
    route.data.subscribe(() => {
      this.house = route.snapshot.data.house;

      this.currentLord = this.createNameAndId(this.house.currentLord);
      this.overlord = this.createNameAndId(this.house.overlord);
      this.heir = this.createNameAndId(this.house.heir);
      this.founder = this.createNameAndId(this.house.founder);
      this.cadetBranches = this.house.cadetBranches.map((v) => {
        return this.createNameAndId(v);
      });

      this.swornMembers = this.house.swornMembers.map((v) => {
        return this.createNameAndId(v);
      });
    });
  }

  private createNameAndId(value: string): NameAndId {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
