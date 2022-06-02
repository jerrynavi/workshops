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
  address: string().optional().nullable().min(10),
  zipCode: number().optional().nullable().min(5),
});

export default checkoutFormSchema;
