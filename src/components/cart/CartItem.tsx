import { TrashIcon } from 'components/icons';
import Price from 'components/Price';
import { useAppDispatch } from 'store/hooks';
import { CartItemType, removeFromCart, updateCart } from './cartSlice';
import QuantityChooser from './QuantityChooser';

export default function CartItem({ workshop, total }: CartItemType) {
  const dispatch = useAppDispatch();

  const { id, imageUrl, title, price } = workshop;

  function deleteItemFromCart() {
    dispatch(removeFromCart({ id }));
  }

  function updateItemInCart(quantity: number) {
    dispatch(
      updateCart({
        id,
        data: {
          workshop,
          total: quantity,
        },
      }),
    );
  }

  return (
    <div className="rounded-md overflow-hidden bg-lighter-gray flex flex-row">
      <figure className="w-3/12">
        <img
          className="h-full w-full object-cover"
          src={imageUrl}
          alt={title}
        />
      </figure>
      <div className="p-5 flex flex-col w-9/12">
        <header className="flex flex-row items-start justify-between">
          <h2 className="text-h4-mobile md:text-h4 font-bold text-blue overflow-hidden line-clamp-2">
            {title}
          </h2>
          <button
            type="button"
            className="text-light-gray ml-3"
            onClick={deleteItemFromCart}
          >
            <TrashIcon />
          </button>
        </header>

        <div className="flex items-center mt-4 relative cart-item-chooser">
          <QuantityChooser quantity={total} onChange={updateItemInCart} />
          <div className="flex-1 ml-3">
            <Price value={price} />
          </div>
        </div>
      </div>
    </div>
  );
}
