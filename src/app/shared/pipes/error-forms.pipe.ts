import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorForms',
})
export class ErrorFormsPipe implements PipeTransform {
  transform(
    value: ValidationErrors | null | undefined,
    ...args: unknown[]
  ): unknown {
    if (!value) return '';
    const errorWarning: string[] = [];

    if (value) {
      if ('required' in value) {
        errorWarning.push('Este campo es requerido');
      }
      if ('email' in value) {
        errorWarning.push('Debe ser un correo válido');
      }
      if ('minlength' in value) {
        errorWarning.push(
          'Debe tener al menos ' +
            value['minlength'].requiredLength +
            ' caractéres'
        );
      }
    }
    return errorWarning.join('. ');
  }
}
