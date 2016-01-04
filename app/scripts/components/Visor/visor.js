var React = require('react');
var model = require('./visor-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');

var Visor = React.createClass({
    setNote: function(note){
      console.log('NOTE: '+note);
    },
    
    render: function() {
        
        return (
            <div id="visor">
            </div>
        );

    }
});

module.exports = Visor;