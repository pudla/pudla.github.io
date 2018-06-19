/*

Style   : MobApp Script JS
Version : 1.0
Author  : Surjith S M
URI     : https://surjithctly.in/

Copyright © All rights Reserved 

*/

$(function () {

    /* Init My Rules */
    function isLogin() {
        sesion_pudla = sStore.get();
        if (sesion_pudla) {
            $('#UserAccountState')[0].innerHTML = (sesion_pudla.State == 'A') ? 'Activada' : 'Desactivada';
            $('#UserAccountState')[0].style.color = (sesion_pudla.State == 'A') ? "#4CAF50" : "#F44336";
            (sesion_pudla.State == 'A') ? $('.img-holder .img-fluid')[0].style['mix-blend-mode'] = 'normal' : $('.img-holder .img-fluid')[0].style['mix-blend-mode'] = 'multiply';
            $('.img-holder .img-fluid')[0].style['visibility'] = 'visible';
            document.title = sesion_pudla.Username + " - Polla Mundialista Uniamazonia";
            $('#UserName')[0].innerHTML = "Hola, " + sesion_pudla.Firstname + " " + sesion_pudla.Lastname;
            CreEl();
            function CloseS() {
                //sessionStorage.removeItem("sesion_pudla"); 
                sStore.destroy();
                document.location.replace('../index.html');
            }
            $('#CloseSession').click(CloseS);
            return 1;
        } else {
            document.location.replace('../index.html');
        }
    }

    function Refresh() {
        sStore.destroy();
        sStore.set();
        sesion_pudla = sStore.get();
        $('#UserName')[0].innerHTML = "Hola, " + sesion_pudla.Firstname + " " + sesion_pudla.Lastname;
        PassNull();
    }

    function PassNull() {
        $('#contactPasswordo')[0].value = '';
        $('#contactPassword')[0].value = '';
        $('#contactPasswordc')[0].value = '';
        $('#contactPasswordr')[0].value = '';
    }

    function DateFormat() {
        var date = arguments[0];
        var dateF = '';
        var Months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        switch (arguments[1]) {
            case 'time':
                dateF = date.substr(11, 5);
                break;
            case 'date':
                dateF = Dia(date.substr(0, 10)) + " " + date.substr(8, 2) + " de " + Months[parseInt(date.substr(6, 2)) - 1] + ' de ' + parseInt(date.substr(0, 4));
                break;
            case 'early':
                dateF = (date.substr(11, 2) < 12) ? 'AM' : 'PM'
                break;
        }
        return dateF;
    }

    function Dia(date) {
        var arrayWeek = [];
        var date = new Date(date),
            days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            prefixes = ['', 'First', 'Second', 'Third', 'Fourth', 'Fifth'];
        if (date.getDate() % 7 == 0) {
            var prefixes2 = date.getDate() / 7;
        } else {
            var prefixes2 = Math.ceil(date.getDate() / 7);
        }
        arrayWeek.push({
            'dayPos': prefixes[prefixes2],
            'dayName': days[date.getDay()]
        });
        return arrayWeek[0].dayName;
    }

    function Checkeaded() {
        for (var i = 0; i < all; i += 2) {
            if (arguments[0] == js[i].Match_Id) {
                var a = $("#Rag" + arguments[0]).prop("checked");
                var b = $("#Rae" + arguments[0]).prop("checked");
                var c = $("#Rap" + arguments[0]).prop("checked");
                var ans = a ? js[i].Team_Id : (b ? 0 : (c ? js[i + 1].Team_Id : null));
            }
        }
        return ans;
    }

    function DrawMatches(json) {
        js = json;
        all = (json.length);
        MatchVote = [];
        var text = "";
        document.getElementById("Next").innerHTML = '';
        document.getElementById("Matches").innerHTML = '';
        if (all > 1) {
            document.getElementById("InfoNext").style['display'] = 'block';
            for (var i = 0; i < all; i += 2) {
                field = Object.keys(json[i]);
                text += `<div class="card pricing"> 
                                <div class="card-head">
                                    <span id="Stadium">Estadio ${json[i].Stadium} </span>
                                    <br>
                                    <small class="text-primary"> ${DateFormat(json[i].Date, 'date')} </small>
                                    <span class="price">` + DateFormat(json[i].Date, 'time') + `<sub>` + DateFormat(json[i].Date, 'early') + `</sub></span>
                                    </div>
                                    <table id="fixedheight">
                                        <tr>
                                            <td>
                                                <center>
                                                    <img src="flags/` + json[i].Team + `.png" id="flags" oncontextmenu="return false" onkeydown="return false" draggable="false">
                                                    </center>
                                                </td>
                                                <td></td>
                                                <td>
                                                    <center>
                                                        <img src="flags/` + json[i + 1].Team + `.png" id="flags" oncontextmenu="return false" onkeydown="return false" draggable="false" >
                                                        </center>
                                                    </td>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div class="list-group-item"> ${json[i].Team} </div>
                                                        </td>
                                                        <td>
                                                            <center>
                                                                <span class="list-group-item center-item"> Vs</span>
                                                            </center>
                                                        </td>
                                                        <td>
                                                            <div class="list-group-item">` + json[i + 1].Team + `</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <center>
                                                                    <span class="label-match">Gana</span>
                                                                </center>
                                                            </td>
                                                            <td>
                                                                <center>
                                                                    <span class="label-match">Empate</span>
                                                                </center>
                                                            </td>
                                                            <td>
                                                                <center>
                                                                    <span class="label-match">Gana</span>
                                                                </center>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                            <div class="">
                                                                <center>
                                                                <input type="radio" id="Rag${json[i].Match_Id}" name="Match` + json[i].Match_Id + `" ${(json[i].V_Votation_Team == json[i].Team_Id) ? 'checked' : ''}  >
                                                                <label for="Rag` + json[i].Match_Id + `"> </label>
                                                            </div>
                                                        </center>
                                                    </td>
                                                    <td>
                                                        <div class="">
                                                        <center>
                                                                <input type="radio" id="Rae` + json[i].Match_Id + `" name="Match` + json[i].Match_Id + `" ${(json[i].V_Votation_Team == 0) ? 'checked' : ''}  >
                                                                <label for="Rae` + json[i].Match_Id + `"> </label>
                                                        </center>
                                                        </div>
                                                    </td>
                                                    <td>
                                                    <div class="">
                                                        <center>
                                                                <input type="radio" id="Rap` + json[i].Match_Id + `" name="Match` + json[i].Match_Id + `" ${(json[i].V_Votation_Team == json[i + 1].Team_Id) ? 'checked' : ''}  >
                                                                <label for="Rap` + json[i].Match_Id + `"> </label>
                                                        </center>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <div class="card-body">
                                                <a href="" class="btn btn-primary btn-lg btn-block" id="Button${json[i].Match_Id}" >Guardar</a>
                                            </div>

                                            <center><p class="lead phase"> ${ (json[i].Ph_Id == 1) ? json[i].Name + " [ " + json[i].Group + " ]" : json[i].Name}</p></center>
                                        </div>`;

            }
            document.getElementById("Next").innerHTML += `Próximos Partidos (${json.length / 2})`;
            document.getElementById("Matches").innerHTML = text;
            //Fill the Array

            for (var i = 0; i < all; i += 2) {
                MatchVote.push({
                    'id': json[i].V_Id,
                    'username': sesion_pudla.Username,
                    'matchid': json[i].Match_Id,
                    'teamid': json[i].V_Votation_Team
                });

                //Activate buttons Listeners
                document.getElementById(`Button${json[i].Match_Id}`).addEventListener("click", function (evt) {
                    evt.preventDefault();
                    Upd(this.id.split('Button')[1]);
                });

            }

            var $galleryDiv = $('.img-gallery');

            if ($galleryDiv.length && $.fn.owlCarousel) {
                $galleryDiv.owlCarousel({
                    nav: false,
                    center: true,
                    loop: false,
                    autoplay: false,
                    dots: true,
                    mouseDrag: true,
                    touchDrag: true,
                    navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 3
                        }
                    }
                });
            }

        } else {

            if (all > 0) {
                text = msg.blocked;
            } else {
                text = msg.nomatchs;
            }
            document.getElementById("MatchesError").innerHTML = text;
        }
    }


    function DrawResults(bjson) {
        bjs = bjson;
        balls = (bjson.length);
        document.getElementById("ResultsTitle").innerHTML = '';
        document.getElementById("Results").innerHTML = '';
        var text = `<div class="table-head">
                        <div class="serial">No.</div>
                        <div class="country">Equipo 1</div>
                        <div class="country">Equipo 2</div>
                        <div class="visit">Estadio</div>
                        <div class="visit">Ganador</div>
                        <div class="visit">Tu Voto</div>
                        <div class="visits">Fecha</div>
                        <div class="visit">Estado</div>
                        <div class="visitt">Puntos</div>
                    </div>`;
        if (balls > 1) {

            var ri = 0;
            var tp = 0;
            var ph = '';
            for (var i = 0; i < balls; i += 2) {
                field = Object.keys(bjson[i]);
                //First Phases
                if (bjson[i].Name != ph) {
                    ph = bjson[i].Name;
                    text += `<div class="table-row" id="Phase">
                                <div class="serial"> </div>
                                <div class="country"> </div>
                                <div class="country"> </div>
                                <div class="visit"> </div>
                                <div class="visit">${bjson[i].Name}</div>
                                <div class="visit"> </div>
                                <div class="visits"> </div>
                                <div class="visit"> </div>
                                <div class="visitt"> </div>
                            </div>`;
                }
                text += `<div class="table-row" ${(bjson[i].Points > 0) ? 'id="Points"' : (bjson[i].V_Votation_Team
                    != bjson[i].Winner && (bjson[i].Winner != bjson[i].V_Votation_Team && (bjson[i].V_Votation_Team != null && bjson[i].Winner != null) && (bjson[i].V_Votation_Team != null && bjson[i + 1].V_Votation_Team != null))) ? 'id="Miss"' : ''}>
                                <div class="serial">${(ri < 9) ? '0' + (ri + 1) : ri + 1}</div>
                                <div class="country"><img src="flags/${bjson[i].Team}.png" id="flags" oncontextmenu="return false" onkeydown="return false" draggable="false">${bjson[i].Team}</div>
                                <div class="country"><img src="flags/${bjson[i + 1].Team}.png" id="flags" oncontextmenu="return false" onkeydown="return false" draggable="false">${bjson[i + 1].Team}</div>
                                <div class="visit">${bjson[i].Stadium}</div>
                                <div class="visit">${bjson[i].Winner == bjson[i].Team_Id ? bjson[i].Team : (bjson[i].Winner == bjson[i + 1].Team_Id ? bjson[i + 1].Team : (bjson[i].Winner == 0 ? 'Empate' : ''))}</div>
                                <div class="visit">${bjson[i].V_Votation_Team == bjson[i].Team_Id ? bjson[i].Team : (bjson[i].V_Votation_Team == bjson[i + 1].Team_Id ? bjson[i + 1].Team : (bjson[i].V_Votation_Team == 0 ? 'Empate' : ''))}</div>
                                <div class="visits"><span>${DateFormat(bjson[i].Date, 'date')}<br>${DateFormat(bjson[i].Date, 'time')} <sub> ${DateFormat(bjson[i].Date, 'early')}</sub> </span></div>
                                <div class="visit"><i>${(bjson[i].Winner ? 'Terminado' : 'Pendiente')}</i></div>
                                <div class="visitt" ${(i == balls - 2) ? 'id="MyPoints"' : ''}>${bjson[i].Points}</div>
                            </div>
                    `;
                ri++;
                tp += parseInt(bjson[i].Points);
            }
            text += `<div class="table-row" id="SumPoints">
                        <div class="serial"> </div>
                        <div class="country"> </div>
                        <div class="country"> </div>
                        <div class="visit"> </div>
                        <div class="visit"> </div>
                        <div class="visit"> </div>
                        <div class="visits"> </div>
                        <div class="visit">Total</div>
                        <div class="visitt" id="TotalPoints">${tp}</div>
                    </div>`;
            if (tp > 0) {
                document.getElementById("ResultsTitle").innerHTML += `Tus Resultados`;
            } else {
                document.getElementById("ResultsTitle").innerHTML += `Resultados`;
            }
            document.getElementById("Results").innerHTML = text;

        } else {

            document.getElementById("ResultsTitle").innerHTML += `Resultados`;
            document.getElementById("Results").innerHTML = msg.ccc;
        }
    }

    function DrawRanking(rjson) {
        rjs = rjson;
        ralls = (rjson.length);
        document.getElementById("RankingTitle").innerHTML = '';
        document.getElementById("Ranking").innerHTML = '';
        document.getElementById("RankingUnder").innerHTML = '';
        var text = `<div class="table-head">
                        <div class="serial">No.</div>
                        <div class="country">Nombre Completo</div>
                        <div class="visit">Participaciones</div>
                        <div class="visit">Aciertos</div>
                        <div class="visit">Puntos</div>
                    </div>`;
        if (ralls > 1) {

            var ri = 0;
            for (var i = 0; i < ralls; i += 1) {
                field = Object.keys(rjson[i]);
                text += `<div class="table-row" ${(rjson[i].Nombre == sesion_pudla.Firstname + " " + sesion_pudla.Lastname) ? 'id="Points"' : ''}>
                                <div class="serial">${(ri < 9) ? '0' + (ri + 1) : ri + 1}</div>
                                <div class="country">${rjson[i].Nombre}</div>
                                <div class="visit">${rjson[i].Participaciones}</div>
                                <div class="visit"><i>${(parseInt(rjson[i].Aciertos) < 10) ? '0' + (parseInt(rjson[i].Aciertos)) : (parseInt(rjson[i].Aciertos))}</i></div>
                                <div class="visit">${rjson[i].Points}</div>
                            </div>
                    `;
                ri++;
            }

            document.getElementById("RankingTitle").innerHTML += `Ranking de Usuarios`;
            document.getElementById("Ranking").innerHTML += text;
            document.getElementById("RankingUnder").innerHTML = msg.urt;

        } else {

            document.getElementById("RankingTitle").innerHTML += `Ranking de Usuarios`;
            document.getElementById("RankingUnder").innerHTML = msg.ucc;
        }
    }

    function FillUser() {
        $("#contactUsername")[0].value = sesion_pudla.Username;
        $("#contactUsernames")[0].value = sesion_pudla.Username;
        $("#contactDocument")[0].value = sesion_pudla.Document;
        $("#contactFirstname")[0].value = sesion_pudla.Firstname;
        $("#contactLastname")[0].value = sesion_pudla.Lastname;
        $("#contactEmail")[0].value = sesion_pudla.Email;
        $("#contactPhone")[0].value = sesion_pudla.Phone;
    }

    /* Login Form
    * ------------------------------------------------------ */
    var Load = function () {

        if (isLogin()) {

            $.ajax({

                type: "GET",
                url: route.match.search,
                data: { lusername: sesion_pudla.Username },
                dataType: 'json',
                success: function (obj) {
                    //console.log(obj.data)
                    if (obj.data) {
                        DrawMatches(obj.data);
                        Results();
                        Ranking();
                    } else {

                    }

                },
                error: function (e) {
                    //console.log(e)

                },
                // código a ejecutar sin importar si la petición falló o no
                complete: function (xhr, status) {

                }

            });


        }

    };

    /* Login Form
    * ------------------------------------------------------ */
    function Results() {

        $.ajax({

            type: "GET",
            url: route.match.alls,
            data: { lusername: sesion_pudla.Username },
            dataType: 'json',
            success: function (obj) {
                //console.log(obj.data)
                if (obj.data) {
                    DrawResults(obj.data);
                } else {

                }

            },
            error: function (e) {
                //console.log(e)

            },
            // código a ejecutar sin importar si la petición falló o no
            complete: function (xhr, status) {

            }

        });

    };

    /* Login Form
    * ------------------------------------------------------ */
    function Ranking() {

        $.ajax({

            type: "GET",
            url: route.user.ranking,
            data: { lusername: sesion_pudla.Username },
            dataType: 'json',
            success: function (obj) {
                //console.log(obj.data)
                if (obj.data) {
                    DrawRanking(obj.data);
                } else {

                }

            },
            error: function (e) {
                //console.log(e)

            },
            // código a ejecutar sin importar si la petición falló o no
            complete: function (xhr, status) {

            }

        });

    };

    function CreEl() {
        var secp = '';
        var tabu = '';
        secp += `<li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#pass">Cambiar Contraseña</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#profile">Editar Perfil</a>
            </li>`;

        tabu += `<div class="tab-pane fade active show" id= "pass">
            <form name="ChangePass" id="ChangePass" method="post" action="" novalidate="novalidate" autocomplete="off">


                <fieldset>
                    <ul class="list-group list-group-flush" >
                        <h4 class="mb-3">Cambia tu contraseña</h4>
                        <p class="light-font mb-5">Todos los campos son requeridos. El sistema es sensible a las mayúsculas.</p>

                        <center>
                            <input name="username" type="hidden" id="contactUsernames" placeholder="Nombre de usuario" value="" minlength="6" required=""
                                aria-required="false" class="full-width" autocomplete="off">
                        </center>
                        <br>
                        <center>
                            <input name="passwordo" type="password" id="contactPasswordo" placeholder="Contraseña Anterior" value="" minlength="6" required=""
                                aria-required="true" class="full-width" autocomplete="new-password">
                        </center>
                        <br>
                        <center>
                            <input name="password" type="password" id="contactPassword" placeholder="Nueva Contraseña" value="" minlength="6" required=""
                                aria-required="true" class="full-width" autocomplete="off">
                        </center>
                        <br>
                        <center>
                            <input name="passwordn" type="password" id="contactPasswordc" placeholder="Confirmar Contraseña" value="" minlength="6" required=""
                                aria-required="true" class="full-width" autocomplete="off">
                        </center>
                        <p></p>


                    </ul>
                </fieldset>
                <div class="card-body">
                    <button class="btn btn-primary btn-lg btn-block" id="PassChange">Cambiar</button>
                </div>

            </form>

        </div>


        <div class="tab-pane fade" id="profile">
            <form name="UpdUserData" id="UpdUserData" method="post" action="" novalidate="novalidate" autocomplete="off">
                <fieldset>
                    <ul class="list-group list-group-flush">
                        <h4 class="mb-3">Actualiza tus datos personales</h4>
                        <p class="light-font mb-5">Todos los campos son requeridos. Ingresa datos válidos, dado que en caso de que ganes, deberás
                            comprobar tu indentidad.</p>

                        <center>
                            <input name="document" type="text" id="contactDocument" placeholder="Documento de Identidad" value="" minlength="7" required=""
                                aria-required="true" class="full-width" autocomplete="off">
                        </center>
                        <br>
                        <center>
                            <input name="username" type="hidden" id="contactUsername" placeholder="Nombre de usuario" value="" minlength="6" required=""
                                aria-required="false" class="full-width" autocomplete="off">
                        </center>
                        <br>
                        <center>
                            <input name="firstname" type="text" id="contactFirstname" placeholder="Nombres" value="" minlength="3" required="" aria-required="true"
                                class="full-width" autocomplete="off">
                        </center>
                        <br>
                        <center>
                            <input name="lastname" type="text" id="contactLastname" placeholder="Apellidos" value="" minlength="3" required="" aria-required="true"
                                class="full-width" autocomplete="off">
                        </center>
                        <br>
                        <center>
                            <input name="email" type="text" id="contactEmail" placeholder="Correo Electrónico" value="" minlength="3" required="" aria-required="true"
                                class="full-width" autocomplete="off">
                        </center>
                        <br>
                        <center>
                            <input name="phone" type="text" id="contactPhone" placeholder="Teléfono" value="" minlength="5" required="" aria-required="true"
                                class="full-width" autocomplete="off">
                        </center>
                        <br>
                        <center>
                            <h4 class="mb-3">Para almacenar tus datos, necesitamos validar que eres tú.</h4>
                            <input name="password" type="password" id="contactPasswordr" placeholder="Contraseña" value="" minlength="6" required=""
                                aria-required="true" class="full-width" autocomplete="new-password">
                        </center>
                        <p></p>


                    </ul>
                </fieldset>
                <div class="card-body">
                    <button class="btn btn-primary btn-lg btn-block" id= "UpdDater" >Actualizar</button>
                </div>

            </form>
        </div>`;
        if (sesion_pudla.Lenght == 1) {
            secp += `<li class="nav-item" id="Lenght${sesion_pudla.lenght}">
                    <a class="nav-link" data-toggle="tab" href="#users">Gestionar Usuarios</a>
                </li>`;
            tabu += `<div class="tab-pane fade" id="users">
                <form name="SearchsUsers" id="SearchsUsers" method="post" action="" novalidate="novalidate" autocomplete="off">


                    <fieldset>
                        <ul class="list-group list-group-flush">
                            <h4 class="mb-3">Activa o desactiva la cuenta de un Usuarios</h4>
                            <p class="light-font">Por favor ingrese algún criterio de busqueda como: usuario, nombre, teléfono o correo electrónico.
                                Después pulse en buscar. Active</p>

                            <br>
                            <input name="argument" type="text" id="contactSearch" placeholder="Criterio de Busqueda" value="" minlength="3" required="" aria-required="true"
                                class="full-width" autocomplete="off">
                            <br>
                            
                            </fieldset>   
                            <div class="card-body">
                                <button class="btn btn-primary btn-lg btn-block" id="SearcherUs"> Buscar</button>
                            </div>
                            <br>
                            <br>
                </form> 

                <form name="Updater" id="Updater" method="post" action="" novalidate="novalidate" autocomplete="off">
                    <fieldset>
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <h4 class="mb-3">Desactivado</h4>
                                        </th>
                                        <th>
                                            <h4 class="mb-3">Activado</h4>
                                        </th>
                                        <th>
                                            <h4 class="mb-3">
                                                <center>Usuario Consultado</center>
                                            </h4>
                                        </th>
                                        <th>
                                            <h4 class="mb-3">
                                                <center>Actualizar</center>
                                            </h4>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <input type="radio" id="uschD" name="state">
                                            <label for="uschD" style="padding-left: 2.0rem;">&nbsp;</label>
                                        </td>
                                        <td>
                                            <input type="radio" id="uschA" name="state">
                                            <label for="uschA" style="padding-left: 2.0rem;">&nbsp;</label>
                                        </td>
                                        </td>
                                        <td>
                                            <input name="username" type="text" id="contactPerson" placeholder="" required="" aria-required="true" class="full-width"
                                                disabled="">
                                            <center>
                                                <input name="autorized" type="hidden" id="contactUpdUsername"  value="" minlength="6" required=""
                                aria-required="false" class="full-width" >
                                                </center>
                                        </td>
                                        </fieldset>
                                        <td>
                                            <div class="card-body">
                                                <button class="btn btn-primary btn-lg btn-block" id="Setter">Aplicar</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p></p>

                        </ul>
                
                </form>
            </div>`;
        }
        document.getElementById("SecPro").innerHTML = secp;
        document.getElementById("UsAc").innerHTML = tabu;

        if (sesion_pudla.Lenght == 1) {
            $("#contactUpdUsername")[0].value = sesion_pudla.Username;
        }
        $('#PassChange').click(ChangePassForm);
        $('#UpdDater').click(UpdUserDataForm);
        $('#SearcherUs').click(FindForm);
        $('#Setter').click(UpdStateForm);
        FillUser();
    }



    var FindForm = function () {
        /* local validation */
        $('#SearchsUsers').validate({

            /* submit via ajax */
            submitHandler: function (form) {


                $.ajax({

                    type: "GET",
                    url: route.user.search,
                    data: $(form).serialize(),
                    success: function (obj) {

                        // Message was sent
                        if (obj.data) {
                            console.log(obj.data)
                            $("#contactPerson")[0].value = obj.data.Username;
                            if (obj.data.State == 'A') {
                                $('#uschA').click();
                            } else {
                                $('#uschD').click();
                            }
                        }
                        // There was an error
                        else {
                            document.getElementById("MessageMistake").innerHTML = msg.faildata;
                            MinimizeMenssages("#Mistake");
                        }

                    },
                    error: function (e) {
                        //console.log(e)
                        document.getElementById("MessageMistake").innerHTML = msg.internet;
                        MinimizeMenssages("#Mistake");
                    }

                });

            }

        });
    }

    function Checkeaded2() {
        var a = $("#uschA").prop("checked");
        var b = $("#uschD").prop("checked");
        var ans = a ? 'A' : (b ? 'D' : null);

        return ans;
    }

    var UpdStateForm = function () {
        /* local validation */
        $('#Updater').validate({
            /* submit via ajax */
            submitHandler: function (form) {

                ss = Checkeaded2();

                $.ajax({

                    type: "POST",
                    url: route.user.activate,
                    data: { username: $("#contactPerson")[0].value, state: ss, autorized: sesion_pudla.Username },
                    success: function (obj) {

                        // Message was sent
                        if (obj.data) {
                            document.getElementById("MessageSuccess").innerHTML = msg.userupdated;
                            MinimizeMenssages("#Success");
                        }
                        // There was an error
                        else {
                            document.getElementById("MessageMistake").innerHTML = msg.faildata;
                            MinimizeMenssages("#Mistake");
                        }

                    },
                    error: function (e) {
                        //console.log(e)
                        document.getElementById("MessageMistake").innerHTML = msg.internet;
                        MinimizeMenssages("#Mistake");
                    }

                });

            }

        });
    }

    function Upd() {
        var newVote = 0;
        for (var ir = 0; ir < all / 2; ir++) {
            if (arguments[0] == MatchVote[ir].matchid) {
                MatchVote[ir].id = (!MatchVote[ir].id) ? -1 : MatchVote[ir].id;
                MatchVote[ir].teamid = Checkeaded(MatchVote[ir].matchid);
                if (MatchVote[ir].teamid != null) {
                    $.ajax({
                        type: "POST",
                        url: route.votation.create,
                        data: MatchVote[ir],
                        dataType: 'json',
                        success: function (obj) {

                            if (obj.data && obj.data[0].data != 0) {
                                if (MatchVote[ir - 1].id == -1) {
                                    MatchVote[ir - 1].id = obj.data[0].data;
                                }
                                //Reload
                                Results();
                                Ranking();
                                document.getElementById("MessageSuccess").innerHTML = msg.voteok;
                                MinimizeMenssages("#Success");

                            } else {
                                document.getElementById("MessageMistake").innerHTML = msg.forbidden;
                                MinimizeMenssages("#Mistake");
                            }

                        },
                        error: function (e) {
                            document.getElementById("MessageMistake").innerHTML = msg.internet;
                            MinimizeMenssages("#Mistake");
                        },
                        // código a ejecutar sin importar si la petición falló o no
                        complete: function (xhr, status) {

                        }
                    });
                } else {
                    document.getElementById("MessageMistake").innerHTML = msg.null;
                    MinimizeMenssages("#Mistake");
                }
            }
        }

    }

    function MinimizeMenssages() {
        var bPopup = $(arguments[0]).bPopup();
        bPopup.reposition(100);
    }


    /* Contact PassForm
     * ------------------------------------------------------ */
    var ChangePassForm = function () {


        /* local validation */
        $('#ChangePass').validate({

            /* submit via ajax */
            submitHandler: function (form) {

                if ($('#contactPasswordc').val() != $('#contactPassword').val()) {
                    document.getElementById("MessageMistake").innerHTML = msg.passdif;
                    MinimizeMenssages("#Mistake");
                } else {

                    $.ajax({

                        type: "POST",
                        url: route.user.updpass,
                        data: $(form).serialize(),
                        success: function (obj) {

                            // Message was sent
                            if (obj.data) {
                                if (obj.data.data[0] == 1) {
                                    document.getElementById("MessageSuccess").innerHTML = msg.passok;
                                    MinimizeMenssages("#Success");
                                    PassNull();
                                } else {
                                    document.getElementById("MessageMistake").innerHTML = msg.passforbidden;
                                    MinimizeMenssages("#Mistake");
                                }
                            }
                            // There was an error
                            else {
                                document.getElementById("MessageMistake").innerHTML = msg.faildata;
                                MinimizeMenssages("#Mistake");
                            }

                        },
                        error: function (e) {
                            //console.log(e)
                            document.getElementById("MessageMistake").innerHTML = msg.internet;
                            MinimizeMenssages("#Mistake");
                        }

                    });
                }
            }

        });

    };

    /* Contact DataForm
     * ------------------------------------------------------ */
    var UpdUserDataForm = function () {


        /* local validation */
        $('#UpdUserData').validate({

            /* submit via ajax */
            submitHandler: function (form) {
                $.ajax({

                    type: "POST",
                    url: route.user.upddata,
                    data: $(form).serialize(),
                    success: function (obj) {

                        // Message was sent
                        if (obj.data) {
                            if (obj.data.data[0] == 1) {
                                document.getElementById("MessageSuccess").innerHTML = msg.updok;
                                MinimizeMenssages("#Success");
                                Refresh();
                            } else {
                                document.getElementById("MessageMistake").innerHTML = msg.updforbidden;
                                MinimizeMenssages("#Mistake");
                            }
                        }
                        // There was an error
                        else {
                            document.getElementById("MessageMistake").innerHTML = msg.faildata;
                            MinimizeMenssages("#Mistake");
                        }

                    },
                    error: function (e) {
                        //console.log(e)
                        document.getElementById("MessageMistake").innerHTML = msg.internet;
                        MinimizeMenssages("#Mistake");
                    }

                });

            }

        });

    };

    
    /* End of My Rules */


    "use strict";

    /*-----------------------------------
     * FIXED  MENU - HEADER
     *-----------------------------------*/
    function menuscroll() {
        var $navmenu = $('.nav-menu');
        if ($(window).scrollTop() > 50) {
            $navmenu.addClass('is-scrolling');
        } else {
            $navmenu.removeClass("is-scrolling");
        }
    }
    menuscroll();
    $(window).on('scroll', function () {
        menuscroll();
    });
    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });
    /* 
     * NAVBAR TOGGLE BG
     *-----------------*/
    var siteNav = $('#navbar');
    siteNav.on('show.bs.collapse', function (e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    })
    siteNav.on('hide.bs.collapse', function (e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    })

    /*-----------------------------------
     * ONE PAGE SCROLLING
     *-----------------------------------*/
    // Select all links with hashes
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').on('click', function (event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
    /*-----------------------------------
     * OWL CAROUSEL
     *-----------------------------------*/


    $(document).keydown(Moving);

    function Moving(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;

        if (evt.keyCode === 37) {
            $(".owl-prev").click();
        } else if (evt.keyCode === 39) {
            $(".owl-next").click()
        }
    }



    /* Initialize
    * ------------------------------------------------------ */
    js = null;
    MatchVote = [];
    ChangePassForm();
    UpdUserDataForm();
    UpdStateForm();
    FindForm();
    Load();

}); /* End Fn */