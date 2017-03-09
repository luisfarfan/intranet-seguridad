/**
 * Created by lfarfan on 08/03/2017.
 */
/**
 * Created by lfarfan on 19/02/2017.
 */

import {showDivAlert} from '../core/utils';
import LoginService from './login.service';
declare var BASEURL: any;

class Login {
    private usuario: string;
    private clave: string;
    private loginService = new LoginService();

    constructor() {
        $('#iniciar_sesion').on('click', () => {
            this.authenticate()
        });
    }

    authenticate() {
        this.usuario = $('#usuario').val()
        this.clave = $('#clave').val()
        this.loginService.validateSession(this.usuario, this.clave).done((response) => {
            if (response.session == true) {
                console.log(response);
                $('#div_error_message').html(showDivAlert('Bienvenido!', 'success'));
                $('#iniciar_sesion').addClass('disabled');
                setTimeout(() => {
                    window.location.href = `http://localhost:8001/setSession/?key=${response.key}`;
                }, 1000)
            } else {
                $('#div_error_message').html(showDivAlert('Usuario o contraseña no validos', 'danger'))
            }
        }).fail(() => {
            $('#div_error_message').html(showDivAlert('Usuario o contraseña no validos', 'danger'))
        })
    }
}

new Login()
