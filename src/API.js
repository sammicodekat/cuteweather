import $ from 'jquery';
import ServerActions from './actions/ServerActions'

const API = {
  getDefaultForecast(value){
    $.get(`http://api.wunderground.com/api/a98c8087f5b3c5c7/forecast/q/${value}.json`,forecasts => {
      ServerActions.receiveDefaultForecast(forecasts);
    });
  },
  getDefault(value){
    $.get(`http://api.wunderground.com/api/a98c8087f5b3c5c7/conditions/q/${value}.json`,conditions => {
      ServerActions.receiveDefault(conditions);
    });
  }

}
export default API;
