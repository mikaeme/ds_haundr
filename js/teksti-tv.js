const showReport = async (report) => {
    document.querySelector('#temp').innerHTML = ('<li>' + (report.teletext.page.number) + '</li>');
    document.querySelector('#wind').innerHTML = ('<li>' + (report.teletext.page.name) + '</li>');
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
    const response = await getJsonMenu('https://external.api.yle.fi/v1/teletext/pages/100.json?app_id=072f825b&app_key=921f3b699a881eab808884e74f4be799');
    const news = await response;
    showReport(news);
};

getNews();

/* var url = 'https://external.api.yle.fi/v1/teletext/pages/100.json?app_id=072f825b&app_key=921f3b699a881eab808884e74f4be799'

var req = new Request(url);
fetch(req)
    .then(function(response){
        console.log(response.json());
    })  */
