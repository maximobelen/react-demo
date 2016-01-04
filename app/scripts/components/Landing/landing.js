var React = require('react');
var model = require('./landing-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');
var Tuner = require('../Tuner/tuner');

var Landing = React.createClass({

    render: function() {
        
        return (
            <div id="landing">
              <Tuner ref={'tuner'}></Tuner>
            </div>
        );

    }
});

module.exports = Landing;