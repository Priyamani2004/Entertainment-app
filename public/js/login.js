$(".clicklogin").click(function(){
    $("#signupdiv").hide();
    $("#logindiv").css('display','grid');
});

$(".clicksignup").click(function(){
    $("#signupdiv").css('display','grid');
    $("#logindiv").hide();
});


    let emailvalue=document.getElementById("emailid");
    let password1=document.getElementById("password1");
    let password2=document.getElementById("password2");
    let firstele=document.getElementById("ptag1");
    let secondele=document.getElementById("ptag2");
    let thirdele=document.getElementById("ptag3");
    let mismatchele=document.getElementById("ptag4");
    let mismatchemail=document.getElementById("ptag5");
    let enteremail=document.getElementById('enteremail');
    let setemail=document.getElementById("ptag6");
    let checkemail=document.getElementById("ptag7");

function createlogin(){
  if(enteremail.value.trim()==''){
    setemail.style.display="block";
    enteremail.style.borderBottom="1px solid #FC4747";
}
else{
    setemail.style.display="none";
    enteremail.style.borderBottom="1px solid #FFFFFF"; 
}
if(enteremail.value.trim()!=''){
    dbFetch(2);
}
  }

//check signup form validation//
function checkvalues(){
    if(emailvalue.value.trim()==''){
        firstele.style.display="block";
        emailvalue.style.borderBottom="1px solid #FC4747";
    }
    else{
        firstele.style.display="none";
        emailvalue.style.borderBottom="1px solid #FFFFFF"; 
    }
    if(password1.value.trim()==''){
        secondele.style.display="block";
        password1.style.borderBottom="1px solid #FC4747";
    }
    else{
        secondele.style.display="none"; 
        password2.style.borderBottom="1px solid #FFFFFF"; 
    }
    if(password2.value.trim()==''){
       thirdele.style.display="block";
       password2.style.borderBottom="1px solid #FC4747";
    }
    else{
       thirdele.style.display="none"; 
       password2.style.borderBottom="1px solid #FFFFFF" 
    }
    if(password1.value.trim()!=password2.value.trim()){
        mismatchele.style.display="block";
    }
    else{
        mismatchele.style.display="none"; 
    }
    let emailadd=emailvalue.value;
    const emailcheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailcheck.test(emailadd)==false && emailadd!=""){
        mismatchemail.style.display="block";
        mismatchemail.innerText ="Enter the valid email";
    }
    else{
        mismatchemail.style.display="none";  
    }
    if(emailvalue.value.trim()!=''&& emailcheck.test(emailadd)==true && password1.value.trim()!='' && password2.value.trim()!='' && password1.value.trim()==password2.value.trim()){
        dbFetch(1);
    }
}

const dbFetch = async(num) => {
    await fetch('renderpage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: 'John Doe' })
      })
      .then((response) => {return response.json()})
      .then((data) => {
         if(num==1){
            checkdbvalues(data);
         }
         else if(num==2){
            checklogin(data)
         }
         
      })  
}

//login function//
function checklogin(data){
 let emailaddress=enteremail.value.trim();
 let username={
    email:emailaddress
 }
 let count=0;
 for(let i=0; i<data.length; i++){
    let dbusers=data[i].useremail.toUpperCase().trim();
    if(emailaddress.toUpperCase().trim()==dbusers){
        localStorage.setItem('email',JSON.stringify(emailaddress));
        showbookmarks(username);
    }
    else{
      count++
      if(count==data.length){
        checkemail.style.display="block";
      }
    }
 }
}

//show bookmarks//
function showbookmarks(useremail){
    fetch('showbookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(useremail)
      }) 
      .then((response) => {return response.json()})
      .then((data) => {
        window.location.href='/index';
        history.pushState(null, null, '/index');
      })  

}

function checkdbvalues(data){
    let useremail=emailvalue.value;
    let count=0
     for(let i=0; i<data.length; i++){
       let email= data[i].useremail;
       if(email.toUpperCase().trim()==useremail.toUpperCase().trim()){
           mismatchemail.style.display="block";
           mismatchemail.innerText="This Email has been already taken";
       }
       else{
          count++
          if(count==data.length){  
            localStorage.setItem('email',JSON.stringify(useremail));
            let data = {
                email:emailvalue.value.trim() ,
                password:password1.value.trim()
            };
            bushvalues(data);
          }
       }
     }
}

const bushvalues = (data) => {
     fetch('pushvalues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response) => {return response.json()})
      .then((data) => {
         window.location.href='/index';
         history.pushState(null, null, '/index');
      })   
}


emailvalue.onkeyup=inputchanges;
password1.onkeyup=inputchanges;
password2.onkeyup=inputchanges;

function inputchanges(event){
    let inputelement=event.target;
    emailvalue.style.borderBottom="1px solid #FFFFFF"; 
    password1.style.borderBottom="1px solid #FFFFFF"; 
    password2.style.borderBottom="1px solid #FFFFFF"; 
    firstele.style.display="none";
    secondele.style.display="none"; 
    thirdele.style.display="none";
    mismatchele.style.display="none";
    mismatchemail.style.display="none";
}