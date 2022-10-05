import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isArray } from 'lodash';
import { NameAndId } from 'src/app/domains/characters/models/characters.model';
import { House, updateHouse } from '../../models/houses.model';

@Component({
  selector: 'app-houses-detail',
  templateUrl: './houses-detail.component.html',
  styleUrls: ['./houses-detail.component.scss'],
})
export class HousesDetailComponent {
  public house: House;
  public updateHouseInfo: updateHouse;

  constructor(route: ActivatedRoute) {
    route.data.subscribe(() => {
      this.house = route.snapshot.data.house;

      const keyArray = [
        'currentLord',
        'heir',
        'overlord',
        'founder',
        'cadetBranches',
        'swornMembers',
      ];

      const data: any = {};

      for (const [key, value] of Object.entries(this.house)) {
        if (keyArray.includes(key)) {
          if (!isArray(value)) {
            data[key] = this.createNameAndId(value);
          } else {
            data[key] = value.map((v: string) => this.createNameAndId(v));
          }
        }
      }

      this.updateHouseInfo = data;
    });
  }

  private createNameAndId(value: string): NameAndId {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
