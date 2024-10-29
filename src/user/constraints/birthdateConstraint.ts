import { ValidationOptions, registerDecorator } from "class-validator";

export function IsBirthDate(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isBirthDate',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any) {
            if (typeof value !== 'string') return false;
  
            const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([0-9]{4})$/;
            if (!regex.test(value)) {
              return false;
            }
  
            const [day, month, year] = value.split('/').map(Number);
            const date = new Date(year, month - 1, day);
  
            return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
          },
        },
      });
    };
}