/**
 * Created by lfarfan on 19/02/2017.
 */
declare var BASEURL: any;
export default class RolesService {
    private url = `${BASEURL}/rest_modulousuario/rol/`;
    private url_rol_modulo = `${BASEURL}/rest_modulousuario/modulos_rol/`;


    get(pk: any = null) {
        return $.ajax({
            url: pk == null ? this.url_rol_modulo : `${this.url_rol_modulo}${pk}/`,
            type: 'GET'
        });
    }

    update(pk: any, obj: Array<Object>) {
        return $.ajax({
            url: `${this.url}${pk}/`,
            type: 'PUT',
            data: obj
        });
    }

    add(obj: any) {
        return $.ajax({
            url: `${this.url}`,
            type: 'POST',
            data: obj,
        });
    }

    delete(pk: any) {
        return $.ajax({
            url: `${this.url}${pk}/`,
            type: 'DELETE',
        });
    }
}