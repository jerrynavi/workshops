import { BrushIcon, CodeIcon, FlashIcon, LayoutIcon } from 'components/icons';
import { useGetCategoriesQuery } from 'core';
import { CategoryType } from 'models';
import { FormattedMessage } from 'react-intl';
import './styles.css';

function getCategoryIcon(name: CategoryType) {
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

export default function CategoryFilter() {
  const { data } = useGetCategoriesQuery();

  return (
    <div>
      <h6 className="text-light-gray font-bold text-h6 hidden md:block md:ml-[58px] md:mb-[30px]">
        <FormattedMessage id="filterHeader" />
      </h6>

      <nav className="category-filter">
        <ul>
          <li className="pl-[58px]">
            <a href="?category=all">All</a>
          </li>
          {data?.map((category) => (
            <li
              key={category}
              className="pl-6 flex flex-row gap-x-[10px] items-center"
            >
              <span className="w-6 inline-block">
                {getCategoryIcon(category)}
              </span>
              <a href={`?category=${category}`}>{category}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
