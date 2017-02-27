define(["require", "exports"], function (require, exports) {
    "use strict";
    var ProyectosService = (function () {
        function ProyectosService() {
            this.url = {
                proyectos: BASEURL + "/rest_proyectos/proyecto/",
                sistemas_proyecto: BASEURL + "/rest_proyectos/sistemas_proyecto/",
                proyecto_sistema: BASEURL + "/rest_proyectos/proyecto_sistema/"
            };
        }
        ProyectosService.prototype.getSistemasProyecto = function () {
            return $.ajax({
                url: this.url.sistemas_proyecto,
                type: 'GET'
            });
        };
        ProyectosService.prototype.getProyectoSistema = function (id_proyecto, id_sistema) {
            return $.ajax({
                url: "" + this.url.proyecto_sistema + id_proyecto + "/" + id_sistema,
                type: 'GET'
            });
        };
        ProyectosService.prototype.get = function () {
            return $.ajax({
                url: this.url.proyectos,
                type: 'GET'
            });
        };
        return ProyectosService;
    }());
    exports.ProyectosService = ProyectosService;
});
//# sourceMappingURL=proyectos.service.js.map