let videoarray=['/assets/beyondearth.mp4','/assets/bottom gear.mp4','/assets/Undiscovered Cities.mp4','/assets/1998.mp4','/assets/car.mp4','/assets/direy.mp4','/assets/untouch.mp4','/assets/no land.mp4','/assets/Animal.mp4','/assets/AutoSport.mp4','/assets/sameAnswer.mp4','/assets/echo.mp4','/assets/rockies.mp4','/assets/rentlesss.mp4','/assets/community.mp4','/assets/vanlife.mp4','/assets/theheiress.mp4','/assets/truck.mp4','/assets/hills.mp4','/assets/1998.mp4','/assets/loanheart.mp4','/assets/production.mp4','/assets/dog.mp4','/assets/asia.mp4','/assets/car.mp4','/assets/dark.mp4','/assets/unsolved.mp4','/assets/mission.mp4','/assets/no land.mp4'];
console.log(videoarray.length);
var video = document.createElement('video');
function playvideo(id){
let homecontainer=document.getElementById("videodiv");
console.log(id.value);
console.log(videoarray[id.value])
video.src =videoarray[id.value];
video.controls = true;
homecontainer.appendChild(video)
video.play()
}

$(".startbtn").click(function(){
    $("#homecontainer").css("overflow-y","hidden");
    $("#opaciti").css("display","grid");
    playvideo(this);
})

$(".icon").click(function(){
    $("#opaciti").css("display","none"); 
    video.pause();
    $("#homecontainer").css("overflow-y","scroll");
})

const currentPageUrl = window.location.href;
console.log(currentPageUrl)
 if(currentPageUrl==='http://localhost:5149/home'){
    history.pushState(null, null, "home");
    window.addEventListener('popstate', function() {
    history.pushState(null, null, "home");
    });
    console.log("selva")
 }

 if(currentPageUrl==='http://localhost:5149/index'){
    history.pushState(null, null, "home");
    window.addEventListener('popstate', function() {
    history.pushState(null, null, "home");
    });
    console.log("mani")
 }


