/**
 * Created by Administrador on 6/03/2017.
 */

declare var BASEURL: string;
interface UrlUsuario {
    usuario: string,
}

export class UsuarioService {
    private url: UrlUsuario = {
        usuario: `${BASEURL}/rest_usuario/usuario/`,
    };

    get(pk: number = null): JQueryXHR {
        return $.ajax({
            url: pk == null ? this.url.usuario : `${this.url.usuario}${pk}/`,
            type: 'GET'
        });
    }

    update(pk: number, obj: Object): JQueryXHR {
        return $.ajax({
            url: `${this.url.usuario}${pk}/`,
            type: 'PUT',
            data: obj
        });
    }

    add(obj: Object): JQueryXHR {
        return $.ajax({
            url: `${this.url.usuario}`,
            type: 'POST',
            data: obj,
        });
    }

    delete(pk: number): JQueryXHR {
        return $.ajax({
            url: `${this.url.usuario}${pk}/`,
            type: 'DELETE',
        });
    }
}
