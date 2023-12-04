export default function Year({ year, years, setYear }) {
  function handleYearSub() {
    const currentYear = +year;

    if (currentYear > 1993) {
      setYear(currentYear - 1);
    }
  }

  function handleYearAdd() {
    const currentYear = +year;

    if (currentYear < 2053) {
      setYear(currentYear + 1);
    }
  }

  return (
    <div>
      <div className="calendar-section">
        <button onClick={handleYearSub} disabled={year === 1973}>
          &lt;
        </button>
        <div>{year}</div>
        <button onClick={handleYearAdd} disabled={year === 2053}>
          &gt;
        </button>
      </div>
      <div id="date-container"></div>
    </div>
  );
}
