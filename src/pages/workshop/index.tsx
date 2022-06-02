import { AddToCart, Skeleton, WorkshopCard } from 'components';
import { ArrowBackIcon, CalendarIcon, ClockIcon } from 'components/icons';
import {
  useLazyGetUserByIdQuery,
  useLazyGetWorkshopByIdQuery,
  useLazyGetWorkshopsQuery,
} from 'core';
import { useEffect } from 'react';
import {
  FormattedDateParts,
  FormattedMessage,
  FormattedTime,
  useIntl,
} from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryIcon } from 'utils';

import './styles.css';

export default function Workshop() {
  const navigate = useNavigate();
  const intl = useIntl();
  const { id } = useParams();
  const [
    workshopDetailTrigger,
    {
      data: workshop,
      isFetching: workshopFetching,
      isLoading: workshopLoading,
    },
  ] = useLazyGetWorkshopByIdQuery();
  const [
    userInfoTrigger,
    { data: user, isFetching: userFetching, isLoading: userLoading },
  ] = useLazyGetUserByIdQuery();
  const [relatedWorkshopsTrigger, { data: relatedWorkshops }] =
    useLazyGetWorkshopsQuery();

  const workshopBusy = workshopFetching || workshopLoading;
  const userBusy = userFetching || userLoading;

  const navigateBack = () => {
    navigate('../');
  };

  useEffect(() => {
    function fetchWorkshopDetail() {
      workshopDetailTrigger(Number(id), true);
    }

    if (id != null) {
      fetchWorkshopDetail();
    }
  }, [id, workshopDetailTrigger]);

  useEffect(() => {
    function fetchUserInfo() {
      userInfoTrigger(workshop?.userId as number, true);
    }

    if (workshop?.userId != null) {
      fetchUserInfo();
    }
  }, [userInfoTrigger, workshop?.userId]);

  useEffect(() => {
    function fetchRelatedWorkshops() {
      relatedWorkshopsTrigger({
        category: workshop?.category,
        _page: 1,
        _limit: 3,
      });
    }

    if (workshop?.category != null) {
      fetchRelatedWorkshops();
    }
  }, [relatedWorkshopsTrigger, workshop?.category]);

  return (
    <div className="page">
      <aside className="w-full pl-5 md:px-5 md:w-3/12">
        <div
          onClick={navigateBack}
          className="flex items-center w-fit mt-7 mb-6 md:mb-0 md:pl-5 md:mt-[71px] text-black font-bold gap-x-[10px] cursor-pointer"
          title={intl.formatMessage({ id: 'backButton' })}
          role="navigation"
        >
          <ArrowBackIcon />
          <FormattedMessage id="backButton" />
        </div>
      </aside>

      <section className="w-full px-5 md:w-9/12">
        {!!workshop && !workshopBusy && (
          <>
            <figure className="workshop-banner relative">
              <img src={workshop.imageUrl} alt={workshop.title} />
              <span className="category-icon md:hidden absolute right-3 -bottom-4 md:relative">
                {getCategoryIcon(workshop.category)}
              </span>
            </figure>

            <div className="flex flex-row flex-wrap pb-28 md:pb-0">
              <section className="w-full md:w-7/12">
                <header>
                  <h4 className="flex gap-x-3 md:gap-x-4 items-center justify-start mt-5 md:mt-10 mb-5 pl-4 md:pl-0">
                    <span className="hidden md:inline-flex category-icon relative">
                      {getCategoryIcon(workshop.category)}
                    </span>
                    <span className="m-0 mr-3 icon-w-label">
                      <CalendarIcon />
                      <span className="inline-block ml-2">
                        <FormattedDateParts
                          value={workshop.date}
                          year="numeric"
                          day="2-digit"
                          month="2-digit"
                        >
                          {(parts) => (
                            <>
                              {parts
                                .filter((p) =>
                                  new RegExp(/^[0-9]/).test(p.value),
                                )
                                .map((part, index) => (
                                  <span key={index}>
                                    <span>{part.value}</span>
                                    <span>.</span>
                                  </span>
                                ))}
                            </>
                          )}
                        </FormattedDateParts>
                      </span>
                    </span>
                    <span className="m-0 icon-w-label">
                      <ClockIcon />
                      <span className="inline-block ml-2">
                        <FormattedTime value={workshop.date} />
                      </span>
                    </span>
                  </h4>
                </header>

                <article className="pr-4 md:pb-20 md:pr-20">
                  <header className="mb-5 md:mb-10">
                    <h1 className="text-h1-mobile md:text-h1 text-blue font-bold mb-5">
                      {workshop.title}
                    </h1>
                    <h4 className="font-bold pl-4 md:pl-0">
                      <span className="text-base text-black uppercase">
                        <FormattedMessage id="withUser" />
                      </span>
                      <span className="text-darker-gray text-h4-mobile md:text-h4 inline-block ml-[10px]">
                        <Skeleton isLoaded={!userBusy}>
                          {user?.name ?? 'First Last'}
                        </Skeleton>
                      </span>
                    </h4>
                  </header>

                  <p className="text-base font-medium text-darker-gray pl-4 md:pl-0">
                    {workshop.desc}
                  </p>
                </article>
              </section>

              <aside className="fixed z-30 bottom-0 left-0 drop-shadow w-full md:relative md:z-auto md:drop-shadow-none md:w-5/12">
                <AddToCart price={workshop.price} workshopId={workshop.id} />
              </aside>
            </div>
          </>
        )}
      </section>

      {relatedWorkshops?.data && relatedWorkshops.data.length > 0 && (
        <section className="w-full flex bg-lighter-gray py-10 md:py-20 px-5 justify-end">
          <div className="w-full md:w-9/12">
            <h2 className="text-h2-mobile md:text-h2 text-center md:text-left font-bold text-darker-gray mb-5 md:mb-10">
              <FormattedMessage id="similarWorkshops" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-5 md:gap-10">
              {relatedWorkshops.data.map((workshop) => (
                <WorkshopCard key={workshop.id} {...workshop} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
