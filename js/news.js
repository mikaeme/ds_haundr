// ///////////////// EI TOIMI SUOMESSA ////////////////////
/* var url = 'http://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=818b12af0ccc48dbb9176013a960243b';
var req = new Request(url);
fetch(req)
    .then(function(response) {
        console.log(response.json());
    }) */


// ///////////////////// TOIMII //////////////////////////////
/* var url = 'http://webhose.io/filterWebContent?token=03cf4521-ef90-4fad-a5db-3ffc857c33a5&format=json&ts=1582983842606&sort=crawled&q=language%3Afinnish%20site_type%3Anews'

var req = new Request(url);
fetch(req)
    .then(function(response){
        console.log(response.json());
    }) */


// ////////////////////////// TOIMII ////////////////////////////////////
const showReport = async (report) => {
    document.querySelector('#temp').innerHTML = ('<li>' + (report.posts[1].title) + '</li>');
    document.querySelector('#wind').innerHTML = ('<li>' + (report.posts[2].title) + '</li>');
    document.querySelector('#cloud').innerHTML = ('<li>' + (report.posts[6].title) + '</li>');
}

const getJsonMenu = async (menuUrl) => {
    let response;
    try{
        response = await fetch(`${menuUrl}`);
        if (!response.ok){
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }
    } catch(error){
        console.log('Fetch error', error.message);
    }
    let news = await response.json();
    console.log(news);
    return news;
};

const getNews = async () => {
    const response = await getJsonMenu('http://webhose.io/filterWebContent?token=03cf4521-ef90-4fad-a5db-3ffc857c33a5&format=json&ts=1582983842606&sort=crawled&q=language%3Afinnish%20site_type%3Anews');
    const news = await response;
    showReport(news);
};

getNews();


// ////////////////////////////////// EI TOIMI //////////////////////////////////
/* 
fetch('http://webhose.io/filterWebContent?token=03cf4521-ef90-4fad-a5db-3ffc857c33a5&format=json&ts=1582983842606&sort=crawled&q=language%3Afinnish%20site_type%3Anews',{
    method: 'POST',
    body: `{
        posts{
            title
            text
        }
    }`
}) 
    .then((response) => response.json())
    .then((data) => {
        document.querySelector('#news').innerHTML = ('<li>'+ data + '</li>');
    })
    .catch((error) => {
        console.log('Error:', error);
    }); */
