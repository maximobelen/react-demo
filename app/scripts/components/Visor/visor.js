var React = require('react');
var model = require('./visor-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');

var Visor = React.createClass({
    
  getInitialState: function() {
    return {note: false};
  },

  setNote: function(note){
    this.note = note;
    this.setState({note: true});
  },

  render: function() {
    var note = this.state.note ? this.note :'NO' ;
    return (
      <div id="visor">
        <div className="note-container">{note}</div>
      </div>
    );
  }
});

module.exports = Visor;