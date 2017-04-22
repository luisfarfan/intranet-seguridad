/**
 * Created by lfarfan on 08/03/2017.
 */
declare var BASEURL: string;
export default class LoginService {
    private url: string = `${BASEURL}/seguridad/authenticate/`;
    private _url: string = `${BASEURL}/services/authentication/`;
    private logout: string = `${BASEURL}/services/logout/`;

    validateSession(usuario: string, clave: string): JQueryXHR {
        return $.ajax({
            url: this.url,
            type: 'POST',
            data: {usuario: usuario, clave: clave}
        })
    }

    Authenticate(usuario: string, clave: string): JQueryXHR {
        return $.ajax({
            url: this.url,
            type: 'POST',
            data: {usuario: usuario, clave: clave}
        })
    }

    Logout(): JQueryXHR {
        return $.ajax({
            url: this.logout,
            type: 'POST',
            data: {key: ''}
        });
    }
}
