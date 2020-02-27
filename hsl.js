'use strict';
const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

//put graphQL query here
const graphql = `{
  stopsByRadius(lat:60.258,lon:24.844,radius:1100){
    edges {
      node {
        stop { 
          gtfsId 
          name
        }
        distance
      }
    }
  }
}`

// Present received data
const showResults = async (result) => {
  const list = await result.data.stopsByRadius.edges; // list = path to the selected array
  for(let i in list) {
    const obj = list[i].node.stop.name;  
    const node = document.createElement('LI');
    const textnode = document.createTextNode(obj);
    node.appendChild(textnode);
    document.querySelector('.hsl-list').appendChild(node);
  }
};

// Fetch data from HSL
const fetchData = async () => {
  let response;
  response = await fetch(apiUrl, {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: `${graphql}`
  })
  let data = await response.json();
  return data;
};

const hslQuery = async () => {
  const response = await fetchData();
  const result = await response;
  showResults(result);
};

hslQuery();