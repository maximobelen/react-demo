var React = require('react');
var ReactDOM = require('react-dom');
var domready = require('domready');
var App = require('./app.js');

domready(function () {
  /*jshint ignore:start */
  ReactDOM.render(
    <App/>,
    document.getElementById('app-container')
  );
  /*jshint ignore:end */
});