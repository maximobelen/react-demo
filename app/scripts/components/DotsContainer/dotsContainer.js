var React = require('react');
var model = require('./dotsContainer-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');
var Dot = require('../Dot/dot');

var DotsContainer = React.createClass({
  
  positionDots: function(quantity) {
    var start = model.arc.start;
    var end = model.arc.end;

    var epsilon = (end - start) / quantity;

    this.radius = 280;
    this.centerX = 350;
    this.centerY = 300;
    this.position = 189.5;

    for (var dot in this.refs) {
      var x = this.centerX +(this.radius * Math.cos(this.radians(this.position)));
      var y = this.centerY +(this.radius * Math.sin(this.radians(this.position)));
      console.log(dot+'    x:'+x +' y:'+y);
      this.refs[dot].position(x, y);
      this.position += 20;
    }
  },
  
  radians: function(angle) {
    return angle * (Math.PI / 180);
  },

  countDots: function() {
    var counter = 0;
    for (var dot in this.refs) {
      counter++;
    }
    return counter;
  },

  componentDidMount: function() {
    this.positionDots(this.countDots());
  },

  render: function() {
    return (
        <div id="dots-container">
          {model.dots.map(function(object, i){
            return <Dot 
              ref={'dot'+i}
              value={object.value}
              key={i}/>;
          })}
        </div>
    );
  }
});

module.exports = DotsContainer;