$(document).ready(()=>{
    if (localStorage.getItem("x-access-token") && localStorage.getItem("usuario")){
        if(location.href=="http://localhost:4200/"){
            location.href='/home';
        }
    }else{
        if(location.href!="http://localhost:4200/"){
            location.href='/';
        }
    }
});