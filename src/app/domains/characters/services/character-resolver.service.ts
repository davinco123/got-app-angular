import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from '../models/characters.model';
import { CharactersService } from './characters.service';

@Injectable({ providedIn: 'root' })
export class CharacterResolver implements Resolve<Character> {
  constructor(private charactersService: CharactersService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Character | Observable<Character> | Promise<Character> {
    return this.charactersService.getCharacter(route.params['id']);
  }
}
