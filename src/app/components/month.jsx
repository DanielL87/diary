import { useState } from "react";

export default function Month({ month, setMonth, year }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function handleMonthSub() {
    const currentMonth = +month;

    if (currentMonth > 1) {
      setMonth(currentMonth - 1);
    }
  }

  function handleMonthAdd() {
    const currentMonth = +month;

    if (currentMonth < 12) {
      setMonth(currentMonth + 1);
    }
  }

  return (
    <div className="calendar-section">
      <button onClick={handleMonthSub} disabled={month === 1}>
        &lt;
      </button>
      <div>{monthNames[+month - 1]}</div>
      <button onClick={handleMonthAdd} disabled={month === 12}>
        &gt;
      </button>
    </div>
  );
}
