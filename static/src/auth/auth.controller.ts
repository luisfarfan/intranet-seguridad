/**
 * Created by Administrador on 21/04/2017.
 */

import {LoginService} from 'auth.service';
import {CoreConfig as Core} from '../core/core'
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
        this.loginService.Authenticate(credenciales).done((response) => {
            window.location.replace(Core.BASEURL);
        });
    }

    logout() {
        this.loginService.Logout().done(() => {
            window.location.replace(Core.BASEURL);
        });
    }
}

new AuthController();