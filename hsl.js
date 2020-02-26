'use strict';
fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/graphql',
    },
    body: `{ stop(id: "HSL:1040129") {
        name
        lat
        lon
        wheelchairBoarding
      }  
    }`
})
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });