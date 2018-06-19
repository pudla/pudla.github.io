root = 'https://virtual.udla.edu.co:444/Webapi/backend/web/index.php/',
route = {
    user:{
        login: `${root}user/login`,
        create: `${root}user/create`,
        ranking: `${root}user/ranking`,
        updpass: `${root}user/password`,
        upddata: `${root}user/update`,
        search: `${root}user/search`,
        activate: `${root}user/activate`
    }, 
    match:{
        search: `${root}match/search`,
        alls: `${root}match/alls`
    },
    votation:{
        create: `${root}votation/create`
    }
}

sStore = {
    key: 'sesion_pudla',
    set: function() {
       var cur = { 
                Document: $("#contactDocument")[0].value,
                Username: $("#contactUsername")[0].value,
                Firstname: $("#contactFirstname")[0].value,
                Lastname: $("#contactLastname")[0].value,
                Phone: $("#contactPhone")[0].value,
                Email: $("#contactEmail")[0].value,
                Points: $('#TotalPoints')[0].innerHTML,
                State: ($('#UserAccountState')[0].innerHTML == 'Activada')?'A':'D',
                Lenght: sessionStorage.Lenght
        };  
       sessionStorage.setItem(sStore.key, JSON.stringify(cur));
    },
    destroy: function (){
        sessionStorage.setItem("Lenght", sesion_pudla.Lenght);
        sessionStorage.removeItem(sStore.key);
    },
    get: function() {
        return JSON.parse(sessionStorage.getItem(sStore.key));
        
    }
 }
