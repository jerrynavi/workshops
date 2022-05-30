import { CalendarIcon, ClockIcon, ShoppingCartOutline } from 'components/icons';
import Price from 'components/Price';
import { Workshop } from 'models';
import {
  FormattedDateParts,
  FormattedMessage,
  FormattedTime,
} from 'react-intl';
import { Link } from 'react-router-dom';
import { getCategoryIcon } from 'utils';

export default function WorkshopCard({
  title,
  date,
  imageUrl,
  price,
  id,
  category,
}: Workshop) {
  return (
    <article className="card">
      <figure className="card-image">
        <Link to={`/workshop/${id}`} title={`Link to ${title}`}>
          <img src={imageUrl} alt={title} />
        </Link>

        <div className="category-icon absolute -right-5 top-5 md:top-[unset] md:-bottom-5 md:right-5">
          {getCategoryIcon(category)}
        </div>
      </figure>

      <div className="card-content">
        <div className="flex flex-row items-center">
          <p className="m-0 mr-3 icon-w-label">
            <CalendarIcon />
            <span className="inline-block ml-2">
              <FormattedDateParts
                value={date}
                year="numeric"
                day="2-digit"
                month="2-digit"
              >
                {(parts) => (
                  <>
                    {parts
                      .filter((p) => new RegExp(/^[0-9]/).test(p.value))
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
          </p>
          <p className="m-0 icon-w-label">
            <ClockIcon />
            <span className="inline-block ml-2">
              <FormattedTime value={date} />
            </span>
          </p>
        </div>

        <h2 className="card-title" title={title}>
          <Link to={`/workshop/${id}`}>{title}</Link>
        </h2>

        <div className="card-footer">
          <Price value={price} />

          <button className="btn btn-primary block w-fit md:w-full">
            <span className="hidden md:inline">
              <FormattedMessage id="addToCart" />
            </span>
            <span className="inline md:hidden">
              <ShoppingCartOutline />
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
