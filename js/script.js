var interval;
function datesDif(){
    var date=new Date(2018,1,19,0,0)
    var today=new Date()
    var days=0
    var hours=0
    var minutes=0
    var seconds=0

    var diference=(date-today)/1000
    
    if (diference <= 0){
        diference = 0;
        clearInterval(interval);
    }
    
    days=Math.floor((diference/86400))
    diference=diference-(86400*days)
    hours=Math.floor(diference/3600)
    diference=diference-(3600*hours)
    minutes=Math.floor(diference/60)
    diference=diference-(60*minutes)
    seconds=Math.floor(diference)
    
    if(hours <10 ){
        hours = "0" + hours;
    }
    if(minutes <10 ){
        minutes = "0" + minutes;
    }
    if(seconds <10 ){
        seconds = "0" + seconds;
    }
    document.getElementById("days").innerHTML=days;
    document.getElementById("hours").innerHTML=hours;
    document.getElementById("minutes").innerHTML=minutes;
    document.getElementById("seconds").innerHTML=seconds;
    
    
};
document.addEventListener("DOMContentLoaded", function() {
    interval = setInterval(datesDif,1000);
});
