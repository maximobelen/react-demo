var React = require('react');
var model = require('./frequencymeter-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');
var SpotContainer = require('../SpotContainer/SpotContainer');

var Frequencymeter = React.createClass({
  
  getInitialState: function() {
    return {frequency: false};
  },

  setFrequency: function(frequency){
    this.frequency = frequency.toFixed(2);
    this.setState({frequency: true});
  },

  setSpot: function(index){

    if(index % 3 === 0){
      this.refs.spotContainer.setActiveSpot(0);
    }
    if(index % 3 === 1){
      this.refs.spotContainer.setActiveSpot(1);
    }
    if(index % 3 === 2){
      this.refs.spotContainer.setActiveSpot(2);
    }
  },

  render: function() {
    var frequency = this.state.frequency ? this.frequency + 'Hz' :'0Hz';
    return (
      <div id="frequencymeter">
        <SpotContainer  ref={'spotContainer'}></SpotContainer>
        <div className="frequency-number">{frequency}</div>
      </div>
    );
  }
});

module.exports = Frequencymeter;