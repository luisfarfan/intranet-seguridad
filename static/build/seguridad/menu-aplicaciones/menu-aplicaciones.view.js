define(["require", "exports", "./menu-aplicaciones.service"], function (require, exports, menu_aplicaciones_service_1) {
    "use strict";
    var menuAplicaciones = new menu_aplicaciones_service_1.ProyectosService();
    var proyectos;
    $(function () {
        menuAplicaciones.getProyectos().done(function (data) {
            proyectos = data;
        });
    });
});
//# sourceMappingURL=menu-aplicaciones.view.js.map