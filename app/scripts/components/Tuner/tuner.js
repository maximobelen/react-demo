var React = require('react');
var model = require('./tuner-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');
var Frequencymeter = require('../Frequencymeter/frequencymeter');
var Visor = require('../Visor/visor');

var Tuner = React.createClass({
  render: function() {
    return (
        <div id="tuner">
          <Frequencymeter ref={'frequencymeter'}></Frequencymeter>
          <Visor ref={'visor'}></Visor>
          <div className="main-title">GUITAR TUNER</div>
        </div>
    );
  }
});

module.exports = Tuner;