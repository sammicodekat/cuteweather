import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let _localWeather =null;
let _localForecast =null;

class WeatherStore extends EventEmitter {
  constructor(){
    super();
    AppDispatcher.register(action => {
      switch(action.type){
        case 'RECEIVE_LOCAL':
        _localWeather = action.payload.localWeather;
        this.emit('CHANGE');
        case 'RECEIVE_LOCALFORECAST':
        _localForecast = action.payload.localForecast;
        this.emit('CHANGE');
      }
    })
  }

startListening(cb){
  this.on('CHANGE',cb);
}
stopListening(cb){
  this.removeListener('CHANGE',cb);
}

getLocalWeather(){
  return _localWeather;
}
getLocalForecast(){
  return _localForecast;
}
}

export default new WeatherStore();
