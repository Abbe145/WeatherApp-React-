import React, { Component } from 'react';
import './App.css';
import { GoogleComponent } from 'react-google-location'
import Wheather from './Component/Wheather'
import Card from './Component/Card'
import './App.css';
import { DropdownButton } from '../node_modules/react-bootstrap'
import { Dropdown } from '../node_modules/react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const API_KEY_google = "AIzaSyDpzDgLJ0kphTXvatfP_DyIw_WzRKbXuVY"
const API_KEY_weather = "57cf47b44c40394108f8e0fd8caa9d73";

class App extends Component {
  constructor(props) {
    super(props);

    this.getStockholmWeather = this.getStockholmWeather.bind(this);
    this.state = {
      place: null,
      temp_mini: undefined,
      temperatur: undefined,
      temp_maxi: undefined,
      humidity: undefined,
      city: undefined,
      country: undefined,
      description: undefined,
      error: false,
      icon: undefined,
      dailyData:[],
      days:[],
      fullData: [],
      fav:[],
      lat:null,
      lng:null,
      cityName:null
      
    };
  }

  getStockholmWeather= () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=stockholm,se&appid=${API_KEY_weather}`)
      .then(res => res.json())
      .then(info =>
        this.setState({
          city: info.name,
          country: info.sys.country,
          temperatur: info.main.temp,
          max_temp: info.main.temp_max,
          min_temp: info.main.temp_min,
          description: info.weather[0].description,
          error: false,
          icon: info.weather[0].id,
          lat : null

        })
      )
      

      
  }

  componentDidMount() {
    this.getStockholmWeather();
    //hämtar localStorge från läsaren 
    const favorits = JSON.parse(localStorage.getItem('FavSerachs')) || [];
    this.setState({ fav:favorits });
  }

  getClickedItem (clickedCity ,e){
    //sätter valu
 
    this.state.lat = clickedCity.lat;
    this.state.lng = clickedCity.lng;
    this.state.cityName = clickedCity.place;
    this.state.place = null;
    //hämta väder från getweather
    this.getWheather(e);
  }

  getWheather = async (e) => {
    e.preventDefault();

    if (this.state.lat !== null) {
  
      //fixa så den iinte lägger till om och om 
      this.state.fav.push({
        lat : this.state.lat,
        lng: this.state.lng,
        place :  this.state.cityName || this.state.place.place ,
      })
      localStorage.setItem('FavSerachs', JSON.stringify(this.state.fav));

      const Myapi = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + this.state.lat + '&lon=' + this.state.lng + '&appid=' + API_KEY_weather + '');
      const info = await Myapi.json();

      this.setState({
        temperatur: info.main.temp,
        temp_maxi: info.main.temp_max,
        temp_mini: info.main.temp_min,
        country: info.sys.country,
        city: info.name,
        humidity: info.main.humidity,
        description: info.weather[0].description,
        error: "",
        icon: info.weather[0].id,
      });

      const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.lat}&lon=${this.state.lng}&appid=${API_KEY_weather}`
      fetch(weatherURL)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter(reading => {return reading.dt_txt.includes("18:00:00")
      }) 
        this.setState({
          fullData: data.list,
          dailyData: dailyData,
        }, () => console.log(this.state))
      })
    }
  }

  formatDayCards = () => {
    return this.state.dailyData.map((reading, index) => <Card reading={reading} key={index} />)
  }
  render() {
    // vid sökning i google input fylls detta data
    //CityName nullas så inget krockar med push Fav
  
    console.warn(this.state.place);
    if(this.state.place !== null){
      if(this.state.place.coordinates.lat !== undefined){
        this.state.lat = this.state.place.coordinates.lat;
        this.state.lng = this.state.place.coordinates.lng;
        this.state.cityName = null;
      }
    }

    return (

      
      <div className="fomDiv" onSubmit={this.props.getWheather}>
        <DropdownButton id="dropdown-basic-button"  title="Favorite" >
            {this.state.fav.map((clickedFav) => <Dropdown.Item onClick={(e) =>  {this.getClickedItem(clickedFav , e)}} >{clickedFav.place} </Dropdown.Item>)}
        </DropdownButton>
        <div id="serachForm">
          
        <GoogleComponent apiKey={API_KEY_google} coordinates={true} language={'sv'} onChange={(googl) => { this.setState({ place: googl }) }} />
        {<button className="button"  autoComplete='off' onClick={this.getWheather} >Get wheather</button>}</div>

        <Wheather
          temperatur={this.state.temperatur}
          temp_maxi={this.state.temp_maxi}
          temp_mini={this.state.temp_mini}
          country={this.state.country}
          city={this.state.city}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
          icon={this.state.icon} />
      <div id="cardsContainer">
        {this.formatDayCards()}
      </div>
      </div>
    );
  }

}
export default App;







