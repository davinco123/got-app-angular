import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isArray, isEmpty } from 'lodash-es';
import {
  BehaviorSubject,
  Observable,
  map,
  switchMap,
  forkJoin,
  tap,
  of,
  catchError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Character } from '../../characters/models/characters.model';
import { House } from '../models/houses.model';

@Injectable({ providedIn: 'root' })
export class HousesService {
  public page = 1;
  public housesList: House[] = [];
  public saveList: House[] = [];
  public housesListLength = 10000;
  private housesSubject = new BehaviorSubject<House[]>([]);

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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

        if (!isEmpty(data)) {
          return forkJoin(
            Object.keys(data).map((k) => {
              if (isArray(data[k])) {
                return forkJoin(
                  data[k].map((v: string) => this.getName(v))
                ).pipe(
                  tap((res: string[]) => {
                    hData[k] = res;
                  })
                );
              } else {
                return forkJoin([this.getName(data[k])]).pipe(
                  tap((res) => (hData[k] = res[0]))
                );
              }
            })
          ).pipe(map(() => hData));
        } else {
          return of(hData);
        }
      }),
      catchError(() => {
        this.router.navigate(['not-found'], {
          relativeTo: this.route.parent,
        });
        return of();
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
        tap((hData) => {
          hData.forEach((house) => {
            house.url = house.url.replace(/\D/g, '');
          });
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
