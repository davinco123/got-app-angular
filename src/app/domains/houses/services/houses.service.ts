import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash';
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

  constructor(private http: HttpClient) {
    this.getHouses();
  }

  public get housesList$(): Observable<House[]> {
    return this.housesSubject.asObservable();
  }

  public getHouse(id: string): Observable<House> {
    return this.http.get<House>(`${environment.gotAPI}/houses/${id}`).pipe(
      switchMap((houseData) => {
        const array: string[] = [];

        Object.keys(houseData).map((hKey: string) => {
          const hValue = houseData[hKey];

          if (!isEmpty(hValue)) {
            switch (hKey) {
              case 'currentLord':
              case 'heir':
              case 'overlord':
              case 'founder':
              case 'cadetBranches':
              case 'swornMembers':
                array.push(hValue);
                break;
              default:
                return;
            }
          }
        });

        return forkJoin([...array.flat(2).map((v) => this.getName(v))]).pipe(
          map((resData) => {
            if (houseData.currentLord) {
              houseData.currentLord = resData[0];
              resData = resData.slice(1, resData.length);
            }
            if (houseData.heir) {
              houseData.heir = resData[0];
              resData = resData.slice(1, resData.length);
            }
            if (houseData.overlord) {
              houseData.overlord = resData[0];
              resData = resData.slice(1, resData.length);
            }
            if (houseData.founder) {
              houseData.founder = resData[0];
              resData = resData.slice(1, resData.length);
            }
            if (houseData.cadetBranches.length > 0) {
              houseData.cadetBranches = resData.slice(
                0,
                houseData.cadetBranches.length
              );
              resData = resData.slice(
                houseData.cadetBranches.length,
                resData.length
              );
            }
            if (houseData.swornMembers.length > 0) {
              houseData.swornMembers = resData.slice(
                0,
                houseData.swornMembers.length
              );
              resData = resData.slice(
                houseData.swornMembers.length,
                resData.length
              );
            }

            return houseData;
          })
        );
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
        map((housesData) => {
          housesData.map((house) => {
            house.url = house.url.replace(/\D/g, '');
          });
          return housesData;
        })
      )
      .subscribe((housesData) => {
        if (!name) {
          this.housesSubject.next(
            (this.housesList = [...this.saveList, ...housesData])
          );
          this.saveList = this.housesList;
          this.page++;
        } else {
          this.housesSubject.next((this.housesList = housesData));
        }
      });
  }

  public loadMore(): void {
    if (this.housesList.length < this.housesListLength) {
      this.getHouses();
      this.housesSubject.next(this.housesList);
    }
  }

  public getSave(): void {
    this.housesSubject.next((this.housesList = this.saveList));
  }

  private getName(url: string): Observable<string> {
    return this.http
      .get<House | Character>(url)
      .pipe(map((v) => `${v.name}${url.replace(/\D/g, '')}`));
  }
}
