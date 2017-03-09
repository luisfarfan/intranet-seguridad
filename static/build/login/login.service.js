define(["require", "exports"], function (require, exports) {
    "use strict";
    var LoginService = (function () {
        function LoginService() {
            this.url = BASEURL + "/seguridad/authenticate/";
        }
        LoginService.prototype.validateSession = function (usuario, clave) {
            return $.ajax({
                url: this.url,
                type: 'POST',
                data: { usuario: usuario, clave: clave }
            });
        };
        return LoginService;
    }());
    exports.__esModule = true;
    exports["default"] = LoginService;
});
//# sourceMappingURL=login.service.js.map