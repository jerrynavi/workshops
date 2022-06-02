import { LoadingCircleIcon } from 'components/icons';

type Props = {
  text: string | JSX.Element;
};

export default function Loading({ text }: Props) {
  return (
    <div className="relative text-center">
      <LoadingCircleIcon />
      <p className="font-bold text-h5-mobile md:text-h5 mt-4 md:mt-6 text-dark">
        {text}
      </p>
    </div>
  );
}
