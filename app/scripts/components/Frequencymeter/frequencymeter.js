var React = require('react');
var model = require('./frequencymeter-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');
var Pointer = require('../Pointer/pointer');
var DotsContainer = require('../DotsContainer/dotsContainer');

var Frequencymeter = React.createClass({
  
  getInitialState: function() {
    return {frequency: false};
  },

  setFrequency: function(frequency){
    console.log('Frequency: '+frequency);
    this.frequency = frequency.toFixed(2);
    this.setState({frequency: !this.state.frequency});
  },

  render: function() {
    var frequency = this.state.frequency ? this.frequency + 'Hz' :'0Hz';
    return (
      <div id="frequencymeter">
        <DotsContainer></DotsContainer>
        <Pointer></Pointer>
        <div className="frequency-number">{frequency}</div>
      </div>
    );
  }
});

module.exports = Frequencymeter;