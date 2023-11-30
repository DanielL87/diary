"use client";

import { useState } from "react";
import Month from "./components/month.jsx";
import Year from "./components/year.jsx";

export default function Home() {
  const validator = require("is-my-date-valid");
  const validate = validator({ format: "YYYY-MM-DD" });

  const initialDate = new Date().toISOString().slice(0, 10);
  const test = new Date().getDate();
  console.log(test);

  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [year, setYear] = useState(selectedDate.slice(0, 4));
  const [month, setMonth] = useState(selectedDate.slice(5, 7));
  const [day, setDay] = useState(selectedDate.slice(8, 10));

  return (
    <main>
      <h1>Diary</h1>
      <Month month={month} setMonth={setMonth} />
      <Year year={year} setYear={setYear} />
    </main>
  );
}
