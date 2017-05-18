/**
 * Created by lfarfan on 27/02/2017.
 */
declare var BASEURL: string;
interface UrlProyectos {
    proyectos: string;
    sistemas_proyecto: string;
    proyecto_sistema: string;
}
export class ProyectosService {

    private url: UrlProyectos = {
        proyectos: `${BASEURL}/rest_proyectos/proyecto/`,
        sistemas_proyecto: `${BASEURL}/rest_proyectos/sistemas_proyecto/`,
        proyecto_sistema: `${BASEURL}/rest_proyectos/get_proyecto_sistema/`,
    };
    private url_proyectosSiga: string = `${BASEURL}/rest_proyectos/getProyectosSiga/`;
    private url_sistemas: string = `${BASEURL}/rest_sistemas/sistema/`;

    getSistemasProyecto(): JQueryXHR {
        return $.ajax({
            url: this.url.sistemas_proyecto,
            type: 'GET'
        });
    }

    getProyectoSistema(id_proyecto: number, id_sistema: number): JQueryXHR {
        return $.ajax({
            url: `${this.url.proyecto_sistema}${id_proyecto}/${id_sistema}`,
            type: 'GET'
        });
    }

    getSistemas(): JQueryXHR {
        return $.ajax({
            url: this.url_sistemas,
            type: 'GET'
        });
    }

    getProyectosSiga(): JQueryXHR {
        return $.ajax({
            url: this.url_proyectosSiga,
            type: 'GET'
        });
    }

    get(): JQueryXHR {
        return $.ajax({
            url: this.url.proyectos,
            type: 'GET'
        });
    }

    add(data: Object): JQueryXHR {
        return $.ajax({
            url: this.url.proyectos,
            type: 'POST',
            data: data
        });
    }

    update(pk: number, data: Object): JQueryXHR {
        return $.ajax({
            url: `${this.url.proyectos}${pk}`,
            type: 'PATCH',
            data: data
        });
    }

    delete(pk: number): JQueryXHR {
        return $.ajax({
            url: `${this.url.proyectos}${pk}`,
            type: 'DELETE',
        });
    }

}