/**
 * Created by Administrador on 21/04/2017.
 */

import {LoginService} from 'auth.service';
import {CoreConfig as Core} from '../core/core'

interface AuthResponse {
    key: string,
    user: Object,
    valid: boolean
}
export class AuthController {
    private loginService: LoginService = new LoginService();

    constructor() {
        $('#frm_auth').on('submit', (ev) => {
            ev.preventDefault();
            this.authenticate();
        });
    }

    authenticate() {
        let credenciales = {usuario: $('input[name="usuario"]').val(), clave: $('input[name="clave"]').val()};
        this.loginService.Authenticate(credenciales).done((response: AuthResponse) => {
            console.log(response);
            //if (response.valid) window.location.replace(`${Core.BASEURL}/Bienvenido?key=${response.key}`);
        });
    }

    logout() {
        this.loginService.Logout().done(() => {
            window.location.replace(Core.BASEURL);
        });
    }
}

new AuthController();