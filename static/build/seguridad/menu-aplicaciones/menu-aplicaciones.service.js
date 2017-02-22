define(["require", "exports"], function (require, exports) {
    "use strict";
    var ProyectosService = (function () {
        function ProyectosService() {
            this.url = {
                proyectos: BASEURL + "/rest_proyectos/proyecto/",
                sistemas_proyecto: BASEURL + "/rest_proyectos/sistemas_proyecto/"
            };
        }
        ProyectosService.prototype.getProyectos = function (pk) {
            if (pk === void 0) { pk = null; }
            return $.ajax({
                url: pk == null ? this.url.sistemas_proyecto : "" + this.url.sistemas_proyecto + pk + "/",
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
        SistemasService.prototype.getSistemas = function (pk) {
            if (pk === void 0) { pk = null; }
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
    var ModuloService = (function () {
        function ModuloService() {
            this.url = {
                modulo: BASEURL + "/rest_modulousuario/modulo/",
                proyecto_sistema_modulos: BASEURL + "/rest_modulousuario/proyecto_sistema_modulos/"
            };
        }
        ModuloService.prototype.getModulos = function (pk) {
            if (pk === void 0) { pk = null; }
            return $.ajax({
                url: pk == null ? this.url.modulo : "" + this.url.modulo + pk + "/",
                type: 'GET'
            });
        };
        ModuloService.prototype.addModulo = function (objectData) {
            return $.ajax({
                url: "" + this.url.modulo,
                type: 'POST',
                data: objectData
            });
        };
        ModuloService.prototype.updateModulo = function (pk, objectData) {
            return $.ajax({
                url: "" + this.url.modulo + pk + "/",
                type: 'PATCH',
                data: objectData
            });
        };
        ModuloService.prototype.deleteModulo = function (pk) {
            return $.ajax({
                url: "" + this.url.modulo + pk + "/",
                type: 'DELETE'
            });
        };
        ModuloService.prototype.getModulosRecursive = function (id_proyecto, id_sistema) {
            return $.ajax({
                url: "" + this.url.proyecto_sistema_modulos + id_proyecto + "/" + id_sistema + "/",
                type: 'GET'
            });
        };
        return ModuloService;
    }());
    exports.ModuloService = ModuloService;
});
//# sourceMappingURL=menu-aplicaciones.service.js.map