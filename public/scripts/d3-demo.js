var Chart = React.createClass({
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
});

var Bar = React.createClass({
  getDefaultProps: function() {
    return {
      width: 0,
      height: 0,
      offset: 0
    }
  },

  render: function() {
    return (
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height} 
        x={this.props.offset} y={this.props.availableHeight - this.props.height} />
    );
  }
});

var DataSeries = React.createClass({
  getDefaultProps: function() {
    return {
      title: '',
      data: []
    }
  },

  render: function() {
    var props = this.props;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);

    var bars = _.map(this.props.data, function(point, i) {
      return (
        <Bar height={yScale(point)} width={xScale.rangeBand()} offset={xScale(i)} availableHeight={props.height} color={props.color} key={i} />
      )
    });

    return (
      <g>{bars}</g>
    );
  }
});

var BarChart = React.createClass({
  render: function() {
    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries data={[ 30, 10, 5, 8, 15, 10 ]} width={this.props.width} height={this.props.height} color="cornflowerblue" />
      </Chart>
    );
  }
});

// ----------------
var DataSeries = React.createClass({
  getDefaultProps: function() {
    return {
      title: '',
      data: []
    }
  },

  render: function() {
    var self = this,
        props = this.props,
        refs = props.__owner__.refs,
        size = props.size,
        width = size.width,
        height = size.height;

    var yScale = props.yScale;
    
    var xScale = d3.scale.ordinal()
      .domain(d3.range(props.data.length))
      .rangeRoundBands([0, width], 0.05);

    var otherSeries = _.chain(refs)
      .values()
      .reject(function(component) { return component === self; })
      .value();

    var bars = _.map(props.data, function(point, i) {
      var yOffset = _.reduce(otherSeries, function(memo, series) {
        return memo + series.props.data[i];
      }, 0);

      return (
        <Bar height={yScale(point)} width={xScale.rangeBand()} x={xScale(i)} y={size.height - yScale(yOffset) - yScale(point)} color={props.color} key={i} />
      )
    });

    return (
      <g>{bars}</g>
    );
  }
});

var StackedBarChart = React.createClass({
  getDefaultProps: function() {
    return {
      width: 600,
      height: 300
    }
  },

  render: function() {
    var data = this.props.data,
        size = { width: this.props.width, height: this.props.height };

    var zipped = _.zip(data.series1, data.series2, data.series3);

    var totals = _.map(zipped, function(values) {
      return _.reduce(values, function(memo, value) { return memo + value; }, 0);
    });

    var yScale = d3.scale.linear()
      .domain([0, d3.max(totals)])
      .range([0, this.props.height]);

    return (
      <Chart width={this.props.width} height={this.props.height}>
        <DataSeries data={data.series1} size={size} yScale={yScale} ref="series1" color="cornflowerblue" />
        <DataSeries data={data.series2} size={size} yScale={yScale} ref="series2" color="red" />
        <DataSeries data={data.series3} size={size} yScale={yScale} ref="series3" color="green" />
      </Chart>
    );
  }
});

var data = { 
  series1: [ 30, 10, 5, 8, 15, 10 ],
  series2: [ 5, 20, 12, 4, 6, 2 ],
  series3: [ 5, 8, 2, 4, 6, 2 ] 
};

React.renderComponent(
  <StackedBarChart data={data} />,
  document.getElementById('content')
);

// React.renderComponent(
//   <BarChart width={600} height={300} />,
//   document.getElementById('content')
// );