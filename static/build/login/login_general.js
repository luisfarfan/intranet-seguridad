/**
 * Created by lfarfan on 08/03/2017.
 */
/**
 * Created by lfarfan on 19/02/2017.
 */
define(["require", "exports", '../core/utils', './login.service'], function (require, exports, utils_1, login_service_1) {
    "use strict";
    var Login = (function () {
        function Login() {
            var _this = this;
            this.loginService = new login_service_1["default"]();
            $('#iniciar_sesion').on('click', function () {
                _this.authenticate();
            });
        }
        Login.prototype.authenticate = function () {
            this.usuario = $('#usuario').val();
            this.clave = $('#clave').val();
            this.loginService.validateSession(this.usuario, this.clave).done(function (response) {
                if (response.session == true) {
                    console.log(response);
                    $('#div_error_message').html(utils_1.showDivAlert('Bienvenido!', 'success'));
                    $('#iniciar_sesion').addClass('disabled');
                    setTimeout(function () {
                        window.location.href = "http://localhost:8001/setSession/?key=" + response.key;
                    }, 1000);
                }
                else {
                    $('#div_error_message').html(utils_1.showDivAlert('Usuario o contraseña no validos', 'danger'));
                }
            }).fail(function () {
                $('#div_error_message').html(utils_1.showDivAlert('Usuario o contraseña no validos', 'danger'));
            });
        };
        return Login;
    }());
    new Login();
});
//# sourceMappingURL=login_general.js.map