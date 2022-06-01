import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from 'components/icons';
import { Fragment } from 'react';

type Props = {
  quantity: number;
  onChange: (value: number) => void;
};

const MAX_NUMBER_OF_ALLOWED_TICKETS = 10;

const options = new Array(MAX_NUMBER_OF_ALLOWED_TICKETS)
  .fill(1)
  .map((i, index) => index + 1);

export default function QuantityChooser({ quantity, onChange }: Props) {
  return (
    <div className="quantity-chooser">
      <Listbox value={quantity} onChange={onChange}>
        <Listbox.Button>
          <span className="ml-3 inline-block text-dark">{quantity}</span>
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
                  `${active ? 'bg-lighter-gray text-blue' : 'text-darker-gray'}`
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
    </div>
  );
}
