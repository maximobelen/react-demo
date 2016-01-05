var React = require('react');
var model = require('./spot-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');

var Square = React.createClass({
  
  position: function(x, y){
    TweenMax.set(this.container, {left:(x - model.size/2), top:(y - model.size/2)});
  },

  componentDidMount: function() {
    this.container = ReactDOM.findDOMNode(this);
    this.form = this.container.getElementsByClassName('form-container')[0];
    this.setStyle(this.props.style);
  },

  setStyle: function(style){
    this.form.className += " " + style;
  },

  active: function(){
    TweenMax.to(this.container, 0.4, {opacity: 1});
  },

  noActive: function(){
    TweenMax.to(this.container, 0.4, {opacity: 0.6});
  },

  render: function() {
    return (
      <div className="spot">
        <div className="form-container"></div>
        <div className="title">{this.props.value}</div>
      </div>
    );
  }
});

module.exports = Square;