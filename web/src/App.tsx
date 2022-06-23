import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { IData } from './lib/IData.interface';

import * as htmlToImage from 'html-to-image';

import './index.css'
import './App.css'; 

function App() {
  const [data, setData] = useState([]);
  const [RNG, setRNG] = useState(0); // RNG: Random Number Generated.  

  // Random Generated Image by reference from API Data. 
  const generated = () => {
    // Create Generated Function that doesn't return the previous index. 
    let prevIndex = RNG;
    let currIndex = Math.floor(Math.random() * (data.length - 1));
    
    if(currIndex === prevIndex) {
      setRNG(currIndex + 1);
      prevIndex = currIndex + 1;
    } else {
      setRNG(currIndex);
      prevIndex = currIndex;
    }
  }

  // Download Image when click on the 'Download' button. 
  const downloadImage = () => {
    axios({
      url: "https://staticg.sportskeeda.com/editor/2022/04/84c2b-16495346247635-1920.jpg",
      method: "GET",
      responseType: "blob"
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute("download", "anya.jpg");
      document.body.appendChild(link);
      link.click();
    })
  };
  
  useEffect(() => {
    axios.get('http://localhost:9000/anya_pic')
    .then((response: AxiosResponse) => response.data)
    .then((data: any) => setData(data))
    .catch((err: any) => console.error(err))
  }, []);
  
  // Rendering. 
  return (
    <div className="App bg-rose-300 flex content-center items-center"> 
      <h1>Anya Profile Pics</h1> 
      <div>
      {data.filter((_, index: number) => index === RNG).map((item: IData, index: number) => {
        return(
          <div>
            <img src={item.url} alt="anya" key={index} className="" />  
            <div>
              <button onClick={generated}>Generate</button>
              <button onClick={downloadImage}>Download</button>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default App;
