/**
 * Created by lfarfan on 19/02/2017.
 */
declare var BASEURL: string;
interface UrlProyectos {
    proyectos: string;
}

export class ProyectosService {
    private url: UrlProyectos = {
        proyectos: `${BASEURL}/rest_proyectos/proyecto/`,
    }

    getProyectos(pk:any = null):JQueryXHR{
        return $.ajax({
            url: pk == null ? this.url.proyectos : `${this.url.proyectos}${pk}/`,
            type: 'GET'
        });
    }
    addProyecto(objectData:Object):JQueryAjaxSettings{
       return $.ajax({
            url: `${this.url.proyectos}`,
            type: 'POST',
            data: objectData,
        });
    }
    updateProyecto(pk:number,objectData:Object):JQueryAjaxSettings{
       return $.ajax({
            url: `${this.url.proyectos}/${pk}`,
            type: 'PATCH',
            data: objectData,
        });
    }
    deleteProyecto(pk:number):JQueryAjaxSettings{
       return $.ajax({
            url: `${this.url.proyectos}/${pk}`,
            type: 'DELETE',
        });
    }
}

interface UrlSistema {
    sistemas: string;
    sistemas_menu:string;
}
export class SistemasService {
    private url: UrlSistema = {
        sistemas: `${BASEURL}/rest_sistemas/sistema/`,
        sistemas_menu: `${BASEURL}/rest_sistemas/sistema/`,
    }

    getSistema(pk:number):JQueryAjaxSettings{
        return $.ajax({
            url: pk == null ? this.url.sistemas : `${this.url.sistemas}${pk}/`,
            type: 'GET'
        });
    }
    addSistema(objectData:Object):JQueryAjaxSettings{
       return $.ajax({
            url: `${this.url.sistemas}`,
            type: 'POST',
            data: objectData,
        });
    }
    updateSistema(pk:number,objectData:Object):JQueryAjaxSettings{
       return $.ajax({
            url: `${this.url.sistemas}/${pk}`,
            type: 'PATCH',
            data: objectData,
        });
    }
    deleteSistema(pk:number):JQueryAjaxSettings{
       return $.ajax({
            url: `${this.url.sistemas}/${pk}`,
            type: 'DELETE',
        });
    }
}