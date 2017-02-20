define(["require", "exports"], function (require, exports) {
    "use strict";
    var MenuAplicacionesService = (function () {
        function MenuAplicacionesService() {
            this.url = {
                proyectos: "" + BASEURL,
                sistemas: "" + BASEURL
            };
        }
        return MenuAplicacionesService;
    }());
    exports.__esModule = true;
    exports["default"] = MenuAplicacionesService;
});
//# sourceMappingURL=menu-aplicaciones.service.js.map