import { toggleSidebarOpen } from 'components/cart/cartSlice';
import { useAppDispatch, useCart } from 'store/hooks';
import { Transition, Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { CloseIcon } from 'components/icons';
import CartItem from 'components/cart/CartItem';
import { FormattedMessage } from 'react-intl';
import Price from 'components/Price';
import ShoppingCartIcon from 'components/cart/ShoppingCartIcon';

export default function CartSidebar() {
  const { open, items, subtotal } = useCart();
  const dispatch = useAppDispatch();

  function closeModal() {
    dispatch(toggleSidebarOpen(false));
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="relative flex justify-end items-end md:items-start max-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-1/2 md:translate-y-0 md:translate-x-1/2"
              enterTo="opacity-100 translate-y-0 md:translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:translate-x-0"
              leaveTo="opacity-0 translate-y-1/2 md:translate-y-0 md:translate-x-1/2"
            >
              <Dialog.Panel className="w-full min-h-screen h-full relative md:max-w-sm bg-white shadow-cart pb-6">
                <header className="flex items-center justify-between pl-10 pr-12 py-[18px] md:pt-[29px]">
                  <Dialog.Title
                    as="h3"
                    className="text-h5-mobile md:text-h5 font-bold text-dark"
                  >
                    <ShoppingCartIcon />
                    <span className="inline-block ml-3">
                      {items.length} Workshop{items.length !== 1 && 's'}
                    </span>
                  </Dialog.Title>
                  <button
                    className="btn btn-transparent shadow-none border-none"
                    type="button"
                    onClick={closeModal}
                  >
                    <CloseIcon />
                  </button>
                </header>
                <div className="mt-5 md:mt-[46px] px-5">
                  {items.map((item) => (
                    <div key={item.workshop.id} className="mb-5">
                      <CartItem {...item} />
                    </div>
                  ))}
                </div>

                {items.length > 0 && (
                  <div className="mt-5 px-10">
                    <p className="text-h6-mobile md:text-h6 font-bold text-light-gray uppercase">
                      <FormattedMessage id="subtotal" />
                    </p>

                    <Price value={subtotal} />

                    <button className="btn bg-blue text-white w-full mt-5">
                      Checkout
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
