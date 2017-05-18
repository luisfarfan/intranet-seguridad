/**
 * Created by Administrador on 17/05/2017.
 */
var Intro = (function () {
    function Intro() {
        var _this = this;
        $('#select_proyectos').on('change', function (ev) {
            var proyecto_id = $(ev.target).val();
            _this.insertParam('proyecto_id', proyecto_id);
        });
    }
    Intro.prototype.insertParam = function (key, value) {
        key = encodeURI(key);
        value = encodeURI(value);
        var kvp = document.location.search.substr(1).split('&');
        var i = kvp.length;
        var x;
        while (i--) {
            x = kvp[i].split('=');
            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }
        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }
        //this will reload the page, it's likely better to store this until finished
        document.location.search = kvp.join('&');
    };
    return Intro;
}());
new Intro();
//# sourceMappingURL=intro.js.map