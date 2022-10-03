import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  map,
  switchMap,
  of,
  forkJoin,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../../characters/models/characters.model';
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

  public getHouse(id: string): Observable<House> {
    return this.http.get<House>(environment.gotAPI + `/houses/${id}`).pipe(
      map((houseData) => {
        return houseData;
      }),
      switchMap((houseData) => {
        if (houseData.currentLord) {
          return this.getNameFromCharacter(
            houseData,
            'currentLord',
            houseData.currentLord
          );
        } else {
          return of(houseData);
        }
      }),
      switchMap((houseData) => {
        if (houseData.heir) {
          return this.getNameFromCharacter(houseData, 'heir', houseData.heir);
        } else {
          return of(houseData);
        }
      }),
      switchMap((houseData) => {
        if (houseData.founder) {
          return this.getNameFromCharacter(
            houseData,
            'founder',
            houseData.founder
          );
        } else {
          return of(houseData);
        }
      }),
      switchMap((houseData) => {
        if (houseData.overlord) {
          return this.getNameFromCharacter(
            houseData,
            'overlord',
            houseData.overlord
          );
        } else {
          return of(houseData);
        }
      }),
      switchMap((houseData) => {
        if (houseData.cadetBranches.length > 0) {
          return forkJoin([
            ...houseData.cadetBranches.map((house) =>
              this.getNameFromArray(house)
            ),
          ]).pipe(
            map((value) => {
              houseData.cadetBranches = value;
              return houseData;
            })
          );
        } else {
          return of(houseData);
        }
      }),
      switchMap((houseData) => {
        if (houseData.swornMembers.length > 0) {
          return forkJoin([
            ...houseData.swornMembers.map((character) =>
              this.getNameFromArray(character)
            ),
          ]).pipe(
            map((value) => {
              houseData.swornMembers = value;
              return houseData;
            })
          );
        } else {
          return of(houseData);
        }
      })
    );
  }

  public getHouses(): void {
    this.http
      .get<House[]>(
        environment.gotAPI + `/houses?page=${this.page}&pageSize=50`
      )
      .pipe(
        map((housesData) => {
          housesData.map((house) => {
            house.url = house.url.replace(/\D/g, '');
          });
          return housesData;
        })
      )
      .subscribe((housesData) => {
        this.housesList = [...this.housesList, ...housesData];
        this.housesSubject.next(this.housesList);
        this.page += 1;
      });
  }

  public loadMore(): void {
    if (this.getNextHouses()) {
      this.housesSubject.next(this.housesList);
    }
  }

  public getNextHouses(): boolean {
    if (this.housesList.length >= this.housesListLength) {
      return false;
    }
    this.getHouses();
    return true;
  }

  private getNameFromCharacter(
    houseData: House,
    type: string,
    url: string
  ): Observable<House> {
    return this.http.get<Character>(url).pipe(
      map((c) => {
        houseData[type] = `${c.name}${houseData[type].replace(/\D/g, '')}`;
        return houseData;
      })
    );
  }

  private getNameFromArray(url: string): Observable<string> {
    return this.http
      .get<House | Character>(url)
      .pipe(map((v) => `${v.name}${url.replace(/\D/g, '')}`));
  }
}
