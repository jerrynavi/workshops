import { date, number, object, string } from 'yup';
import { intl } from 'utils/language-service';

const checkoutFormSchema = object({
  firstName: string().required(
    intl.formatMessage(
      {
        id: 'isRequired',
      },
      {
        fieldName: 'First name',
      },
    ),
  ),
  lastName: string().required(
    intl.formatMessage(
      {
        id: 'isRequired',
      },
      {
        fieldName: 'Last name',
      },
    ),
  ),
  email: string()
    .email()
    .required(
      intl.formatMessage({
        id: 'emailInvalid',
      }),
    ),
  dateOfBirth: date().optional().nullable(),
  gender: string().optional().nullable(),
  address: string().optional().nullable(),
  zipCode: number()
    .typeError(
      intl.formatMessage({
        id: 'zipInvalid',
      }),
    )
    .optional()
    .nullable()
    .min(
      5,
      intl.formatMessage({
        id: 'zipInvalid',
      }),
    ),
});

export default checkoutFormSchema;
