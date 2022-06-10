import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IData } from './lib/IData.interface';

function App() {
  const [data, setData] = useState([]);
  const [RNG, setRNG] = useState(0); // RNG: Random Number Generated.  

  const generated = () => {
    setRNG(Math.floor(Math.random() * data.length));
  }
  
  useEffect(() => {
    axios.get('http://localhost:9000/anya_pic')
    .then((response: AxiosResponse) => response.data)
    .then((data: any) => setData(data))
    .catch((err: any) => console.error(err))
  }, []);
  
  return (
    <div className="App">
      <div>
      {data.filter((_, index: number) => index === RNG).map((item: IData, index: number) => {
        return(
          <img src={item.url} alt="anya"/>
        )
      })}
      </div>
      <div>
      <button onClick={generated}>Generate</button>
        <button>Download</button>
      </div>
    </div>
  );
}

export default App;
