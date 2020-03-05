'use strict';
const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

const schedule = [];
const stopId = [
  4150202,
  4150228,
  4150201,
  4150296,
  4150269,
  4150268,
  4150261
];

const getTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) - (hours * 60);
  // add leading zero to minutes string if needed
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};

const getStopData = (id) => {
  return `{
  stop(id: "HSL:${id}") {
    name
    stoptimesWithoutPatterns {
      scheduledArrival
      realtimeArrival
      arrivalDelay
      scheduledDeparture
      realtimeDeparture
      departureDelay
      realtime
      realtimeState
      serviceDay
      headsign
      trip {
        routeShortName
        tripHeadsign
      }
    }
  }
}`
};

const showResult = () => {
  for(let i in schedule){
    const node = document.createElement('li');
    const textnode = document.createTextNode(schedule[i]);
    node.appendChild(textnode);
    document.querySelector('.hsl-list').appendChild(node);
  }
};
// Present received data
const makeArray = async (result) => {
  const stop = result.data.stop;
  for (let i=0; i<2;i++) {
    const ride = await stop.stoptimesWithoutPatterns[i];
    // schedule.push(`time: "${getTime(ride.scheduledDeparture)}", line: "${ride.trip.routeShortName}", 
    //  destination: "${ride.headsign !== null ? ride.headsign : ride.trip.tripHeadsign}", stop: "${stop.name}"`);
    // };
    schedule.push(`${getTime(ride.scheduledDeparture)}, ${ride.trip.routeShortName}, 
    ${ride.headsign !== null ? ride.headsign : ride.trip.tripHeadsign}, ${stop.name}`);
   };
    schedule.sort();
  };

// Fetch data from HSL
const fetchData = async (i) => {
  let response;
  response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
    },
    body: getStopData(stopId[i])
  })
  let data = await response.json();
  return data;
};

const hslQuery = async () => {
  for (let i in stopId) {
    const response = await fetchData(i);
    const result = await response;
    makeArray(result);
  }
  showResult();
};

hslQuery();