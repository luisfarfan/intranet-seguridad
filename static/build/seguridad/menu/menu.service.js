define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var MenuService = (function () {
        function MenuService() {
            this.url = {
                menubyproject: BASEURL + "/rest_modulousuario/menubyproject/",
                menubyprojectsistema: BASEURL + "/rest_modulousuario/menubyprojectsistema/"
            };
        }
        MenuService.prototype.get = function (proyecto_id) {
            return $.ajax({
                url: "" + this.url.menubyproject + proyecto_id,
                type: 'GET'
            });
        };
        MenuService.prototype.getbyProyectoSistema = function (proyecto_id, sistema_id) {
            return $.ajax({
                url: "" + this.url.menubyprojectsistema + proyecto_id + "/" + sistema_id + "/",
                type: 'GET'
            });
        };
        return MenuService;
    }());
    exports.MenuService = MenuService;
});
//# sourceMappingURL=menu.service.js.map