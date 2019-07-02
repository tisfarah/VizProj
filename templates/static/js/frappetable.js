/* data route */
var url = "http://127.0.0.1:5000/tabularData";
console.log(url);

function buildFrappe() {
  d3.json(url).then(function(response) {
    console.log(response);
    var options = {
      columns: response.map(data => data.columns),
      data: response.map(data => data.results)
      //name: "Bigfoot Sightings",
      //x: response.map(data => data.year),
      //y: response.map(data => data.sightings),
      //line: {color: "#17BECF"}
    };

var data = [options];
var container = document.querySelector('#datatable');
var datatable = new DataTable(container, data);
  });
}
  
buildFrappe();
