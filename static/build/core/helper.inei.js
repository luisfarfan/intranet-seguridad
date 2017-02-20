/**
 * Created by lfarfan on 19/02/2017.
 */
/**
 * Created by lfarfan on 29/01/2017.
 */
define(["require", "exports"], function (require, exports) {
    "use strict";
    var ObjectHelper = (function () {
        function ObjectHelper() {
        }
        ObjectHelper.prototype.isEmpty = function (obj) {
            return Object.keys(obj).length === 0;
        };
        ObjectHelper.prototype.findInArrayObject = function (obj, value_search, key_search) {
            var res = false;
            if (!this.isEmpty(obj)) {
                obj.map(function (value, key) {
                    if (key_search in value) {
                        if (value[key_search] == value_search) {
                            res = value;
                        }
                    }
                });
            }
            return res;
        };
        ObjectHelper.prototype.formToObject = function (form) {
            var formObject = {};
            form.map(function (value, key) {
                formObject[value.name] = value.value;
            });
            return formObject;
        };
        return ObjectHelper;
    }());
    exports.ObjectHelper = ObjectHelper;
    var MenuHelper = (function () {
        function MenuHelper() {
        }
        MenuHelper.prototype.drawSidebar = function (menu) {
            var html = '';
            html += "<li class=\"navigation-header\"><span>Censo de Poblacion y Vivienda VIII</span> <i class=\"icon-menu\" title=\"Main pages\"></i></li>";
            html += this.recursiveHTMLSideBar(menu);
            return html;
        };
        MenuHelper.prototype.recursiveHTMLSideBar = function (array) {
            var _this = this;
            var html = '';
            array.map(function (value, key) {
                if (value.modulos_hijos.length) {
                    html += "<li><a href=\"#\"><i class=\"" + value.icon + "\"></i> <span>" + value.descripcion + "</span></a><ul>";
                    value.modulos_hijos.map(function (child1, k) {
                        html += "<li " + (child1.id == MODULO_ID ? 'class="active"' : '') + "><a href=\"" + BASEURL + "/" + child1.slug + "\"><i class=\"" + child1.icon + "\"></i>" + child1.descripcion + "</a></li>";
                        html += _this.recursiveHTMLSideBar(child1.modulos_hijos);
                    });
                    html += "</ul>";
                }
                else {
                    html += "<li " + (value.id == MODULO_ID ? 'class="active"' : '') + "><a href=\"" + BASEURL + "/" + value.slug + "\"><i class=\"" + value.icon + "\"></i> <span>" + value.descripcion + "</span></a></li>";
                }
            });
            return html;
        };
        return MenuHelper;
    }());
    exports.MenuHelper = MenuHelper;
    var SessionHelper = (function () {
        function SessionHelper() {
        }
        SessionHelper.prototype.setSession = function (key, obj) {
            key in localStorage ? localStorage.removeItem(key) : '';
            localStorage.setItem(key, JSON.stringify(obj));
            return this.getSession();
        };
        SessionHelper.prototype.getSession = function (key) {
            if (key === void 0) { key = 'usuario'; }
            return JSON.parse(localStorage.getItem(key));
        };
        return SessionHelper;
    }());
    exports.SessionHelper = SessionHelper;
});
//# sourceMappingURL=helper.inei.js.map