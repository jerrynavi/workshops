import { ShoppingCartOutline } from 'components/icons';
import { FormattedMessage } from 'react-intl';
import { useCart } from 'store/hooks';

export default function Cart() {
  const { items } = useCart();

  return (
    <div className="flex items-center">
      <div className="relative">
        {items.length > 0 && <span className="notification-circle"></span>}
        <ShoppingCartOutline />
      </div>
      <p className="ml-3 text-black font-bold hidden md:block">
        {items.length > 0 ? (
          <FormattedMessage id="itemsInCart" values={{ count: items.length }} />
        ) : (
          <FormattedMessage id="cartEmpty" />
        )}
      </p>
    </div>
  );
}
