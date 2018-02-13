const form = document.getElementById('search_form');
const searchField = document.getElementById('search_keyword');
const responseContainer = document.getElementById('responseContainer');:
let serchedForText;

form.addEvenetListener('submit', function(evnt) {
  evnt.preventDefault();
  responseContainer.innerHTML = '';
  serchedForText = searchField.value;
  getNews();
});


function getNews(){
  const articleRequest = new  XMLHttpRequest();
  articleRequest.open('GET', 'https://api.nytimes.com/svc/serach/v2/articleserach.json?q=${serachForText}&api-key-d8325d2865a64b4b8cae1d99e28fdca1');
}