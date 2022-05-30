import {
  BrushIcon,
  ChevronDownIcon,
  CodeIcon,
  FlashIcon,
  LayoutIcon,
} from 'components/icons';
import { useGetCategoriesQuery } from 'core';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CategoryType } from 'models';
import { FormattedMessage } from 'react-intl';
import { Listbox, Transition } from '@headlessui/react';
import './styles.css';
import { Fragment, useEffect } from 'react';

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
  const { data: categories, isFetching } = useGetCategoriesQuery();
  const { search } = useLocation();
  const navigate = useNavigate();

  const activeCategory = new URLSearchParams(search).get('category');

  const changeCategory = (newCategory: string) => {
    if (newCategory === '') return;
    navigate('/?category=' + newCategory);
  };

  useEffect(() => {
    function updateUrlIfSearchIsEmpty() {
      navigate('/?category=all');
    }
    if (activeCategory == null) {
      updateUrlIfSearchIsEmpty();
    }
  }, [activeCategory, navigate]);

  return (
    <div>
      <h6 className="text-light-gray font-bold text-h6 hidden md:block md:ml-[58px] md:mb-[30px] mt-28">
        <FormattedMessage id="filterHeader" />
      </h6>

      <nav className="category-filter">
        <ul>
          <li className={`pl-[58px] ${activeCategory === 'all' && 'active'}`}>
            <Link to="?category=all">All</Link>
          </li>
          {categories?.map((category) => (
            <li
              key={category}
              className={`pl-6 flex flex-row gap-x-[10px] items-center ${
                activeCategory === category && 'active'
              }`}
            >
              <span className="w-6 inline-block">
                {getCategoryIcon(category)}
              </span>
              <Link to={`?category=${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="md:hidden category-filter-mobile">
        <Listbox value={activeCategory} onChange={changeCategory}>
          <Listbox.Button>
            <ChevronDownIcon />
            <span className="ml-3 inline-block">{activeCategory}</span>
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
              {categories?.concat('all').map((category) => (
                <Listbox.Option
                  key={category}
                  className={({ active }) =>
                    `${
                      active ? 'bg-lighter-gray text-blue' : 'text-darker-gray'
                    }`
                  }
                  value={category}
                  disabled={isFetching}
                >
                  {({ selected }) => (
                    <div className="flex items-center">
                      <span className="w-4 mr-6 inline-block">
                        {getCategoryIcon(category)}
                      </span>
                      <span
                        className={`block truncate capitalize text-h5-mobile ${
                          selected ? 'font-bold' : 'font-medium'
                        }`}
                      >
                        {category}
                      </span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    </div>
  );
}
