import React from 'react';
import moment from 'moment'
import 'owfont/css/owfont-regular.css';
import './Wheather.css';

class Weather extends React.Component {

    render() {

       
    

        const imgURL = `owf owf-${this.props.icon} owf-5x`


        return (

            <div>                    
                

              { this.props.country && this.props.city && <h1>{this.props.country}, {this.props.city}</h1>}
              <h1>{moment().format('MMMM Do YYYY, h:mm:ss a') }</h1>
              <i className={imgURL}></i>


              { this.props.temperatur && <p>Tempreture: {Math.floor(this.props.temperatur-273.15)}&deg;</p>}
              { this.props.temp_maxi && <p>Tempmaxi: {Math.floor(this.props.temp_maxi-273.15)}&deg;</p>}
              { this.props.temp_mini && <p>Tempmini: {Math.floor(this.props.temp_mini-273.15)}&deg;</p>}
              { this.props.humidity && <p>Tempreture: {this.props.humidity}</p>}
              { this.props.description && <p>Tempreture: {this.props.description}</p>}

           
        </div>


            
        )

    }

}
export default Weather;
