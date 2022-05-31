import { FormattedNumber } from 'react-intl';

export default function Price({ value }: { value: number }) {
  return (
    <p className="price-display md:mb-5">
      <FormattedNumber
        value={value}
        style="decimal"
        minimumFractionDigits={2}
      />
      <span className="currency">&nbsp;EUR</span>
    </p>
  );
}
