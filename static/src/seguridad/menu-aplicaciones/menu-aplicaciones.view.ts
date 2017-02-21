import {ProyectosService, SistemasService} from './menu-aplicaciones.service';

var menuAplicaciones = new ProyectosService();
var proyectos:any;
$(function(){
    menuAplicaciones.getProyectos().done(data => {
        proyectos = data
    })
})






