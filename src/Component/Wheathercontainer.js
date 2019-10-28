  
import React from 'react';
import Card from './Card';
import Wheather from './Wheather';

const API_KEY_weather = "57cf47b44c40394108f8e0fd8caa9d73";

export default class Wheathercontainer extends React.Component {
  state = {
    days: [],
    fullData:[],
    dailyData:[]

    
  }
/*
  componentDidMount = () => {
    const weatherURL = "http://api.openweathermap.org/data/2.5/forecast?&appid=" + API_KEY_weather
    fetch(weatherURL)
    .then(res => res.json())
    .then(data => {
      const dailyData = data.list.filter(reading => {return reading.dt_txt.includes("18:00:00")
    }) 
      this.setState({
        fullData: data.list,
        dailyData: dailyData
      }, () => console.log(this.state))
    })
  }

  formatCards = () => {
    return this.state.dailyData.map((reading, index) => <Card reading={reading} key={index} />)
  }
*/
  render() {
    return (
     
        <div>

          {this.formatCards()}

      </div>
    )
  }
}

