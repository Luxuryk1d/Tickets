import React from "react";
import { Currency } from "../types/FilterTypes";
import "../styles/CurrencyConverter.css";

interface CurrencyConverterProps {
  activeCurrency: Currency;
  handleTabClick: (currency: Currency) => void;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  activeCurrency,
  handleTabClick,
}) => {
  return (
    <div className="currency-block">
      <p className="filter-heading">валюта</p>
      <div className="tabs">
        <button
          className={`tab tab-left ${activeCurrency === "rub" ? "active" : ""}`}
          onClick={() => handleTabClick("rub")}
        >
          rub
        </button>
        <button
          className={`tab ${activeCurrency === "usd" ? "active" : ""}`}
          onClick={() => handleTabClick("usd")}
        >
          usd
        </button>
        <button
          className={`tab tab-right ${
            activeCurrency === "eur" ? "active" : ""
          }`}
          onClick={() => handleTabClick("eur")}
        >
          eur
        </button>
      </div>
    </div>
  );
};

export default CurrencyConverter;
