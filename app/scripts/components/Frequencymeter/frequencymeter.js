var React = require('react');
var model = require('./frequencymeter-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');
var Pointer = require('../Pointer/pointer');
var DotsContainer = require('../DotsContainer/dotsContainer');

var Frequencymeter = React.createClass({

    render: function() {
      return (
        <div id="frequencymeter">
          <DotsContainer></DotsContainer>
          <Pointer></Pointer>
        </div>
      );
    }
});

module.exports = Frequencymeter;