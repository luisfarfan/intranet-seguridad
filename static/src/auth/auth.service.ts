/**
 * Created by Administrador on 21/04/2017.
 */
import {CoreConfig as Core} from '../core/core'

interface IAuth {
    usuario: string,
    clave: string
}

export class LoginService {
    private url: string = `${Core.BASEURL}/services/authenticate/`;
    private logout: string = `${Core.BASEURL}/services/logout/`;

    Authenticate(credenciales: IAuth): JQueryXHR {
        return $.ajax({
            url: this.url,
            type: 'POST',
            data: credenciales
        })
    }

    Logout(): JQueryXHR {
        return $.ajax({
            url: this.logout,
            type: 'POST',
            data: {key: Core.KEY}
        });
    }
}
