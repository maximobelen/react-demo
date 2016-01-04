var React = require('react');
var model = require('./dot-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');

var Dot = React.createClass({
  
  position: function(x, y){
    TweenMax.set(this.container, {left:(x - model.size/2), top:(y - model.size/2)});
  },

  componentDidMount: function() {
    this.container = ReactDOM.findDOMNode(this);
  },

  render: function() {
    return (
      <div className="dot">
        <div className="circle"></div>
        <div className="title">{this.props.value}</div>
      </div>
    );
  }
});

module.exports = Dot;