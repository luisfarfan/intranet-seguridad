/**
 * Created by Administrador on 21/04/2017.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var CoreConfig = (function () {
        function CoreConfig() {
            this.setUrl();
            this.setSessionVariables();
        }
        CoreConfig.prototype.setUrl = function () {
            var pathArray = location.href.split('/');
            var protocol = pathArray[0];
            var host = pathArray[2];
            console.log(pathArray);
            CoreConfig.BASEURL = protocol + '//' + host;
        };
        CoreConfig.prototype.setSessionVariables = function () {
            CoreConfig.KEY = localStorage.getItem('key');
            CoreConfig.IDUSUARIO = localStorage.getItem('id_usuario');
        };
        return CoreConfig;
    }());
    exports.CoreConfig = CoreConfig;
    new CoreConfig();
});
//# sourceMappingURL=core.js.map