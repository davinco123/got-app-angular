import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { House } from '../models/houses.model';

@Injectable({ providedIn: 'root' })
export class HousesService {
  private housesSubject = new BehaviorSubject<House[]>([]);
  public page = 1;
  public housesList: House[] = [];
  public housesList$ = this.housesSubject.asObservable();
  public housesListLength = 10000;

  constructor(private http: HttpClient) {
    this.getNextHouses();
    this.housesSubject.next(this.housesList);
  }

  getHouses(): void {
    this.http
      .get<House[]>(
        environment.gotAPI + `/houses?page=${this.page}&pageSize=50`
      )
      .subscribe((data) => {
        this.housesList = [...this.housesList, ...data];
        this.housesSubject.next(this.housesList);
        this.page += 1;
      });
  }

  loadMore(): void {
    if (this.getNextHouses()) {
      this.housesSubject.next(this.housesList);
    }
  }

  getNextHouses(): boolean {
    if (this.housesList.length >= this.housesListLength) {
      return false;
    }
    this.getHouses();
    return true;
  }
}
