import React from "react";
import { Ticket } from "../types/TicketsInterface";
import { Currency } from "../types/FilterTypes";
import "../styles/TicketsList.css";

interface TicketsListProps {
  tickets: Ticket[];
  activeCurrency: Currency;
}

const TicketsList: React.FC<TicketsListProps> = ({
  tickets,
  activeCurrency,
}) => {
  const currencyRates = {
    rub: 1,
    usd: 0.0095,
    eur: 0.0091,
  };

  const convertCurrency = (
    price: number,
    currency: keyof typeof currencyRates
  ) => {
    const convertedPrice = price * currencyRates[currency];
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      currency,
    }).format(convertedPrice);
  };

  const currencySymbols: { [key: string]: string } = {
    rub: "₽",
    usd: "$",
    eur: "€",
  };

  const getStopsLabel = (stops: number): string => {
    if (stops === 0) return "без пересадок";
    if (stops === 1) return "1 пересадка";
    if (stops >= 2 && stops <= 4) return `${stops} пересадки`;
    return `${stops} пересадок`;
  };

  return (
    <>
      {tickets.map((ticket, index) => (
        <div className="ticket" key={index}>
          <div className="price-block">
            <img src="/airlinesLogo.png" className="logo" alt="logo" />
            <button className="ticket-btn">
              <div>Купить</div>
              <div>
                за {convertCurrency(ticket.price, activeCurrency)}{" "}
                {currencySymbols[activeCurrency]}
              </div>
            </button>
          </div>
          <div className="info-block">
            <div className="time-block">
              <div className="time">{ticket.departure_time}</div>
              <div className="ticket-stops">
                <span>{getStopsLabel(ticket.stops)}</span>
                <div className="path">
                  <div className="line" />
                  <img
                    src="/airplane.png"
                    className="airplane-img"
                    alt="airplane"
                  />
                </div>
              </div>
              <div className="time">{ticket.arrival_time}</div>
            </div>
            <div className="block">
              <div className="departure-date">
                <div className="date-info">
                  {ticket.origin},{ticket.origin_name}
                </div>
                <div className="date">
                  {ticket.departure_date}, {ticket.carrier}
                </div>
              </div>
              <div className="arrival_date">
                <div className="date-info">
                  {ticket.destination_name},{ticket.destination}
                </div>
                <div className="date">
                  {ticket.arrival_date}, {ticket.carrier}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TicketsList;
