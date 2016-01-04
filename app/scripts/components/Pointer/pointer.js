var React = require('react');
var model = require('./pointer-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');

var Pointer = React.createClass({
  render: function() {
    return (
        <div id="pointer">
        </div>
    );
  }
});

module.exports = Pointer;