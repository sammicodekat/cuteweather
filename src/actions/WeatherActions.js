import API from '../API';
import AppDispatcher from '../AppDispatcher'

const WeatherActions ={
  getDefault(value){
    API.getDefault(value);
  },
  getDefaultForecast(value){
    API.getDefaultForecast(value);
  }
}

export default WeatherActions;
