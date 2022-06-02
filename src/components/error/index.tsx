import { RefreshIcon } from '@heroicons/react/solid';
import { ErrorIcon } from 'components/icons';

type Props = {
  text: string;
  retryAction?: () => void;
};

export default function Error({ text, retryAction }: Props) {
  return (
    <div className="relative text-center">
      <span className="text-red">
        <ErrorIcon />
      </span>
      <p className="font-bold text-h5-mobile md:text-h5 mt-4 md:mt-6 text-dark">
        {text}
      </p>
      {retryAction != null && typeof retryAction === 'function' && (
        <button
          className="btn bg-blue w-fit text-white mt-5"
          onClick={() => retryAction()}
        >
          Retry
          <RefreshIcon className="h-4 w-4 ml-2" />
        </button>
      )}
    </div>
  );
}
