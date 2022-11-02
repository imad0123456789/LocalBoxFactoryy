import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Box} from './box';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const boxes = [
      {id: 12, name: 'glass box', height: 2, lenght: 5, width: 3, type: 'cartoon', color: 'red', price: 10},
      {id: 13, name: 'Milke box', height: 1, lenght: 2, width: 2, type: 'cartoon', color: 'white', price: 5},
      {id: 14, name: 'Small box', height: 1, lenght: 1, width: 1, type: 'cartoon', color: 'brawn', price: 2},
      {id: 15, name: 'Lagre box', height: 5, lenght: 5, width: 5, type: 'cartoon', color: 'pink', price: 12},
      {id: 16, name: 'Phone box', height: 3, lenght: 5, width: 3, type: 'cartoon', color: 'blue', price: 3},
      {id: 17, name: 'PC box', height: 2, lenght: 3, width: 3, type: 'cartoon', color: 'red', price: 20},
      {id: 18, name: 'Book box', height: 3, lenght: 3, width: 3, type: 'cartoon', color: 'black', price: 15},
      {id: 19, name: 'Pen box', height: 1, lenght: 1, width: 1, type: 'cartoon', color: 'green', price: 9},
      {id: 20, name: 'Gift box', height: 2, lenght: 2, width: 2, type: 'cartoon', color: 'red', price: 7}
    ];

    return {boxes};
  }

  genId(boxes: Box[]): number {
    return boxes.length > 0 ? Math.max(...boxes.map(box =>
        box.id)) + 1 : 11;
  }
}
