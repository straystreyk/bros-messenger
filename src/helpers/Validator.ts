export class Validator {
  email(email: string): boolean {
    return /^[^@]+@\w+(\.\w+)+\w$/.test(email.toString());
  }

  minLength(target: string | number, minLength: number): boolean {
    return target.toString().length >= minLength;
  }

  maxLength(target: string | number, maxLength: number): boolean {
    return target.toString().length <= maxLength;
  }
}
