import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isArray, isEmpty } from 'lodash';
import { BehaviorSubject, Observable, map, switchMap, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../../characters/models/characters.model';
import { House } from '../models/houses.model';

@Injectable({ providedIn: 'root' })
export class HousesService {
  private housesSubject = new BehaviorSubject<House[]>([]);
  public page = 1;
  public housesList: House[] = [];
  public saveList: House[] = [];
  public housesListLength = 10000;

  constructor(private http: HttpClient) {}

  public get housesList$(): Observable<House[]> {
    return this.housesSubject.asObservable();
  }

  public getHouse(id: string): Observable<House> {
    return this.http.get<House>(`${environment.gotAPI}/houses/${id}`).pipe(
      switchMap((hData) => {
        const keyArrays = [
          'currentLord',
          'heir',
          'overlord',
          'founder',
          'cadetBranches',
          'swornMembers',
        ];

        const data = {};

        for (const [key, value] of Object.entries(hData)) {
          if (keyArrays.includes(key) && !isEmpty(value)) {
            data[key] = value;
          }
        }

        return forkJoin(
          Object.keys(data).map((k) => {
            if (isArray(data[k])) {
              return forkJoin(data[k].map((v: string) => this.getName(v))).pipe(
                map((res: string[]) => {
                  hData[k] = res;
                })
              );
            } else {
              return forkJoin([this.getName(data[k])]).pipe(
                map((res) => (hData[k] = res[0]))
              );
            }
          })
        ).pipe(map(() => hData));
      })
    );
  }

  public getHouses(name?: string): void {
    this.http
      .get<House[]>(`${environment.gotAPI}/houses?pageSize=50`, {
        params: {
          page: name ? '' : this.page,
          name: name ? name : '',
        },
      })
      .pipe(
        map((hData) => {
          hData.map((house) => {
            house.url = house.url.replace(/\D/g, '');
          });
          return hData;
        })
      )
      .subscribe((hData) => {
        if (!name) {
          this.housesSubject.next(
            (this.housesList = [...this.housesList, ...hData])
          );
        } else {
          this.housesSubject.next((this.housesList = hData));
          this.page = 1;
        }
      });
  }

  public loadMore(): void {
    if (this.housesList.length < this.housesListLength) {
      this.page++;
      this.getHouses();
    }
  }

  private getName(url: string): Observable<string> {
    return this.http
      .get<House | Character>(url)
      .pipe(map((v) => `${v.name}${url.replace(/\D/g, '')}`));
  }
}
