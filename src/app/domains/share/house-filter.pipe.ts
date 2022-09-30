import { Pipe, PipeTransform } from '@angular/core';
import { House } from '../houses/models/houses.model';

@Pipe({
  name: 'houseFilter',
})
export class HousesFilterPipe implements PipeTransform {
  transform(houses: House[], searchText: string): House[] {
    if (!houses) {
      return [];
    }
    if (!searchText) {
      return houses;
    }

    searchText = searchText.toLocaleLowerCase();

    return houses.filter((house) => {
      return (
        house.name.toLocaleLowerCase().includes(searchText) ||
        house.region.toLocaleLowerCase().includes(searchText) ||
        house.coatOfArms.toLocaleLowerCase().includes(searchText) ||
        house.words.includes(searchText) ||
        house.titles.find((title) => {
          return title.toLocaleLowerCase().includes(searchText);
        }) ||
        house.seats.find((seat) => {
          return seat.toLocaleLowerCase().includes(searchText);
        }) ||
        house.ancestralWeapons.find((weapon) => {
          return weapon.toLocaleLowerCase().includes(searchText);
        }) ||
        house.cadetBranches.find((branch) => {
          return branch.toLocaleLowerCase().includes(searchText);
        })
      );
    });
  }
}
