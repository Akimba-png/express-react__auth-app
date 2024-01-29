import { FieldErrors } from 'react-hook-form';
import { RegData } from '../models/user';

export const validate = (
  errors: FieldErrors<RegData>,
  field: keyof RegData
) => {
  switch (errors[field]?.type) {
    case 'required':
      return 'field is required';
    case 'minLength':
      return 'min lenght is 3';
    case 'pattern':
      return 'email must includes @';
    default:
      return '';
  }
}
