import { AbstractControl, ValidationErrors } from '@angular/forms';

export function allowedEmailDomainsValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value: string = control.value;
  const allowedDomains: string[] = ['gmail.com', 'mail.ru'];

  if (value.length === 0) return null; // Пропускаем пустые значения

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return { invalidEmailFormat: true };
  }

  // Получаем домен
  const domain: string = value.split('@')[1].toLowerCase();

  if (!domain || !allowedDomains.includes(domain)) {
    return { disallowedDomain: true };
  }

  return null; // Валидно
}
