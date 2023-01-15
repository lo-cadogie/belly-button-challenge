// Use the D3 library to read in the json file from the URL
var url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

var mydata = []; // let us usually used in a function, var is more global
var names = [];
var metadata = [];
var samples = [];


// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
  mydata = data;
  names = data.names;
  metadata = data.metadata;
  //console.log(metadata[0]['id']);
  samples = data.samples;
  // slice the samples to only have the top 10 results for each
        //return array.slice(0,10);


  // build a drop down list of names
  names.forEach((element) => {
    let drop_list = d3.select('#selDataset');
    drop_list.append('option').text(element);
    //console.log(drop_list)
    }); // drop down list is now populated

    // filtered data for 940 function



  // 
}); /// this line ends the original d3.json my data = data lines

  // add an event to drop down list on change, call to modify plot function

function optionChanged(selected_id){
    console.log(selected_id)
    console.log(metadata[0]['id'])
    var index_num;

    //loop thourough metedata  -> get the index number for the ID that was selected
    metadata.forEach(sample => {
        if (sample.id == selected_id){
            var demographics = Object.entries(sample);
            wash = demographics[6][1];
            d3.selectAll('p').remove();
            d3.select('#sample-metadata').selectAll('p').data(demographics).enter().append('p').text(d=>{
                return `${d[0]}: ${d[1]}`;
            });

            let sel_sample_values = sample.sample_values;
            let sel_otu_id = sample.otu_ids;
            let sel_otu_labels = sample.otu_labels;
            //// use these variables to build my chart. Slice them to build the bar charts

        }
    });


    // modify 2 plots (could be two seperate functions)
    // call the build chart function with selected_id



}



// build chart(filtered data)




// Bar Chart

let trace1 = {
    x: [1, 2, 3, 4, 5], // sample_values --> samples.sample_values (from filtered data + slice)
    y: [1, 2, 4, 8, 16], // otu_ids --> samples.otu_ids
    type: 'bar'
  };
  
  let bardata = [trace1];
  
  let layout = {
    title: "UPDATE WITH CORRECT DATA"
  };
  
  Plotly.newPlot("bar", bardata, layout); // 'bar' is the div ID in the HTML file that this goes into

// Bubble Chart // DONT slice the data, you want all of it
let trace2 = {
    x: [1, 2, 3, 4, 5], // should be out_ids --> samples.otu_ids
    y: [1, 2, 4, 8, 16], // should be sample_values --> samples.sample_values
    mode: 'markers',
    marker: {size : [30, 40, 50, 60], // marker size should be samples.sample_values
            color : 'red', // color should be otu_ids
            } 
  };
  
  let bubdata = [trace2];
  
  let layout2 = {
    title: "UPDATE WITH CORRECT DATA"
  };
  
  Plotly.newPlot("bubble", bubdata, layout2); // 'bubble' is the div ID in the HTML file that this goes into

// sample metadata in the demographic info section
// <div id="sample-metadata
// setting up text (`Text here ${variable here}!`);









