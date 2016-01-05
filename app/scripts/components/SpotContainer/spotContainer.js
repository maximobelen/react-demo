var React = require('react');
var model = require('./spotContainer-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');
var Spot = require('../Spot/spot');

var SpotContainer = React.createClass({
  
  getInitialState: function() {
    return {active: -1};
  },

  positionSpots: function(quantity) {

    this.position = 140;

    for (var spot in this.refs) {
      this.refs[spot].position(this.position, 140);
      this.position += 200;
    }
  },

  setActiveSpot: function(index) {
    if(this.state.active !== -1){
      this.refs['spot'+this.activeIndex].noActive();
    }
    this.refs['spot'+index].active();
    this.activeIndex = index;
    this.setState({active: this.activeIndex});
  },

  countElements: function() {
    var counter = 0;
    for (var spots in this.refs) {
      counter++;
    }
    return counter;
  },

  componentDidMount: function() {
    this.positionSpots(this.countElements());
  },

  render: function() {
    return (
      <div id="dots-container">
        {model.spots.map(function(object, i){
          return <Spot 
            ref={'spot'+i}
            style={object.style}
            value={object.value}
            key={i}/>;
        })}
      </div>
    );
  }
});

module.exports = SpotContainer;