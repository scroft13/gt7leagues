// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StringSchema } from 'yup';

declare module 'yup' {
  interface StringSchema {
    price(): StringSchema;
    phone(): StringSchema;
    zip(): StringSchema;
    state(): StringSchema;
    country(): StringSchema;
    category(categories: string[]): StringSchema;
    deliveryMethod(): StringSchema;
    website(): StringSchema;
    password(): StringSchema;
    confirmPassword(): StringSchema;
    creditCard(): StringSchema;
    ccCode(): StringSchema;
    verifyCheckoutDate(): StringSchema;
    verifyCheckInDate(): StringSchema;
    greaterThan(): StringSchema;
  }
  interface NumberSchema {
    quantityCheck(number: number): NumberSchema;
    greaterThan(): NumberSchema;
  }
}
