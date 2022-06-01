import { ShoppingCartOutline } from 'components/icons';

type Props = {
  showCircle?: boolean;
};

export default function ShoppingCartIcon({ showCircle }: Props) {
  return (
    <span className="relative">
      {!!showCircle && <span className="notification-circle"></span>}
      <ShoppingCartOutline />
    </span>
  );
}
