"use client";

import { useState } from "react";

import uuid from "react-uuid";

export default function Home() {
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

  const dayArray = [];

  for (let i = 1; i <= 31; i++) {
    dayArray.push(i);
  }

  const validator = require("is-my-date-valid");
  const validate = validator({ format: "YYYY-M-D" });

  const today = new Date();

  const initialDate = today.toLocaleDateString().slice(0, 10);

  const yearsArray = [];

  for (let yearNumber = 1993; yearNumber < 2053; yearNumber++) {
    for (let month = 0; month < 12; month++) {
      for (let day = 0; day < 31; day++) {
        const dateString = `${yearNumber}-${month + 1}-${day + 1}`;

        if (validate(dateString)) {
          let dayData = {
            year: yearNumber,
            month: month + 1,
            day: day + 1,
            message: "",
          };
          yearsArray.push(dayData);
        }
      }
    }
  }

  const [years, setYears] = useState(yearsArray);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [year, setYear] = useState(new Date(selectedDate).getFullYear());
  const [month, setMonth] = useState(new Date(selectedDate).getMonth() + 1);
  const [day, setDay] = useState(new Date(selectedDate).getDate());
  const [daysArray, setDaysArray] = useState(getDaysInMonth(year, month));
  const [selectedMessage, setSelectedMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedMessage, setEditedMessage] = useState("");

  function handleMonthSub() {
    const currentMonth = +month;

    if (currentMonth > 1) {
      handleDateChange(year, currentMonth - 1);
    }
  }

  function handleMonthAdd() {
    const currentMonth = +month;

    if (currentMonth < 12) {
      handleDateChange(year, currentMonth + 1);
    }
  }

  function handleYearSub() {
    const currentYear = +year;

    if (currentYear > 1993) {
      handleDateChange(currentYear - 1, month);
    }
  }

  function handleYearAdd() {
    const currentYear = +year;

    if (currentYear < 2053) {
      handleDateChange(currentYear + 1, month);
    }
  }

  function getDaysInMonth(year, month) {
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: lastDayOfMonth }, (_, index) => index + 1);
  }

  function handleDateChange(newYear, newMonth) {
    setYear(newYear);
    setMonth(newMonth);
    setDay(1);
    const validDaysArray = getDaysInMonth(newYear, newMonth);
    setDaysArray(validDaysArray);
  }

  function handleDayClick(clickedDay) {
    const clickedDateObject = years.find(
      (dayData) =>
        dayData.year === year &&
        dayData.month === month &&
        dayData.day === clickedDay
    );

    setSelectedDate(
      `${clickedDateObject.year}-${clickedDateObject.month}-${clickedDateObject.day}`
    );
    setYear(clickedDateObject.year);
    setMonth(clickedDateObject.month);
    setDay(clickedDateObject.day);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const selectedDateObject = years.find(
      (dayData) =>
        dayData.year === year && dayData.month === month && dayData.day === day
    );

    const updatedYearsArray = years.map((dayData) =>
      dayData === selectedDateObject
        ? { ...dayData, message: selectedMessage }
        : dayData
    );

    setYears(updatedYearsArray);
    setSelectedMessage("");
    // setEditMode(false);
    // setEditedMessage("");
  }

  function isSelectedDate(selectedYear, selectedMonth, selectedDay) {
    return (
      selectedYear === year && selectedMonth === month && selectedDay === day
    );
  }

  function getMessageForSelectedDate() {
    const selectedDateObject = years.find(
      (dayData) =>
        dayData.year === year && dayData.month === month && dayData.day === day
    );

    return selectedDateObject ? selectedDateObject.message : "";
  }

  const messageForSelectedDate = getMessageForSelectedDate();

  function handleEdit() {
    setEditMode(true);
    setEditedMessage(messageForSelectedDate);
  }

  function handleEditSubmit() {
    const selectedDateObject = years.find(
      (dayData) =>
        dayData.year === year && dayData.month === month && dayData.day === day
    );

    const updatedYearsArray = years.map((dayData) =>
      dayData === selectedDateObject
        ? { ...dayData, message: editedMessage }
        : dayData
    );

    setYears(updatedYearsArray);
    setEditMode(false);
    setEditedMessage("");
  }

  function handleCancelEdit() {
    setEditMode(false);
    setEditedMessage("");
  }

  function handleDelete() {
    const selectedDateObject = years.find(
      (dayData) =>
        dayData.year === year && dayData.month === month && dayData.day === day
    );

    const updatedYearsArray = years.map((dayData) =>
      dayData === selectedDateObject ? { ...dayData, message: "" } : dayData
    );

    setYears(updatedYearsArray);
  }

  return (
    <main>
      <h1>Diary</h1>
      <div className="calendar-section">
        <button onClick={handleMonthSub} disabled={month === 1}>
          &lt;
        </button>
        <div>{monthNames[+month - 1]}</div>
        <button onClick={handleMonthAdd} disabled={month === 12}>
          &gt;
        </button>
      </div>
      <div className="calendar-section">
        <button onClick={handleYearSub} disabled={year === 1973}>
          &lt;
        </button>
        <div>{year}</div>
        <button onClick={handleYearAdd} disabled={year === 2053}>
          &gt;
        </button>
      </div>
      <div id="date-container">
        {daysArray.map((day) => {
          const isSelected = isSelectedDate(year, month, day);
          const clickedDateObject = years.find(
            (dayData) =>
              dayData.year === year &&
              dayData.month === month &&
              dayData.day === day
          );

          return (
            <div
              onClick={() => handleDayClick(day)}
              className={`day-box ${isSelected ? "selected-date" : ""}`}
              key={uuid()}
            >
              {day}
              {clickedDateObject && clickedDateObject.message && (
                <div className="entry-emoji">🧾</div>
              )}
            </div>
          );
        })}
      </div>

      {messageForSelectedDate ? (
        <div>
          <h3>
            Entry for {month}-{day}-{year}:
          </h3>
          {editMode ? (
            <div id="edit-container">
              <textarea
                placeholder="Edit Entry"
                name="editedMessage"
                id="editedMessage"
                cols="30"
                rows="10"
                value={editedMessage}
                onChange={(e) => setEditedMessage(e.target.value)}
              ></textarea>
              <div id="edit-buttons">
                {" "}
                <button onClick={handleEditSubmit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            </div>
          ) : (
            <div id="message-container">
              <div>{messageForSelectedDate}</div>
              <div>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} type="submit">
          <textarea
            placeholder="New Entry"
            name="message"
            id="message"
            cols="30"
            rows="10"
            value={selectedMessage}
            onChange={(e) => setSelectedMessage(e.target.value)}
          ></textarea>
          <button>Submit</button>
        </form>
      )}
    </main>
  );
}
