import React from 'react';
import './Card.css';
import 'owfont/css/owfont-regular.css';


var moment = require('moment');

const Card = ({ reading }) => {
  let newDate = new Date();
  const weekday = reading.dt * 1000
  newDate.setTime(weekday)

  const imgImage = `http://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`

  return (
    <div className="col-sm-card2">
      <div className="card"><h3 className="card-title">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
        <img width="132" height="132" src={imgImage}></img>
        <h2>{Math.round(reading.main.temp)-273} °C</h2>
        <div className="card-body">
          <p className="card-text">{reading.weather[0].description}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;