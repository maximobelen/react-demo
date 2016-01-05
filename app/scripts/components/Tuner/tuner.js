var React = require('react');
var model = require('./tuner-model');
var ReactDOM = require('react-dom');
var TweenMax = require('gsap');
var Frequencymeter = require('../Frequencymeter/frequencymeter');
var Visor = require('../Visor/visor');
var autorecordmic = require('autorecordmic');

var Tuner = React.createClass({

  startRecording: function(){
    if( autorecordmic.isAvailable ) {
     
      var mic = autorecordmic( {
     
        onSampleFinished: function() {
          mic.listen();
        },
     
        onRecordStart: function() {

        },
     
        onRecordStop: function() {
          var data = mic.getStereoData();
          this.analizeAudio(
            {
              "timeseries": data,
              "test_frequencies": this.test_frequencies,
              "sample_rate": mic.context.sampleRate
            }
          );
          mic.listen();
        }.bind(this)
      }, function( err ) {
     
        if( err ) {
          console.log( 'Tuner Error:'+ err );
        }
      });
    }
  },

  analizeAudio: function(data){
    var timeseries = data.timeseries;
    var test_frequencies = data.test_frequencies;
    var sample_rate = data.sample_rate;
    var amplitudes = this.compute_correlations(timeseries, test_frequencies, sample_rate);

    this.interpret_correlation_result({ "timeseries": timeseries, "frequency_amplitudes": amplitudes });
  },

  compute_correlations: function(timeseries, test_frequencies, sample_rate){
    // 2pi * frequency gives the appropriate period to sine.
    // timeseries index / sample_rate gives the appropriate time coordinate.
    var scale_factor = 2 * Math.PI / sample_rate;
    var amplitudes = test_frequencies.map
    (
      function(f)
      {
        var frequency = f.frequency;

        // Represent a complex number as a length-2 array [ real, imaginary ].
        var accumulator = [ 0, 0 ];
        for (var t = 0; t < timeseries.length; t++)
        {
          accumulator[0] += timeseries[t] * Math.cos(scale_factor * frequency * t);
          accumulator[1] += timeseries[t] * Math.sin(scale_factor * frequency * t);
        }

        return accumulator;
      }
    );

    return amplitudes;
  },

  interpret_correlation_result: function(data){
    var timeseries = data.timeseries;
    var frequency_amplitudes = data.frequency_amplitudes;
    // Compute the (squared) magnitudes of the complex amplitudes for each
    // test frequency.
    var magnitudes = frequency_amplitudes.map(function(z) { return z[0] * z[0] + z[1] * z[1]; });
    // Find the maximum in the list of magnitudes.
    var maximum_index = -1;
    var maximum_magnitude = 0;
    for (var i = 0; i < magnitudes.length; i++)
    {
      if (magnitudes[i] <= maximum_magnitude)
        continue;
      maximum_index = i;
      maximum_magnitude = magnitudes[i];
    }
    // Compute the average magnitude. We'll only pay attention to frequencies
    // with magnitudes significantly above average.
    var average = magnitudes.reduce(function(a, b) { return a + b; }, 0) / magnitudes.length;
    var confidence = maximum_magnitude / average;
    var confidence_threshold = 10; // empirical, arbitrary.
    if (confidence > confidence_threshold)
    {
      var dominant_frequency = this.test_frequencies[maximum_index];
      this.refs.visor.setNote(dominant_frequency.name);
      this.refs.frequencymeter.setFrequency(dominant_frequency.frequency);
      this.refs.frequencymeter.setSpot(maximum_index);
    }
  },

  componentDidMount: function() {
    var C2 = 65.41;
    this.test_frequencies = [];

    for (var i = 0; i < 30; i++) {
      var note_frequency = C2 * Math.pow(2, i / 12);
      var note_name = model.notes[i % 12];
      var note = { "frequency": note_frequency, "name": note_name };
      var just_above = { "frequency": note_frequency * Math.pow(2, 1 / 48), "name": note_name + "." };
      var just_below = { "frequency": note_frequency * Math.pow(2, -1 / 48), "name": '.' + note_name };
      this.test_frequencies = this.test_frequencies.concat([ just_below, note, just_above ]);
    }
    this.startRecording();
  },

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