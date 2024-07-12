import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searching',
})
export class SearchingPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    if (!arg || arg.length === 0) {
      return value;
    }
    const resultPosts = [];

    for (const post of value) {
      if (
        post.titulo &&
        post.titulo.toLowerCase().includes(arg.toLowerCase())
      ) {
        resultPosts.push(post);
      }
    }

    return resultPosts;
  }
}
