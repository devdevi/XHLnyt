const form = document.getElementById('search_form');
const responseContainer = document.getElementById('response_container');
const searchBtn = document.getElementById('search_btn');
const searchKeyword = document.getElementById('textarea1');
let searchForText;
const myPost = document.getElementById('myPost');


searchBtn.addEventListener('click', function(evnt) {
  evnt.preventDefault();
  searchForText = searchKeyword.value;
  document.getElementById('textarea1').value = '';
  console.log(searchForText);
  getNews();
});


function getNews() {
  const articleRequest = new XMLHttpRequest();
  articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchForText}&api-key=d8325d2865a64b4b8cae1d99e28fdca1`);
  articleRequest.onload = addNews;
  articleRequest.onerror = handleError;
  articleRequest.send();
}
function handleError() {
  console.log('Se ha presentado un error');
}
function addNews() {
  const data = JSON.parse(this.responseText);
  console.log(data);
  // acedemos a la propiedad .response de data
  // const response = data.response;
  // console.log(response);
  const docs = data.response.docs;
  for (var j = 4; j < docs.length; j++) {

    const article = docs[j];
    const title = article.headline.main;
    const snippet = article.snippet;
    const kicker = article.headline.kicker;
    const img = article.multimedia[0].legacy.xlarge;
    const imgLink = `https://cdn1.nyt.com/${img}`;
    const link = article.web_url;
    const date = article.pub_date;

    console.log(imgLink);
    console.log(title);
    console.log(kicker);
    console.log(snippet);
    console.log(date);
    console.log(link);  
  
  
    let divCard = document.createElement('div');
    divCard.className = 'col s4';
    let card = document.createElement('div');
    card.className = 'card';
    divCard.appendChild(card);
    // imagen
    let cardImg = document.createElement('div');
    cardImg.className = 'card-image waves-effect waves-block waves-light';
    card.appendChild(cardImg);
    let imgS = document.createElement('img');
    imgS.className = 'activator';
    imgS.setAttribute('src', `${imgLink}`);
    cardImg.appendChild(imgS);
    // title
    let cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    let span = document.createElement('span');
    span.className = 'card-title activator grey-text text-darken-4';
    span.innerText = title;
    let icon = document.createElement('i');
    icon.className = 'material-icons right';
    icon.innerText = 'more_vert';
    span.appendChild(icon);
    let paragraf = document.createElement('p');
    let apos = document.createElement('a');
    apos.setAttribute('href', link);
    apos.innerText = 'See More..';
    paragraf.appendChild(apos);
    cardContent.appendChild(span);
    cardContent.appendChild(paragraf);
    card.appendChild(cardContent);

    // contenido
    let cardReveal = document.createElement('div');
    cardReveal.className = 'card-reveal gray-text';
    let spanI = document.createElement('span');
    spanI.className = 'card-title blue-text text-darken-4';
    spanI.innerText = title;
    cardReveal.appendChild(spanI);
    let iconI = document.createElement('i');
    iconI.innerText = 'close';
    spanI.appendChild(iconI);
    let parragrafTwo = document.createElement('p');
    parragrafTwo.innerText = snippet;
    let parragrafTree = document.createElement('p');
    parragrafTwo.className = 'gray-text text-darken-4 light';
    parragrafTree.className = 'gray-text text-darken-4 light';
    parragrafTree.innerText = (`${kicker}`);

    cardReveal.appendChild(parragrafTwo);
    cardReveal.appendChild(parragrafTree);
    card.appendChild(cardReveal);


    myPost.appendChild(divCard); 
  }
};


