define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var LoginService = (function () {
        function LoginService() {
            this.url = BASEURL + "/seguridad/authenticate/";
            this._url = BASEURL + "/services/authentication/";
            this.logout = BASEURL + "/services/logout/";
        }
        LoginService.prototype.validateSession = function (usuario, clave) {
            return $.ajax({
                url: this.url,
                type: 'POST',
                data: { usuario: usuario, clave: clave }
            });
        };
        LoginService.prototype.Authenticate = function (usuario, clave) {
            return $.ajax({
                url: this.url,
                type: 'POST',
                data: { usuario: usuario, clave: clave }
            });
        };
        LoginService.prototype.Logout = function () {
            return $.ajax({
                url: this.logout,
                type: 'POST',
                data: { key: '' }
            });
        };
        return LoginService;
    }());
    exports["default"] = LoginService;
});
//# sourceMappingURL=login.service.js.map