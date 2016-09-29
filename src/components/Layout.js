import React, { Component } from 'react'
import WeatherActions from '../actions/WeatherActions'
import WeatherStore from '../stores/WeatherStore'
import {Button, Input, Image,Grid,Card,Icon} from 'stardust'
const { Column, Row } = Grid

export default class Layout extends Component {
  constructor() {
    super();
    this.state ={
      local : WeatherStore.getLocalWeather(),
      localForecast:WeatherStore.getLocalForecast()
    }
    this._onChange = this._onChange.bind(this);
    this._search = this._search.bind(this);
  }

  componentWillMount(){
    WeatherStore.startListening(this._onChange);
    this._getLocalWeather('autoip');
  }
  componentWillUnmount(){
    WeatherStore.stopListening(this._onChange);
  }
  _onChange(){
    this.setState({
      local : WeatherStore.getLocalWeather(),
      localForecast: WeatherStore.getLocalForecast()
    })
  }
  _search(){
    let {infobar} =this.refs;
    let str = infobar.value;
    let value,city,state ='';
    if (!isNaN(str)){
      value = str;
    }
    else{
      value =str.split(',');
      value[0]= value[0].replace(" ","_");
      value.join('/');
    }
    this._getLocalWeather(value)
  }
  _getLocalWeather(value){
    WeatherActions.getDefault(value);
    WeatherActions.getDefaultForecast(value);
  }
  _getIcon(icon){
    var src ='';
    switch (icon){
      case "clear":
      default:
      src = 'src/img/clear.gif';
      break;
      case "nt_clear":
      src = 'src/img/clearnight.jpg';
      break;
      case 'cloudy':
      case "nt_mostlycloudy":
      case "nt_cloudy":
      case "mostlycloudy":
      src = 'src/img/cloudy.jpg';
      break;
      case "chancerain":
      case "nt_chancerain":
      src = 'src/img/cloudy.jpg';
      break;
    }
    return src;
  }

  render() {
    const {local,localForecast} = this.state;
    let location,icon,temp,src,feel,time,zip,tnight,tnIcon,tmr,tmrIcon,tnText,tmrText,tnsrc,tmrsrc= '';

    if(local){
      var current = local.current_observation;
      location = current.display_location.full;
      icon = current.icon;
      temp = current.temperature_string;
      feel = current.feelslike_string;
      time = current.observation_time;
      zip = current.display_location.zip;
      src = this._getIcon(icon);
      var lforecast = localForecast.forecast.txt_forecast.forecastday;
      tnight = lforecast[1].title;
      tnText = lforecast[1].fcttext;
      tnIcon = lforecast[1].icon;
      tmr = lforecast[2].title;
      tmrText = lforecast[2].fcttext;
      tmrIcon = lforecast[2].icon;
      tnsrc = this._getIcon(tnIcon);
      tmrsrc = this._getIcon(tmrIcon);
    }
    console.log(location);
    return (
      <div className = "container">
      <Grid columns={2} divided padded>
      <Row color='orange'>
       <Column></Column>
       <Column> <input placeholder='Zipcode/City,State' ref="infobar"/><Button color ='blue' onClick={this._search}>Search</Button></Column>
      </Row>
      </Grid>
       <Grid columns={3} divided padded>
        <Row color='orange'>
         <Column>Current Weather</Column>
         <Column>Tonight's Forecast</Column>
         <Column>Tomorrow's Forecast</Column>
        </Row>
        <Row color='blue'>
         <Column>
          <Card>
           <Column><Image src={src} size='medium' shape='circular' /></Column>
           <Card.Content>
            <Card.Header>{temp}</Card.Header>
            <Card.Meta><span>{location}</span></Card.Meta>
            <Card.Description>
             <p>Feels like {feel}</p>
             <p>{time}</p>
            </Card.Description>
           </Card.Content>
          </Card>
         </Column>

         <Column>
          <Card>
           <Column><Image src={tnsrc} size='medium' shape='circular' /></Column>
           <Card.Content>
            <Card.Header>{tnight} </Card.Header>
            <Card.Meta><span>{location}</span></Card.Meta>
            <Card.Description>
            {tmrText}
            </Card.Description>
           </Card.Content>
          </Card>
         </Column>
         <Column>
          <Card>
           <Column><Image src={tmrsrc} size='medium' shape='circular' /></Column>
           <Card.Content>
            <Card.Header>{tmr} </Card.Header>
            <Card.Meta><span>{location}</span></Card.Meta>
            <Card.Description>
            {tnText}
            </Card.Description>
           </Card.Content>
          </Card>
         </Column>
      </Row>
      <Row color="orange">
      <Column></Column>
      <Column>Pics/Gifs Courtesy of <a href="http://cindysuen.tumblr.com/">Cindy Suen</a></Column>
      <Column>Made by <a href="https://github.com/sammicodekat">SammiCodeKat</a></Column>
      </Row>
      </Grid>
      </div>
    )
  }
}
