import { Component, OnInit } from '@angular/core';
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
export class HousesListComponent implements OnInit {
  public houseList$: Observable<House[]>;
  public isLoading = true;
  public searchText = new FormControl();

  constructor(private housesService: HousesService) {}

  public ngOnInit(): void {
    this.houseList$ = this.housesService.housesList$;

    this.searchText.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        if (!value) {
          this.housesService.housesList = [];
          this.housesService.page = 1;
        }
        this.housesService.getHouses(value);
        this.isLoading = false;
      });
  }

  public onScrollingFinished() {
    this.housesService.loadMore();
  }
}
