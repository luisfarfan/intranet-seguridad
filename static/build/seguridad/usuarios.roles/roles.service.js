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
        RolesService.prototype.delete = function (pk) {
            return $.ajax({
                url: "" + this.url + pk + "/",
                type: 'DELETE'
            });
        };
        return RolesService;
    }());
    exports.__esModule = true;
    exports["default"] = RolesService;
});
//# sourceMappingURL=roles.service.js.map