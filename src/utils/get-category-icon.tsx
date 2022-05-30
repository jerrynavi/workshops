import { BrushIcon, CodeIcon, FlashIcon, LayoutIcon } from 'components/icons';
import { CategoryType } from 'models';

export default function getCategoryIcon(name: CategoryType) {
  let icon: JSX.Element = <></>;

  switch (name) {
    case 'marketing':
      icon = <FlashIcon />;
      break;
    case 'design':
      icon = <BrushIcon />;
      break;
    case 'frontend':
      icon = <LayoutIcon />;
      break;
    case 'backend':
      icon = <CodeIcon />;
      break;

    default:
      break;
  }
  return icon;
}
