import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { isArray } from 'lodash-es';

import { NameAndId } from 'src/app/domains/share/models/share.model';
import { House, updateHouse } from '../../models/houses.model';
import { HousesService } from '../../services/houses.service';

@Component({
  selector: 'app-houses-detail',
  templateUrl: './houses-detail.component.html',
  styleUrls: ['./houses-detail.component.scss'],
})
export class HousesDetailComponent implements OnInit {
  public house: House;
  public id = '';
  public updateHouseInfo: updateHouse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private housesService: HousesService
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id') !== this.id) {
        this.id = params.get('id');
      }

      this.housesService.getHouse(this.id).subscribe((hData) => {
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

    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.house = null;
      }
    });
  }

  private createNameAndId(value: string): NameAndId {
    return {
      id: value.replace(/\D/g, ''),
      name: value.replace(/[0-9]/g, ''),
    };
  }
}
