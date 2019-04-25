let lat;
let long;
var temp;
var icon;
var temraurElement= document.querySelector(".temprature");
var timezoneElement= document.querySelector(".TimeZone");
var currentlyElement= document.querySelector(".currently");
var tempUnitElement = document.querySelector(".tempUnit");
var HiconeElement= document.querySelector(".Hicone");
var HtempElement= document.querySelector(".Htemp");
var HsumElement= document.querySelector(".Hsum");


window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(ShowPosition);
    }
 
    function ShowPosition(position){
        lat= position.coords.latitude;
        long= position.coords.longitude; 
        const proxy= 'https://cors-anywhere.herokuapp.com/';
        const api= `${proxy}https://api.darksky.net/forecast/023e7b478d2a5907d4b2acccc62d4437/${lat},${long}`;
        console.log(api);
        fetch(api)
         .then(response =>{
            return response.json();
         })
          .then(data =>{
            console.log(data);
            temp= data.currently.temperature;
            var summary= data.currently.summary;
            var timez= data.timezone;
            icon=data.currently.icon;
            //set Dom Element
            currentlyElement.innerHTML= summary;
            temraurElement.innerHTML= temp;
            timezoneElement.innerHTML= timez; 
            changeIcon(icon, document.querySelector(".icon"));

           //Houry Detail
          //  changeIcon(data.hourly.data[0].icon, HiconeElement);
           HtempElement.innerHTML=data.hourly.data[0].temperature;
           HsumElement.innerHTML=data.hourly.data[0].summary;

          }); 
      
    }
    function changeIcon(icon,iconId){
      var skycons = new Skycons({"color": "white"});
      var currentIcon= icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconId,Skycons[currentIcon]);
    }
});
function myFunction(){
  var convert= Math.floor(( (temp - 32) * (5/9) )) ;
  console.log(convert);
  temraurElement.innerHTML= convert;
  tempUnitElement.innerHTML= "C";
} 

/* tabbed menue---------------------------------------------- */

function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

