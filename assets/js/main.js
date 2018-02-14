
const $responseContainer = $('#response_container');
const $searchBtn = $('#search_btn');
const $searchKeyword = $('#textarea1');
let $searchForText;
const $myPost = $('#myPost');
const $pro = $('#pro');
const $header = $('#titleMargin');


$searchBtn.click(function(evnt) {
  evnt.preventDefault();
  $searchKeyword.html('');
  $searchForText = $searchKeyword.val();
  console.log($searchForText);
  getNews();
});


function getNews() {
  $.ajax({
  	url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${$searchForText}&api-key=d8325d2865a64b4b8cae1d99e28fdca1`,
  }).done(addNews)
	 .fail(handleError);
	  /* .status(showPro);*/
}

/* function showPro() { 
  	while (this.status !== 200) {
    $pro.removeClass('hide');  
    break;  
  }
}*/
function handleError() {
  console.log('Se ha presentado un error');
}

function addNews(news) {
  console.log(news);
  // $pro.addClass('hide');  
  // $header.removeClass('titleMargin');
  // acedemos a la propiedad .response de data
  // const response = data.response;
  // console.log(response);
  const docs = news.response.docs;
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
  
  	$myPost.append(


      '<div class="col s4">' +
      '<div class="card">' +
	'<div class="card-image waves-effect waves-block waves-light">' +
	'<img class="activator" src="' + `${imgLink}` + '">' +
	'</div>' +
	'<div class="card-content">' +
	'<span class="card-title activator grey-text text-darken-4 titlecss">' + `${title}` + '<i class="material-icons right">more_vert</i></span>' +
	' <p><a href="' + `${link}` + ' target=_blank">See More..</a></p>' +
	'</div>' +
	'<div class="card-reveal  gray-text">' +
	'<span class="card-title grey-text text-darken-4">' + `${title}` + '<i class="material-icons right">close</i></span>' +
	'<p class="gray-text text-darken-4 light">' + `${snippet}` + '</p>' +
	'<p class="card-title grey-text text-darken-4">' + `${kicker}` + '</p>' +
	' </div></div></div>'
  		);
  }
}