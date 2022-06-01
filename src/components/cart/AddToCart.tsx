import { Price } from 'components';
import { useMemo, useState } from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { ShoppingCartOutline } from 'components/icons';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { addToCart } from './cartSlice';
import QuantityChooser from './QuantityChooser';

import './styles.css';

type Props = {
  workshopId: number;
  price: number;
};

export default function AddToCart({ workshopId, price }: Props) {
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(({ home }) => home);

  const subtotal = useMemo(
    () => numberOfTickets * price,
    [numberOfTickets, price],
  );

  function addWorkshopToCart() {
    const workshop = data.find((w) => w.id === workshopId);
    if (workshop == null) return;
    dispatch(addToCart({ workshop, total: numberOfTickets }));
  }

  return (
    <div className="card add-to-cart items-center justify-around md:items-start md:justify-start">
      <h2 className="text-h5 font-bold text-darker-gray capitalize mb-5 hidden md:block">
        <FormattedMessage id="buyTicketCallout" />
      </h2>

      <div className="md:mb-5">
        <Price value={price} />
      </div>

      <div className="flex flex-row gap-x-3 self-stretch">
        <QuantityChooser
          quantity={numberOfTickets}
          onChange={setNumberOfTickets}
        />

        <button
          className="btn btn-primary flex-1"
          type="button"
          onClick={addWorkshopToCart}
        >
          <span className="hidden md:inline-block">
            <FormattedMessage id="addToCart" />
          </span>
          <span className="inline-flex md:hidden items-center">
            <FormattedMessage id="addToCartAbbr" />
            <ShoppingCartOutline />
          </span>
        </button>
      </div>

      <p className="hidden md:flex self-end gap-x-1 text-h6 font-semibold text-light-gray mt-[10px]">
        <span>
          <FormattedMessage id="subtotal" />
        </span>
        <span>
          <FormattedNumber value={subtotal} style="currency" currency="EUR" />
        </span>
      </p>
    </div>
  );
}
