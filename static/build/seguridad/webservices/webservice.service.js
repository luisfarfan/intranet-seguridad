define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var WebServiceService = (function () {
        function WebServiceService() {
            this.url = BASEURL + "/rest_webservices/webservices/";
        }
        WebServiceService.prototype.get = function () {
            return $.getJSON(this.url);
        };
        return WebServiceService;
    }());
    exports.WebServiceService = WebServiceService;
});
//# sourceMappingURL=webservice.service.js.map