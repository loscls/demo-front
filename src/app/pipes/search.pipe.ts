import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../dTypes';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList: Product[], searchTerm: string): Product[] {
    return productList.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())||item.brand.toLowerCase().includes(searchTerm.toLowerCase()));
  }

}
