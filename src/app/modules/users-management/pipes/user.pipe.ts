import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleTranslation',
  standalone: true
})
export class RoleTranslationPipe implements PipeTransform {
  transform(role: number, translationMap: any): string {
    return translationMap[role] || 'Desconhecido';
  }
}
