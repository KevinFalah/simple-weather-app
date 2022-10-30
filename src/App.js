import React, {useState} from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState(null)

  const [location, setLocation] = useState('')

  const [loading, setLoading] = useState(false)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=195204739960cd7e14e73b0d48e0721f`

  const handleSearch = (e) => {
    if(e.key === 'Enter') {
      setLoading(true)
      axios.get(url).then((res) => {
        setData(res.data)
      })
      setLoading(false)     
      setLocation('')
    }
  }

  console.log(data)


  return (
    <div className="app">
      <div className="search"> 
        <input 
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder='Location...'
          onKeyPress={handleSearch}
          type='text'
        />
      </div>
      <div className="container">
        {data?.name == undefined ? (
          <h4 className="unSearch">Search Something</h4>
        ): (
          <div className="top">
          <div className="location">
            <p>{data?.name}</p>
          </div>
          <div className="temp">
            <h1>{data?.main?.temp.toFixed()}°F</h1>
          </div>
          <div className="description">
            <p>{data?.weather?.[0]?.description}</p>
          </div>
        </div>
        )}

        <div className="bottom">
          <div className="feels">
          {data?.name == undefined ? "" : (<p className="bold">{data?.main?.feels_like.toFixed()}°F</p>)}  
            <p>Feels Like</p>
          </div>
          <div className="humidity">
           {data?.name == undefined ? "" : (<p className="bold">{data?.main?.humidity}%</p>)} 
            <p>Humidity</p>
          </div>
          <div className="wind">
          {data?.name == undefined ? "" : ( <p className="bold">{data?.wind?.speed} MPH</p>)}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
