import { FormattedMessage } from 'react-intl';
import { useAppDispatch, useCart } from 'store/hooks';
import { toggleSidebarOpen } from './cartSlice';
import ShoppingCartIcon from './ShoppingCartIcon';

export default function Cart() {
  const { items } = useCart();
  const dispatch = useAppDispatch();

  function openCart() {
    dispatch(toggleSidebarOpen(true));
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={openCart}>
      <ShoppingCartIcon showCircle={items.length > 0} />
      {items.length > 0 && (
        <p className="ml-3 md:hidden text-black font-bold">{items.length}</p>
      )}
      <p className="ml-3 text-black font-bold hidden md:block">
        {items.length > 0 ? (
          <>
            <FormattedMessage
              id="items"
              values={{ count: items.length, inCart: false }}
            />
            <span>&nbsp;</span>
            <FormattedMessage id="inCart" />
          </>
        ) : (
          <FormattedMessage id="cartEmpty" />
        )}
      </p>
    </div>
  );
}
