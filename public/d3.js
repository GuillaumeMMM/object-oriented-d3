
//  Data definition
data = [];
while(data.length != 8) {
    data = [];
    for (let i = 0; i < 8; i++) {
        element = Math.round(80 * Math.random());
        if(data.indexOf(element) === -1){
            data.push(element);
        } else {
            i--;
        }
    }
}

const Chart = function (opts) {


    this.data = opts.data;
    this.element = opts.element;

    this.draw();
}

Chart.prototype.draw = function () {
    this.width = this.element.offsetWidth;
    this.height = this.width / 2;
    this.margin = { top: 20, right: 75, bottom: 45, left: 50 };

    this.chartSvg = d3.select(this.element).append('svg')
        .attr('width', this.width)
        .attr('height', this.height);

    this.createScales();
    this.addAxes();
    this.addCircles();
}

Chart.prototype.createScales = function () {

    this.xScale = d3.scaleBand()
        .range([400, this.width - 400])
        .domain(this.data.map(function (d) { return d; }))
}

Chart.prototype.addAxes = function () {
    //  
}

Chart.prototype.addCircles = function () {

    const circles = this.chartSvg.selectAll('.circle')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('r', (d, i) => {
            return d;
        })
        .attr('cy', 100)
        .attr('cx', (d, i) => {
            return this.xScale(d) + this.data[0] + 10;
        })
        .attr('fill', 'red')
        .attr('fill-opacity', 0.6)
        .attr('stroke', 'red');
}

Chart.prototype.updateData = function () {
    const dataTmp = [];
    for (let i = 0; i < this.data.length; i++) {
        dataTmp.push(Math.round(80 * Math.random()));
    }

    this.data = dataTmp;

    this.chartSvg.selectAll('.circle')
        .transition().duration(500)
        .attr('r', (d, i) => {
            return dataTmp[i];
        });
}

const chart = new Chart({ element: document.getElementsByTagName("BODY")[0], data: data });


//  Public functions

updateData = function () {
    chart.updateData();
};