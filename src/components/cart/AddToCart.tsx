import { Price } from 'components';
import { Fragment, useMemo, useState } from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, ShoppingCartOutline } from 'components/icons';

import './styles.css';

type Props = {
  workshopId: number;
  price: number;
};

const MAX_NUMBER_OF_ALLOWED_TICKETS = 10;

export default function AddToCart({ workshopId, price }: Props) {
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  const subtotal = useMemo(
    () => numberOfTickets * price,
    [numberOfTickets, price],
  );

  const options = useMemo(
    () =>
      new Array(MAX_NUMBER_OF_ALLOWED_TICKETS)
        .fill(1)
        .map((i, index) => index + 1),
    [],
  );

  return (
    <div className="card add-to-cart items-center justify-around md:items-start md:justify-start">
      <h2 className="text-h5 font-bold text-darker-gray capitalize mb-5 hidden md:block">
        <FormattedMessage id="buyTicketCallout" />
      </h2>

      <Price value={price} />

      <div className="flex flex-row gap-x-3 self-stretch">
        <Listbox value={numberOfTickets} onChange={setNumberOfTickets}>
          <Listbox.Button>
            <span className="ml-3 inline-block text-dark">
              {numberOfTickets}
            </span>
            <ChevronDownIcon />
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options>
              {options.map((value) => (
                <Listbox.Option
                  key={value}
                  className={({ active }) =>
                    `${
                      active ? 'bg-lighter-gray text-blue' : 'text-darker-gray'
                    }`
                  }
                  value={value}
                >
                  {({ selected }) => (
                    <div className="flex items-center">
                      <span
                        className={`block truncate capitalize text-h5-mobile ${
                          selected ? 'font-bold' : 'font-medium'
                        }`}
                      >
                        {value}
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>

        <button className="btn btn-primary flex-1" type="button">
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
