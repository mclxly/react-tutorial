var BarChart = ReactD3.BarChart;

var data = [{
    label: 'somethingA',
    values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
}];

React.render(
    <BarChart
        data={data}
        width={400}
        height={400}
        margin={{top: 10, bottom: 50, left: 50, right: 10}}/>,
    document.getElementById('barChart')
);

var ScatterPlot = ReactD3.ScatterPlot;

var tooltipScatter = function(x, y) {
    return "x: " + x + " y: " + y;
};

React.render(<ScatterPlot
                data={data}
                width={400}
                height={400}
                margin={{top: 10, bottom: 50, left: 50, right: 10}}
                tooltipHtml={tooltipScatter}
                xAxis={{label: "x-label"}}
                yAxis={{label: "y-label"}}/>,
            document.getElementById('scatterplot')
);