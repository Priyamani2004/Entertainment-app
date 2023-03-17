
let name="";
let searchinput=document.getElementById("searchitem");
let changeptag=document.getElementById("trendheads");

function moviepictures(element,movie){
let inputval=document.getElementById("searchitem");
inputval.value="";
let parantele=element.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].childNodes[1].childNodes[1].childNodes;
console.log(parantele);
let trenddiv=parantele[3].childNodes;
console.log(trenddiv);
let moviediv=parantele[3].nextElementSibling.childNodes[3].childNodes;
let changename=parantele[3].nextElementSibling.childNodes[1];
if(movie==" Movie"){
    changename.innerText="Movies";
    searchinput.placeholder="Search for movies";
}
else{
    changename.innerText="TV Series";
    searchinput.placeholder="Search for TV series"
}
for(let i=1; i<trenddiv.length; i++){
    let getname=trenddiv[i].childNodes[1].childNodes[5].childNodes[3].textContent;
    if(movie==" Movie"){  
    if(getname!=movie){
        trenddiv[i].style.display="none"; 
    }
    else{
        trenddiv[i].style.display="grid";  
    } 
}

else{
    if(getname!=movie){
        trenddiv[i].style.display="none"; 
    } 
    else{
        trenddiv[i].style.display="grid";  
    } 
}
    i++
}

 for(let j=1; j<moviediv.length; j++){
 let getfieldname=moviediv[j].childNodes[3].childNodes[1].childNodes[3].textContent;
 if(movie==" Movie"){ 
    if(getfieldname!=movie){
        moviediv[j].style.display="none"; 
    }
    else{
        moviediv[j].style.display="grid";  
    } 
 }

if(movie==" TV Series"){
    if(getfieldname!=movie){
        moviediv[j].style.display="none"; 
    }
    else{
        moviediv[j].style.display="grid";  
    }  
}
 j++
 }
}

function allpictures(){
let inputval=document.getElementById("searchitem");
inputval.value="";
let searchinput=document.getElementById("searchitem");
searchinput.placeholder="Search for movies or TV series"
changeptag.innerText="Recommended for you";
let gettrends=document.getElementById("trending").childNodes;
console.log(gettrends.length);
for(let i=1; i<gettrends.length; i++){
    gettrends[i].style.display="grid";
    i++
}
let getallpic=document.getElementById("allpictures").childNodes;
for(let i=1; i<getallpic.length; i++){
    getallpic[i].style.display="grid";
    i++
}
}

//allpictures();

function filteringimg(){
    let name;
    let hiding;
    let searchinput=document.getElementById("searchitem");
    if(searchinput.placeholder=="Search for movies"){
    name=" Movie";
    filterlist(name);
    }
    if(searchinput.placeholder=="Search for TV series"){
        name=" TV Series";
        filterlist(name);
     }
     if(searchinput.placeholder=="Search for movies or TV series"){
        let movienames=document.querySelectorAll(".title");
        name="Recommended for you";
        let inputval=document.getElementById("searchitem").value.toUpperCase();
        for(let i=0; i<movienames.length; i++){
             let naming=movienames[i].innerText.toUpperCase();
            if(naming.indexOf(inputval)>-1){
                movienames[i].parentNode.parentNode.parentNode.style.display="grid";
              } 
              else{
                 movienames[i].parentNode.parentNode.parentNode.style.display="none";
             
            }
        }
        showthemes(name);
     }
    }


function filterlist(name){
    let movienames=document.querySelectorAll(".title"); 
    let inputval=document.getElementById("searchitem").value.toUpperCase();
    for(let i=0; i<movienames.length; i++){
        let textname=movienames[i].parentNode.previousElementSibling.childNodes[3].textContent;
        if(textname==name){
            let naming=movienames[i].innerText.toUpperCase();
        if(naming.indexOf(inputval)>-1){
            movienames[i].parentNode.parentNode.parentNode.style.display="grid";
          } 
          else{
             movienames[i].parentNode.parentNode.parentNode.style.display="none";
         }

        }
    }
    showthemes(name)
}

