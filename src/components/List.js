import React from "react";
import "./List.css";

const List = ({ list }) => {
  return (
    <div>
      {list?.map((item) => {
        return (
          <div>
            <div className="name-price">
              <span>{item[0].split("::")[0]}</span>
              <span>{item[1]}</span>
            </div>
            <div className="exchange-change">
              <span>{item[0].split("::")[1]}</span>
              <span>
                {Math.round(((item[1] - item[2]) / item[2]) * 100) / 100}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
