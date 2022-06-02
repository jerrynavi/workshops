import { Transition, Dialog } from '@headlessui/react';
import { CloseIcon } from 'components/icons';
import { Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import CheckoutForm from './CheckoutForm';
import { toggleCheckoutOpen } from './checkoutSlice';

export default function Checkout() {
  const { isOpen } = useAppSelector(({ checkout }) => checkout);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [saveSuccess, setSaveSuccess] = useState(false);

  const closeCheckout = () => {
    dispatch(toggleCheckoutOpen(false));
    setSaveSuccess(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={isOpen}
        onClose={closeCheckout}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-darker-gray bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-10 lg:px-20 lg:py-[92px] text-left align-middle shadow-lg transition-all">
                <header className="flex items-start justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-h2-mobile md:text-h2 font-bold text-black"
                  >
                    <FormattedMessage
                      id={saveSuccess ? 'thankYou' : 'checkout'}
                    />
                    <span className="block text-h6-mobile md:text-h6 font-semibold text-light-gray max-w-xs">
                      <FormattedMessage
                        id={saveSuccess ? 'thankYouSubtext' : 'checkoutSubtext'}
                      />
                    </span>
                  </Dialog.Title>
                  {!saveSuccess && (
                    <button
                      className="btn btn-transparent shadow-none border-none"
                      type="button"
                      onClick={closeCheckout}
                    >
                      <CloseIcon />
                    </button>
                  )}
                </header>
                <div className="mt-10">
                  {!saveSuccess ? (
                    <CheckoutForm onSuccess={() => setSaveSuccess(true)} />
                  ) : (
                    <button
                      className="btn btn-primary w-full mt-7 md:w-fit md:px-8"
                      type="button"
                      onClick={() => {
                        closeCheckout();
                        navigate('/');
                      }}
                    >
                      <FormattedMessage id="backToShop" />
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