function showthemes(name){
    let count=0;
    let movienames=document.querySelectorAll(".title"); 
    let changetheme=document.getElementById("trendptag");
    let hidetheme=document.getElementById("trendheads");
    for(let i=0; i<movienames.length; i++){
        if( movienames[i].parentNode.parentNode.parentNode.style.display=="none"){
           count++
           if(count==movienames.length){
            changetheme.innerText="No Search Result";
            hidetheme.innerText="";
           }
           else{
            changetheme.innerText="Trending";
            hidetheme.innerText=name;
           }
        }
    }
}

//bookmark icon function//
function bookmarkmovie(){
    let allelements=document.querySelectorAll('.bookmarkdiv');
    console.log((allelements[0].childNodes[3].parentNode.parentNode.parentNode));
    for(let i=0; i<allelements.length; i++){
    if (allelements[i].childNodes[3].style.backgroundImage!=='url("/assets/icon-bookmark-full.svg")') {
        allelements[i].childNodes[3].parentNode.parentNode.parentNode.style.display="none";
    } 
    else{
        allelements[i].childNodes[3].parentNode.parentNode.parentNode.style.display="grid";
 
    }
 }
 searchinput.placeholder="Search for bookmarked shows";
 changeptag.innerText="Bookmarked Movies TV Series";
}

function addbookmark(element){
    let title=element.parentNode.childNodes[1].childNodes[1].innerText;
    console.log(title)
    //let useremail=element.parentNode.childNodes[1].childNodes[3].innerText;
    let useremail=localStorage.getItem('email');
    //console.log()
    console.log(useremail);
    let datas={
        title:title,
        username:useremail
       
    }
    console.log(datas);
   if(!element.classList.contains('addbookmark')){
    element.classList.add('addbookmark');
    element.style.backgroundImage='url("/assets/icon-bookmark-full.svg")'; 
    console.log(title);
    setbookmark(datas);
   }
   else{
    element.classList.remove('addbookmark');
    element.style.backgroundImage='url("/assets/icon-bookmark-empty.svg")';
     removebookmark(datas)
   }
}

//click bookmark//
function setbookmark(title) {
    fetch('setbookmark', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(title)
     })   
    }

//bookmark remove//
function removebookmark(datas){
    fetch('removebookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datas)
      }) 
}

//bookmark show function//
function bookmarks(){
    let username={
      email:localStorage.getItem('email')
    }
     fetch('bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(username)
      }) 
      .then((response)=>{
        return response.json();
      })
      .then((data)=>{
        localStorage.setItem('bookmarks',JSON.stringify(data))
      })
      setTimeout(createbookmarks, 500);
}

function createbookmarks(){
 let items=localStorage.getItem('bookmarks');
 let data=JSON.parse(items)
 let allelements=document.querySelectorAll('.bookmarkdiv');
 let picture=allelements[1].childNodes[3];  
 for(let i=0; i<data.length; i++){
    for(let j=0; j<allelements.length; j++){
        let title=allelements[j].childNodes[1].childNodes[1].innerText.trim();
        if(data[i].useremail.trim()==title){
          let element=allelements[j].childNodes[3];
          let picture=element.style.backgroundImage ='url("/assets/icon-bookmark-full.svg")'; 
          element.classList.add('addbookmark');
        }
    }
 }
}

//set icons color//
let previouspic=["/assets/icon-nav-movies.svg","/assets/icon-nav-tv-series.svg","/assets/icon-nav-bookmark.svg"];
let currentpic=["/assets/icon-category-movie.svg","/assets/icon-category-tv.svg","/assets/icon-bookmark-full.svg"];
function changepic(ele,num){
let icon=document.getElementById("fonticon");
let elements=document.querySelectorAll(".sideimg");
console.log(ele)
ele.setAttribute("src", currentpic[num]);
if(num==3){
    icon.style.color="white";
}
else{
    icon.style.color="#5A698F";
}
for(let i=0; i<elements.length; i++){
    if(num==i){
        elements[i].setAttribute("src", currentpic[i]); 
    }
    else{
        elements[i].setAttribute("src", previouspic[i]);    
    }
}
}

bookmarks();




