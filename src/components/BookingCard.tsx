import './BookingCard.css'

type BookingCardProps = {
  title?: string
  description?: string
  duration?: string
  bikeType?: string
  price?: string
  nextSlot?: string
  onBook?: () => void
}

export function BookingCard({
  title = 'Flat tyre repair',
  description = 'Tube or tyre swap, any wheel size.',
  duration = '30 min',
  bikeType = 'All bikes',
  price = '€15',
  nextSlot = 'Next free slot: today at 16:30',
  onBook,
}: BookingCardProps) {
  return (
    <article className="booking-card" data-node-id="4:6">
      <header className="booking-card__header">
        <h1 className="booking-card__title" data-node-id="4:7">
          {title}
        </h1>
        <p className="booking-card__description" data-node-id="4:8">
          {description}
        </p>
      </header>

      <div className="booking-card__meta" data-node-id="4:9">
        <div className="booking-card__tags" aria-label="Repair details">
          <span className="booking-card__tag" data-node-id="4:10">
            {duration}
          </span>
          <span className="booking-card__tag" data-node-id="4:12">
            {bikeType}
          </span>
        </div>
        <strong className="booking-card__price" data-node-id="4:13">
          {price}
        </strong>
      </div>

      <p className="booking-card__slot" data-node-id="4:14">
        {nextSlot}
      </p>

      <button
        className="booking-card__action"
        data-node-id="4:15"
        type="button"
        onClick={onBook}
      >
        <span data-node-id="4:16">Book this repair</span>
      </button>
    </article>
  )
}
