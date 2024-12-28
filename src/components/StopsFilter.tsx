import React from "react";
import { StopsFilter } from "../types/FilterTypes";
import "../styles/StopsFilter.css";

interface StopsFilterProps {
  selectedStops: StopsFilter;
  setSelectedStops: React.Dispatch<React.SetStateAction<StopsFilter>>;
}

const StopsFilterComponent: React.FC<StopsFilterProps> = ({
  selectedStops,
  setSelectedStops,
}) => {
  const handleAllClick = () => {
    setSelectedStops({
      all: true,
      noStops: false,
      oneStop: false,
      twoStops: false,
      threeStops: false,
    });
  };

  const handleCheckboxClick = (key: keyof StopsFilter) => {
    setSelectedStops((prevState) => {
      const newState = { ...prevState, [key]: !prevState[key] };
      if (
        !newState.noStops &&
        !newState.oneStop &&
        !newState.twoStops &&
        !newState.threeStops
      ) {
        newState.all = true;
      } else {
        newState.all = false;
      }

      return newState;
    });
  };

  const handleOnlyClick = (key: keyof StopsFilter) => {
    setSelectedStops({
      all: false,
      noStops: key === "noStops",
      oneStop: key === "oneStop",
      twoStops: key === "twoStops",
      threeStops: key === "threeStops",
    });
  };

  return (
    <div className="stops-block">
      <p className="filter-heading" style={{ padding: "0 15px" }}>
        количество пересадок
      </p>
      <div className="checkboxes">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={selectedStops.all}
            onChange={handleAllClick}
          />
          Все
        </label>
        {Object.keys(selectedStops).map((key) =>
          key !== "all" ? (
            <label className="checkbox-label" key={key}>
              <input
                type="checkbox"
                checked={selectedStops[key as keyof StopsFilter]}
                onChange={() => handleCheckboxClick(key as keyof StopsFilter)}
              />
              {key === "noStops"
                ? "Без пересадок"
                : `${
                    key === "oneStop" ? "1" : key === "twoStops" ? "2" : "3"
                  } пересадк${key === "oneStop" ? "а" : "и"}`}
              <span
                className="only-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleOnlyClick(key as keyof StopsFilter);
                }}
              >
                только
              </span>
            </label>
          ) : null
        )}
      </div>
    </div>
  );
};

export default StopsFilterComponent;
