import React, { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState({});
  const [selectedOption, setSelectedOption] = useState("Numbers");

  const handleSubmit = () => {
    try {
      const inputData = JSON.parse(document.querySelector("textarea").value);
      setData(inputData.data);
      setResponse({});
    } catch (error) {
      alert("Invalid JSON input. Please check your data format.");
    }
  };

  const handleSelectChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    let filteredData;

    if (option === "Numbers") {
      filteredData = data.filter(item => !isNaN(item)); // filter numbers
    } else if (option === "Alphabets") {
      filteredData = data.filter(item => isNaN(item)); // filter alphabets
    } else if (option === "Highest Lowercase Alphabet") {
      filteredData = data
        .filter(item => item === item.toLowerCase() && isNaN(item)) // filter lowercase alphabets
        .sort((a, b) => b.localeCompare(a))[0]; // get the highest alphabet
    }

    setResponse(filteredData ? filteredData : {});
  };

  return (
    <div className="App">
      <h1>BFHL Frontend</h1>

      <textarea
        defaultValue={`{ "data": ["A", "B", "3", "c", "d"] }`}
        rows="4"
        cols="50"
        style={{ width: "400px", height: "100px" }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>

      <h3>Select Data to Display</h3>
      <select onChange={handleSelectChange} value={selectedOption}>
        <option>Numbers</option>
        <option>Alphabets</option>
        <option>Highest Lowercase Alphabet</option>
      </select>

      <h3>Response Data:</h3>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default App;
