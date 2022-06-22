let div,all;
var disneyChars = [];
var copyDisneyChar = [];

//fetch all movie titles
async function getTopMovies(){
    let response = await fetch('https://imdb-api.com/en/API/Top250Movies/k_3lrya3ke', {
                  method: 'GET',
                  mode: 'cors',
                  headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json',
                  }})
    
      let allchars = await response.json();
      return allchars;
  }
  getTopMovies().then(resp =>{
    
    disneyChars = resp.items
    copyDisneyChar = resp.items;
    
    displayPageNav(10)

    displayItems(1, perPage)
  })
  .catch(error =>{
    console.log('Oops,Something Went Wrong '+error)
  })

//search char by name
function searchEvent(){
    var text = document.getElementById('eventSearch');
    if(text.value != '' && text.value.trim()){
        //search this event
        disneyChars = this.copyDisneyChar.filter((item) => {
            return (item.title.toLowerCase().indexOf(text.value.toLowerCase()) > -1)
          })
          var temp = document.querySelector('.newcss');
          temp.innerHTML = ''; 
          displayChars();
          displayPageNav(10);
    }
    else
    {
        var temp = document.querySelector('.newcss');
        temp.innerHTML = ''; 
        disneyChars = copyDisneyChar;
        displayPageNav(10);
        displayChars();
    }
}

//creating array of movies card in dom
function displayChars(){
  html = disneyChars.map(item => 
    `<div class='card-content'><h3>Movie Title : ${item.title}</h3><div class='info'><img src="${item.image}" width="100" height="100"/>
    <br><p>Cast : ${item.crew}</p>
   </div><p>Release Year : ${item.year}</p>
   <p>IMDB Rating : ${item.imDbRating}/10</p></div>` )

  document.querySelector('.newcss').innerHTML = html.join('')
}

var index = 1,offSet;
var disneyChars;var html,pages;
//display pagination as per data
const displayPageNav = perPage => {
  
  let pagination =``
  const totalItems = copyDisneyChar.length
  perPage = perPage ? perPage : 1
   pages = Math.ceil(totalItems/perPage);
  pagination += `<a href="#"  onClick="displayItems(1,10)">First</a>`
  if(index == 1){
    pagination += `<a href="#" disabled class='ci-disable' onClick="displayItems(${index},${perPage})">Prev</a>`
  }
  else
  {
    pagination += `<a href="#" onClick="showNextorPrev(${index},${perPage},'prev')">Prev</a>`
  }
  
  if(index >=  copyDisneyChar.length/perPage){
    pagination += `<a href="#" disabled class='ci-disable' onClick="displayItems(${index},${perPage})">Next</a>`
  }
  else
  {
    pagination += `<a href="#" onClick="showNextorPrev(${index},${perPage},'next')">Next</a>`
  }
  pagination += `<a href="#"  onClick="displayItems(${pages},10)">Last</a>`
  document.getElementById('buttons').innerHTML = pagination
  
}

//next or prev function
const showNextorPrev = (page,noofrows,opt) => {
  if(opt == 'prev'){
    index--;
    let pagedata = (page - 1 ) * noofrows - noofrows;
    let offnewset = pagedata + noofrows;
    disneyChars = copyDisneyChar.slice(pagedata, offnewset)
  }
  else
  {
    if(index < noofrows){}
    index++;
    let pagedata = (page + 1 ) * noofrows - noofrows;
    let newoffset = pagedata + noofrows;
    disneyChars = copyDisneyChar.slice(pagedata, newoffset)
  }
  displayPageNav(10);
  displayChars()
}

//display all card in dom
const displayItems = ( page = 1, perPage = 2 ) => {
  
  
  
  if(page == 1 || page <=0)  {
    index = page
    offSet = perPage
    disneyChars = copyDisneyChar.slice(0, offSet)
  } else if(page > copyDisneyChar.length) {
    index = page - 1
    offSet = copyDisneyChar.length
  } else {
    index = page;
    let strtindex = page * perPage - perPage
    offSet = strtindex + perPage
    disneyChars = copyDisneyChar.slice(strtindex, offSet)
  }
  
  
  displayChars()
  displayPageNav(10)
  
}

let perPage = 10
