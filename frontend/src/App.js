import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [name, setName] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/search-filter', {
        dateRange: { startDate, endDate },
        name,
        amountRange: { min: minAmount, max: maxAmount }
      });

      setFilteredData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="center">
        <h1>Data Filter App</h1>

        <div className="filter-options">
          <div className="date-filter">
            <label>Date Range:</label>
            <div>
              <div>
                <label>Start Date:</label>
                <DatePicker selected={startDate} placeholderText="Start Date" onChange={(date) => setStartDate(date)} />
              </div>

              <div>
                <label>End Date:</label>
                <DatePicker selected={endDate} placeholderText="End Date" onChange={(date) => setEndDate(date)} />
              </div>
            </div>
          </div>

          <div className="name-filter">
            <label>Name:</label>
            <input type="text" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="amount-filter">
            <label>Amount Range:</label>
            <div>
              <input type="number" placeholder="Min" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} />
              <input type="number" placeholder="Max" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
            </div>
          </div>

          <button onClick={handleFilter} className="filter-button">
            Filter
          </button>
        </div>
      </div>

      <div className="filtered-data">
        <h2>Filtered Data:</h2>
        <ul className="filtered-list">
          {filteredData.map((item, index) => (
            <li key={index}>{`${item.date} - ${item.name} - ${item.amount}`}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
