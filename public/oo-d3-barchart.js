
//  Data definition
data = [];
while(data.length != 8) {
    data = [];
    for (let i = 0; i < 8; i++) {
        element = Math.round(80 * Math.random());
        if(data.indexOf(element) === -1){
            data.push({value: element, x: i+1});
        } else {
            i--;
        }
    }
}

console.log(data);

const Chart = function (opts) {

    this.data = opts.data;
    this.element = opts.element;

    this.drawBarChart();
}

Chart.prototype.drawBarChart = function() {
    this.width = this.element.offsetWidth;
    this.height = this.width / 2;
    this.margin = { top: 20, right: 75, bottom: 45, left: 50 };

    this.chartSvg = d3.select(this.element).append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    this.createScalesLinear();
    this.addAxes();
    this.addBars();
}

Chart.prototype.createScalesLinear = function () {
    this.xScale = d3.scaleLinear()
        .range([300, this.width - 300])
        .domain([0,d3.max(this.data, (d) => {return d.x;})]);

    this.yScale = d3.scaleLinear()
        .range([this.height - this.margin.bottom, this.margin.top])
        .domain([0,d3.max(this.data, (d) => {return d.value;})]);
}

Chart.prototype.addAxes = function () {
    this.chartSvg.append("g")
      .attr("transform", "translate(0," + (this.height-this.margin.bottom) + ")")
      .call(d3.axisBottom(this.xScale));

    this.chartSvg.append("g")
        .attr("transform", "translate(300,0)")
      .call(d3.axisLeft(this.yScale));
}

Chart.prototype.addBars = function () {
    this.barWidth = (this.width - this.margin.left - this.margin.right - 600)/this.data.length;

    const bars = this.chartSvg.selectAll('.bars')
        .data(this.data)
        .enter()
        .append('rect')
        .attr('class', 'bars')
        .attr('y', (d,i) => {return this.yScale(d.value)})
        .attr('x', (d, i) => {
            return this.xScale(d.x) - this.barWidth/2;
        })
        .attr('height',(d,i) => {return this.height - this.yScale(d.value) - this.margin.bottom})
        .attr('width',this.barWidth)
        .attr('fill', 'red')
        .attr('fill-opacity', 0.6)
        .attr('stroke', 'red');
}

Chart.prototype.updateData = function () {
    const dataTmp = [];
    for (let i = 0; i < this.data.length; i++) {
        element = Math.round(80 * Math.random());
        if(dataTmp.indexOf(element) === -1){
            dataTmp.push({value: element, x: i+1});
        } else {
            i--;
        }
    }

    this.data = dataTmp;

    this.yScale = d3.scaleLinear()
        .range([this.height - this.margin.bottom, this.margin.top])
        .domain([0,d3.max(this.data, (d) => {return d.value;})]);

    this.chartSvg.selectAll('.bars')
        .transition().duration(500)
        .attr('y',(d,i) => {return this.height - this.yScale(this.data[i].value) - this.margin.bottom;})
        .attr('height', (d, i) => {
            return this.yScale(this.data[i].value);
        });
}

const chart = new Chart({ element: document.getElementsByTagName("BODY")[0], data: data });


// //  Public functions

updateData = function () {
    chart.updateData();
    // setInterval(function(){ chart.updateData(); }, 500);
};