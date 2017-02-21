define(["require", "exports"], function (require, exports) {
    "use strict";
    var ProyectosService = (function () {
        function ProyectosService() {
            this.url = {
                proyectos: BASEURL + "/rest_proyectos/proyecto/"
            };
        }
        ProyectosService.prototype.getProyectos = function (pk) {
            if (pk === void 0) { pk = null; }
            return $.ajax({
                url: pk == null ? this.url.proyectos : "" + this.url.proyectos + pk + "/",
                type: 'GET'
            });
        };
        ProyectosService.prototype.addProyecto = function (objectData) {
            return $.ajax({
                url: "" + this.url.proyectos,
                type: 'POST',
                data: objectData
            });
        };
        ProyectosService.prototype.updateProyecto = function (pk, objectData) {
            return $.ajax({
                url: this.url.proyectos + "/" + pk,
                type: 'PATCH',
                data: objectData
            });
        };
        ProyectosService.prototype.deleteProyecto = function (pk) {
            return $.ajax({
                url: this.url.proyectos + "/" + pk,
                type: 'DELETE'
            });
        };
        return ProyectosService;
    }());
    exports.ProyectosService = ProyectosService;
    var SistemasService = (function () {
        function SistemasService() {
            this.url = {
                sistemas: BASEURL + "/rest_sistemas/sistema/",
                sistemas_menu: BASEURL + "/rest_sistemas/sistema/"
            };
        }
        SistemasService.prototype.getSistema = function (pk) {
            return $.ajax({
                url: pk == null ? this.url.sistemas : "" + this.url.sistemas + pk + "/",
                type: 'GET'
            });
        };
        SistemasService.prototype.addSistema = function (objectData) {
            return $.ajax({
                url: "" + this.url.sistemas,
                type: 'POST',
                data: objectData
            });
        };
        SistemasService.prototype.updateSistema = function (pk, objectData) {
            return $.ajax({
                url: this.url.sistemas + "/" + pk,
                type: 'PATCH',
                data: objectData
            });
        };
        SistemasService.prototype.deleteSistema = function (pk) {
            return $.ajax({
                url: this.url.sistemas + "/" + pk,
                type: 'DELETE'
            });
        };
        return SistemasService;
    }());
    exports.SistemasService = SistemasService;
});
//# sourceMappingURL=menu-aplicaciones.service.js.map