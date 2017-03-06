/**
 * Created by Administrador on 6/03/2017.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var UsuarioService = (function () {
        function UsuarioService() {
            this.url = {
                usuario: BASEURL + "/rest_usuario/usuario/"
            };
        }
        UsuarioService.prototype.get = function (pk) {
            if (pk === void 0) { pk = null; }
            return $.ajax({
                url: pk == null ? this.url.usuario : "" + this.url.usuario + pk + "/",
                type: 'GET'
            });
        };
        UsuarioService.prototype.update = function (pk, obj) {
            return $.ajax({
                url: "" + this.url.usuario + pk + "/",
                type: 'PUT',
                data: obj
            });
        };
        UsuarioService.prototype.add = function (obj) {
            return $.ajax({
                url: "" + this.url.usuario,
                type: 'POST',
                data: obj
            });
        };
        UsuarioService.prototype["delete"] = function (pk) {
            return $.ajax({
                url: "" + this.url.usuario + pk + "/",
                type: 'DELETE'
            });
        };
        return UsuarioService;
    }());
    exports.UsuarioService = UsuarioService;
});
//# sourceMappingURL=usuarios.service.js.map