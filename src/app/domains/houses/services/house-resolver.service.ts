import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { House } from '../models/houses.model';
import { HousesService } from './houses.service';

@Injectable({ providedIn: 'root' })
export class HouseResolver implements Resolve<House> {
  constructor(private housesService: HousesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): House | Observable<House> | Promise<House> {
    return this.housesService.getHouse(route.params['id']);
  }
}
