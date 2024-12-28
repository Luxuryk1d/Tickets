import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { Currency, StopsFilter } from "./types/FilterTypes";
import ticketsData from "./data/tickets.json";
import { Ticket } from "./types/TicketsInterface";
import CurrencyConverter from "./components/CurrencyConverter";
import StopsFilterComponent from "./components/StopsFilter";
import TicketsList from "./components/TicketsList";

const App: React.FC = () => {
  const filterTicketsByStops = (
    tickets: typeof ticketsData.tickets,
    stopsFilter: StopsFilter
  ) => {
    if (stopsFilter.all) {
      return tickets;
    }

    const activeStops = Object.keys(stopsFilter)
      .filter((key) => stopsFilter[key as keyof StopsFilter] && key !== "all")
      .map((key) => {
        switch (key) {
          case "noStops":
            return 0;
          case "oneStop":
            return 1;
          case "twoStops":
            return 2;
          case "threeStops":
            return 3;
          default:
            return -1;
        }
      }) as number[];

    return tickets.filter((ticket) => activeStops.includes(ticket.stops));
  };

  const [tickets, setTickets] = useState<Ticket[]>([]);
  useEffect(() => {
    const sortedTickets = ticketsData.tickets.sort((a, b) => a.price - b.price);
    setTickets(sortedTickets);
  }, []);

  const [activeCurrency, setActiveCurrency] = useState<Currency>("rub");

  const [selectedStops, setSelectedStops] = useState<StopsFilter>({
    all: true,
    noStops: false,
    oneStop: false,
    twoStops: false,
    threeStops: false,
  });

  const filteredTickets = filterTicketsByStops(tickets, selectedStops);
  return (
    <>
    <div className="planeLogo">
      <img src="/planeLogo.png" alt="planeLogo" />
    </div>
      <div className="container">
        <div className="filter">
          <CurrencyConverter
            activeCurrency={activeCurrency}
            handleTabClick={setActiveCurrency}
          />
          <StopsFilterComponent
            selectedStops={selectedStops}
            setSelectedStops={setSelectedStops}
          />
        </div>
        <div className="tickets">
          <TicketsList
            tickets={filteredTickets}
            activeCurrency={activeCurrency}
          />
        </div>
      </div>
    </>
  );
};

export default App;
