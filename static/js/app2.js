// Use the D3 library to read in the json file from the URL
var url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

let names = [];
let dataset = [];

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
  names = data.names;
  dataset = data;

// build a drop down list of names
names.forEach((element) => {
  let drop_list = d3.select('#selDataset');
  drop_list.append('option').text(element);
  });

  // isolate first value to build initial charts
  first_val = names[0];
  console.log(first_val);

  // build charts
  buildmetadata(first_val);
  buildbar(first_val);
  buildbub(first_val);

});

// build dem info box
function buildmetadata(info){
  let metadata = dataset.metadata
  let select = metadata.filter(result => result.id == info);
  console.log(select)
  let sel_data = select[0]
  d3.select('#sample-metadata').html('');
  Object.entries(sel_data).forEach(([key, value]) => {
    d3.select('#sample-metadata').append('h5').text(`${key}: ${value}`);
  })
}

// build bar chart
function buildbar(info) {
  let samples = dataset.samples
  let select = samples.filter(result => result.id == info);
  console.log(select)
  let sel_data = select[0]
  console.log(sel_data);

  // get otu id, labels and values
  let otu_ids = sel_data.otu_ids.slice(0,10).reverse();
  console.log(otu_ids);
  let otu_labels = sel_data.otu_labels.slice(0,10).reverse();
  let sample_values = sel_data.sample_values.slice(0,10).reverse();

  let trace1 = {
    x: sample_values, // sample_values --> samples.sample_values (from filtered data + slice)
    y: otu_ids, // otu_ids --> samples.otu_ids
    text: otu_labels,
    type: 'bar',
    orientation: 'h'
  };
  
  let bardata = [trace1];
  
  let layout = {
    title: "Top 10 OTUs"
  };
  
  Plotly.newPlot("bar", bardata, layout); // 'bar' is the div ID in the HTML file that this goes into

}


// build bubble chart

function buildbub(info){
  let samples = dataset.samples
  let select = samples.filter(result => result.id == info);
  let sel_data = select[0]

    // get otu id, labels and values
    let otu_ids = sel_data.otu_ids;
    let otu_labels = sel_data.otu_labels;
    let sample_values = sel_data.sample_values;

    let trace2 = {
      x: otu_ids, // should be out_ids --> samples.otu_ids
      y: sample_values, // should be sample_values --> samples.sample_values
      mode: 'markers',
      marker: {size : sample_values, // marker size should be samples.sample_values
              color : otu_ids, // color should be otu_ids
              } 
    };
    
    let bubdata = [trace2];
    
    let layout2 = {
      title: "OTU ID"
    };
    
    Plotly.newPlot("bubble", bubdata, layout2); // 'bubble' is the div ID in the HTML file that this goes into
  

}

function optionChanged(info){
  // build charts
  buildmetadata(info);
  buildbar(info);
  buildbub(info);

}




