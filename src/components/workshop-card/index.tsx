import { CalendarIcon, ClockIcon, ShoppingCartOutline } from 'components/icons';
import { Workshop } from 'models';
import {
  FormattedDateParts,
  FormattedMessage,
  FormattedNumber,
  FormattedTime,
} from 'react-intl';

export default function WorkshopCard({
  title,
  date,
  imageUrl,
  price,
}: Workshop) {
  return (
    <article className="card">
      <figure className="card-image">
        <img src={imageUrl} alt={title} />
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
                        <>
                          <span key={index}>{part.value}</span>
                          <span>.</span>
                        </>
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

        <h2 className="card-title">{title}</h2>

        <div className="card-footer">
          <p className="price-display mb-5">
            <FormattedNumber
              value={price}
              style="decimal"
              minimumFractionDigits={2}
            />
            <span className="currency">&nbsp;EUR</span>
          </p>

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
