import AppDispatcher from '../AppDispatcher'

const ServerActions ={
  receiveDefault(localWeather){
    AppDispatcher.dispatch({
      type: 'RECEIVE_LOCAL',
      payload:{localWeather}
    })
  },
  receiveDefaultForecast(localForecast){
    AppDispatcher.dispatch({
      type: 'RECEIVE_LOCALFORECAST',
      payload:{localForecast}
    })
  }
}

export default ServerActions;
