import { CategoryFilter, WorkshopCard } from 'components';
import { useLazyGetWorkshopsQuery } from 'core';
import { CategoryType } from 'models';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'store';

const doNotUseIfCategory = ['', 'all'];

export default function Home() {
  const { search } = useLocation();
  const [trigger] = useLazyGetWorkshopsQuery();
  const [page, setPage] = useState(1);

  const { data: workshops, lastPage } = useAppSelector((s) => s.home);

  const activeCategory = new URLSearchParams(search).get('category');

  useEffect(() => {
    function fetchWorkshopsByCategory() {
      trigger({
        _page: page,
        ...(activeCategory &&
          !doNotUseIfCategory.includes(activeCategory) && {
            category: activeCategory as CategoryType,
          }),
      });
    }

    fetchWorkshopsByCategory();
  }, [activeCategory, page, trigger]);

  return (
    <div className="page">
      <aside className="w-full md:w-3/12">
        <CategoryFilter />
      </aside>
      <section className="w-full md:w-9/12">
        <header className="md:mt-[60px]">
          <h2 className="text-h2-mobile md:text-h2 font-bold text-darker-gray">
            Workshops
          </h2>
          <p className="text-h6-mobile md:text-h6 font-bold text-light-gray">
            Displayed:{' '}
            <span className="text-darker-gray">{workshops?.length ?? 0}</span>
          </p>
        </header>

        <div className="mt-[18px] md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-5 md:gap-10">
          {workshops?.map((workshop) => (
            <WorkshopCard key={workshop.id} {...workshop} />
          ))}
        </div>

        <div className="flex justify-center md:justify-end md:mr-52 xl:mr-60 mt-[30px] md:mt-10">
          <button
            className="btn load-more"
            type="button"
            disabled={lastPage === page || lastPage == null}
            onClick={() => setPage((p) => p + 1)}
          >
            Load More
          </button>
        </div>
      </section>
    </div>
  );
}
