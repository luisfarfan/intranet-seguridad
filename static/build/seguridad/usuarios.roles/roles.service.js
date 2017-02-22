define(["require", "exports"], function (require, exports) {
    "use strict";
    var RolesService = (function () {
        function RolesService() {
            this.url = BASEURL + "/rest_modulousuario/rol/";
            this.url_rol_modulo = BASEURL + "/rest_modulousuario/modulos_rol/";
        }
        RolesService.prototype.get = function (pk) {
            if (pk === void 0) { pk = null; }
            return $.ajax({
                url: pk == null ? this.url_rol_modulo : "" + this.url_rol_modulo + pk + "/",
                type: 'GET'
            });
        };
        RolesService.prototype.update = function (pk, obj) {
            return $.ajax({
                url: "" + this.url + pk + "/",
                type: 'PUT',
                data: obj
            });
        };
        RolesService.prototype.add = function (obj) {
            return $.ajax({
                url: "" + this.url,
                type: 'POST',
                data: obj
            });
        };
        RolesService.prototype["delete"] = function (pk) {
            return $.ajax({
                url: "" + this.url + pk + "/",
                type: 'DELETE'
            });
        };
        return RolesService;
    }());
    exports.__esModule = true;
    exports["default"] = RolesService;
    var PermisosService = (function () {
        function PermisosService() {
            this.url = {
                permisos: BASEURL + "/rest_modulousuario/permiso/"
            };
        }
        PermisosService.prototype.get = function (pk) {
            if (pk === void 0) { pk = null; }
            return $.ajax({
                url: pk == null ? this.url.permisos : "" + this.url.permisos + pk + "/",
                type: 'GET'
            });
        };
        PermisosService.prototype.update = function (pk, obj) {
            return $.ajax({
                url: "" + this.url.permisos + pk + "/",
                type: 'PUT',
                data: obj
            });
        };
        PermisosService.prototype.add = function (obj) {
            return $.ajax({
                url: "" + this.url.permisos,
                type: 'POST',
                data: obj
            });
        };
        PermisosService.prototype["delete"] = function (pk) {
            return $.ajax({
                url: "" + this.url.permisos + pk + "/",
                type: 'DELETE'
            });
        };
        return PermisosService;
    }());
    exports.PermisosService = PermisosService;
});
//# sourceMappingURL=roles.service.js.map