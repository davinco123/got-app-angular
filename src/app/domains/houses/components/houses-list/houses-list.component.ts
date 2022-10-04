import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
} from 'rxjs';

import { House } from '../../models/houses.model';
import { HousesService } from '../../services/houses.service';

@Component({
  selector: 'app-houses-list',
  styleUrls: ['./houses-list.component.scss'],
  templateUrl: './houses-list.component.html',
})
export class HousesListComponent {
  public houseList$: Observable<House[]>;
  public searchText = new FormControl();

  constructor(private housesService: HousesService) {
    this.houseList$ = housesService.housesList$;

    this.searchText.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (!value) {
          this.housesService.housesList = [];
        }
        housesService.getHouses(value);
      });
  }

  onScrollingFinished() {
    this.housesService.loadMore();
  }
}
