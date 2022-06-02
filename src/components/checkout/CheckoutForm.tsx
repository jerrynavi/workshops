import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from './checkoutFormSchema';
import { useAppDispatch, useCart } from 'store/hooks';
import { FormattedMessage } from 'react-intl';
import { intl } from 'utils/language-service';
import { useState } from 'react';
import { useLazySaveOrderQuery } from 'core';

type FormProps = {
  onSuccess: () => void;
};

type CheckoutFormFields = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  gender?: string | null;
  address: string;
  zipCode: string;
};

const genderOptions = [
  {
    id: 'male',
    label: 'Male',
  },
  {
    id: 'female',
    label: 'Female',
  },
  {
    id: 'other',
    label: 'prefer not to say',
  },
];

export default function CheckoutForm({ onSuccess }: FormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CheckoutFormFields>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const { items, subtotal } = useCart();
  const dispatch = useAppDispatch();
  const [triggerSave] = useLazySaveOrderQuery();

  const [agreeTerms, setAgreeTerms] = useState(false);

  const saveOrder = async (data: CheckoutFormFields) => {
    const order = {
      products: items.map(({ workshop, total: quantity }) => {
        return {
          ...workshop,
          quantity,
        };
      }),
      total: subtotal,
    };
    try {
      await triggerSave(order).unwrap();
      dispatch({ type: 'cart/RESET' });
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveOrder)}>
      <div
        className={`input-group ${
          errors?.firstName?.message ? 'has-error' : ''
        }`}
      >
        <div className="input-header">
          <label htmlFor="firstName">
            <FormattedMessage id="firstName" />
          </label>
          {errors?.firstName?.message && (
            <span className="has-error">{errors.firstName.message}</span>
          )}
        </div>
        <input
          type="text"
          placeholder={intl.formatMessage({
            id: 'firstNamePlaceholder',
          })}
          {...register('firstName')}
        />
      </div>

      <div
        className={`input-group ${
          errors?.lastName?.message ? 'has-error' : ''
        }`}
      >
        <div className="input-header">
          <label htmlFor="lastName">
            <FormattedMessage id="lastName" />
          </label>
          {errors?.lastName?.message && (
            <span className="has-error">{errors.lastName.message}</span>
          )}
        </div>
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'lastNamePlaceholder' })}
          {...register('lastName')}
        />
      </div>

      <div
        className={`input-group ${errors?.email?.message ? 'has-error' : ''}`}
      >
        <div className="input-header">
          <label htmlFor="email">
            <FormattedMessage id="email" />
          </label>
          {errors?.email?.message && (
            <span className="has-error">{errors.email.message}</span>
          )}
        </div>
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'emailAddressPlaceholder' })}
          {...register('email')}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:gap-x-10">
        <div className="w-full md:w-1/2">
          <div
            className={`input-group ${
              errors?.dateOfBirth?.message ? 'has-error' : ''
            }`}
          >
            <div className="input-header">
              <label htmlFor="dateOfBirth">
                <FormattedMessage id="dateOfBirth" />
              </label>
              {errors?.dateOfBirth?.message && (
                <span className="has-error">{errors.dateOfBirth.message}</span>
              )}
            </div>
            <input
              type="date"
              defaultValue="1998-06-01"
              {...register('dateOfBirth', { valueAsDate: true })}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div
            className={`input-group ${
              errors?.gender?.message ? 'has-error' : ''
            }`}
          >
            <div className="input-header">
              <label htmlFor="gender">
                <FormattedMessage id="gender" />
              </label>
              {errors?.gender?.message && (
                <span className="has-error">{errors.gender.message}</span>
              )}
            </div>
            <select
              className="border-0 border-b-2 border-blue focus:ring-0"
              title={intl.formatMessage({ id: 'gender' })}
              {...register('gender')}
            >
              {genderOptions.map(({ id, label }) => (
                <option key={id} value={id}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div
        className={`input-group ${errors?.address?.message ? 'has-error' : ''}`}
      >
        <div className="input-header">
          <label htmlFor="address">
            <FormattedMessage id="address" />
          </label>
          {errors?.address?.message && (
            <span className="has-error">{errors.address.message}</span>
          )}
        </div>
        <input
          type="text"
          placeholder={intl.formatMessage({
            id: 'addressPlaceholder',
          })}
          {...register('address')}
        />
      </div>

      <div
        className={`input-group ${errors?.zipCode?.message ? 'has-error' : ''}`}
      >
        <div className="input-header">
          <label htmlFor="zipCode">
            <FormattedMessage id="zipCode" />
          </label>
          {errors?.zipCode?.message && (
            <span className="has-error">{errors.zipCode.message}</span>
          )}
        </div>
        <input
          type="text"
          placeholder={intl.formatMessage({ id: 'zipCodePlaceholder' })}
          {...register('zipCode')}
        />
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          name="agreeTerms"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        <label htmlFor="agreeTerms">
          <FormattedMessage id="agreeTerms" />
        </label>
      </div>

      <button
        className="btn btn-primary w-full mt-7 md:w-fit md:px-8"
        type="submit"
      >
        <FormattedMessage id="checkout" />
      </button>
    </form>
  );
}
