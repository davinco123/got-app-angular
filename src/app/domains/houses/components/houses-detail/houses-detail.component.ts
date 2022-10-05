import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isArray } from 'lodash';
import { Subscription } from 'rxjs';
import { NameAndId } from 'src/app/domains/characters/models/characters.model';
import { House, updateHouse } from '../../models/houses.model';
import { HousesService } from '../../services/houses.service';

@Component({
  selector: 'app-houses-detail',
  templateUrl: './houses-detail.component.html',
  styleUrls: ['./houses-detail.component.scss'],
})
export class HousesDetailComponent implements OnDestroy {
  public house: House;
  public id = '';
  public updateHouseInfo: updateHouse;
  private routeSub: Subscription;

  constructor(route: ActivatedRoute, housesService: HousesService) {
    this.routeSub = route.paramMap.subscribe((params) => {
      if (params.get('id') !== this.id) {
        this.id = params.get('id');
      }

      housesService.getHouse(this.id).subscribe((hData) => {
        this.house = hData;
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
    });
  }

  public ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  private createNameAndId(value: string): NameAndId {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
