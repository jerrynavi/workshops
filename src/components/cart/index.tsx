import { ShoppingCartOutline } from 'components/icons';
import { FormattedMessage } from 'react-intl';

export default function Cart() {
  return (
    <div className="flex items-center">
      <ShoppingCartOutline />
      <p className="ml-3 text-black font-bold hidden md:block">
        <FormattedMessage id="cartEmpty" />
      </p>
    </div>
  );
}
