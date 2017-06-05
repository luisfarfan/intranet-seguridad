define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    /**
     * div alert de limitless para mostrar mensajes de estado (exito,error,info,warning)
     * @param message Mensaje del div.
     * @param type Tipo del div (error, success, info, danger, warning)
     * @returns      <Div> HTMLElement String.
     */
    function showDivAlert(message, type) {
        return "<div class=\"alert bg-" + type + " alert-styled-left\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span>\u00D7</span><span class=\"sr-only\">Close</span></button>\n                <span class=\"text-semibold\">" + message + "</span>\n            </div>";
    }
    exports.showDivAlert = showDivAlert;
    /**
     * Popup alert notify para mostrar mensajes de estado (exito,error,info,warning)
     * @param message Mensaje del div.
     * @param type Tipo del div (error, success, info, danger, warning)
     * @returns      <Div> HTMLElement String.
     */
    function showSwalAlert(message, title, type) {
        new PNotify({
            title: title,
            text: message,
            type: type
        });
    }
    exports.showSwalAlert = showSwalAlert;
    function alert_confirm(callback, title, type) {
        if (title === void 0) { title = 'Está seguro de Guardar?'; }
        if (type === void 0) { type = 'success'; }
        swal({
            title: title,
            text: '',
            type: type,
            showCancelButton: true,
            confirmButtonColor: "#EF5350",
            confirmButtonText: "Si!",
            cancelButtonText: "No!",
            closeOnConfirm: true,
            closeOnCancel: true,
            showLoaderOnConfirm: true
        }, function (confirm) {
            if (confirm) {
                callback();
            }
        });
    }
    exports.alert_confirm = alert_confirm;
    /**
     * sample structure
     * [
     *  {title: "node1"},{title: "node2"},{title:"node3", folder:true,key:"__node3"},
     *      children: [
     *          {title: "sub_node1",
         *              children: [
         *                  {title: "sub_node2"},{title: "sub_node3"},{title: "sub_node4"}]}]]
     *
     *
     **/
    function jsonFormatFancyTree(menu_json, rol_id_array) {
        if (rol_id_array === void 0) { rol_id_array = []; }
        var treejson = [];
        var interface_node = {};
        menu_json.map(function (value, key) {
            interface_node = {};
            interface_node['title'] = value.descripcion;
            interface_node['key'] = value.id;
            interface_node['icon'] = value.icon;
            if (value.modulos_hijos.length) {
                interface_node['children'] = [];
                var children_1 = [];
                value.modulos_hijos.map(function (node_value, node_order) {
                    children_1.push({
                        'title': node_value.descripcion,
                        'key': node_value.id,
                        'children': node_value.modulos_hijos.length == 0 ? [] : jsonFormatFancyTree(node_value.modulos_hijos, rol_id_array),
                        'selected': rol_id_array.indexOf(node_value.id) != -1 ? true : false,
                        'preselected': rol_id_array.indexOf(node_value.id) != -1 ? true : false,
                        'icon': node_value.icon
                    });
                });
                interface_node['children'] = children_1;
                treejson.push(interface_node);
            }
            else {
                interface_node['children'] = [];
                interface_node['selected'] = rol_id_array.indexOf(value.id) != -1 ? true : false;
                interface_node['preselected'] = rol_id_array.indexOf(value.id) != -1 ? true : false;
                treejson.push(interface_node);
            }
        });
        return treejson;
    }
    exports.jsonFormatFancyTree = jsonFormatFancyTree;
    function jsonFormatFancyTree2(menu_json, rol_id_array) {
        if (rol_id_array === void 0) { rol_id_array = []; }
        var treejson = [];
        var interface_node = {};
        menu_json.map(function (value, key) {
            interface_node = {};
            interface_node['title'] = value.descripcion;
            interface_node['key'] = value.id;
            interface_node['icon'] = value.icon;
            if ('hijos' in value) {
                interface_node['children'] = [];
                var children_2 = [];
                value.hijos.map(function (node_value, node_order) {
                    children_2.push({
                        'title': node_value.descripcion,
                        'key': node_value.id,
                        'children': ('hijos' in node_value) ? jsonFormatFancyTree2(node_value.hijos, rol_id_array) : [],
                        'selected': rol_id_array.indexOf(node_value.id) != -1 ? true : false,
                        'preselected': rol_id_array.indexOf(node_value.id) != -1 ? true : false,
                        'icon': node_value.icon
                    });
                });
                interface_node['children'] = children_2;
                treejson.push(interface_node);
            }
            else {
                interface_node['children'] = [];
                interface_node['selected'] = rol_id_array.indexOf(value.id) != -1 ? true : false;
                interface_node['preselected'] = rol_id_array.indexOf(value.id) != -1 ? true : false;
                treejson.push(interface_node);
            }
        });
        return treejson;
    }
    exports.jsonFormatFancyTree2 = jsonFormatFancyTree2;
    function jsonFormatFancyTreeSelecteds(menu_json, rol_id_array) {
        if (rol_id_array === void 0) { rol_id_array = []; }
        var treejson = [];
        var interface_node = {};
        console.log(menu_json);
        menu_json.map(function (value, key) {
            console.log(value);
            console.log(findChilds(value, rol_id_array));
            if (findChilds(value, rol_id_array) > 0) {
                interface_node = {};
                interface_node['title'] = value.descripcion;
                interface_node['key'] = value.id;
                interface_node['icon'] = value.icon;
                interface_node['children'] = [];
                var children_3 = [];
                if ('hijos' in value) {
                    value.hijos.map(function (node_value, node_order) {
                        if (findChilds(node_value, rol_id_array) > 0) {
                            children_3.push({
                                'title': node_value.descripcion,
                                'key': node_value.id,
                                'children': !('hijos' in node_value) ? [] : jsonFormatFancyTreeSelecteds(node_value.hijos, rol_id_array),
                                'selected': false,
                                'preselected': false,
                                'icon': node_value.icon
                            });
                        }
                    });
                }
                interface_node['children'] = children_3;
                treejson.push(interface_node);
            }
        });
        return treejson;
    }
    exports.jsonFormatFancyTreeSelecteds = jsonFormatFancyTreeSelecteds;
    function findChilds(menu, rol_id_array) {
        //let has_child: boolean = false;
        var count = 0;
        if (rol_id_array.indexOf(menu.id) != -1) {
            count++;
        }
        else {
            if ('hijos' in menu) {
                menu.hijos.map(function (value, key) {
                    if (rol_id_array.indexOf(value.id) != -1) {
                        count++;
                    }
                    else {
                        count = count + findChilds(value, rol_id_array);
                    }
                });
            }
        }
        return count;
    }
    function validateForm(rules) {
        var setOptions = {
            ignore: 'input[type=hidden], .select2-search__field',
            errorClass: 'validation-error-label',
            successClass: 'validation-valid-label',
            highlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            unhighlight: function (element, errorClass) {
                $(element).removeClass(errorClass);
            },
            // Different components require proper error label placement
            errorPlacement: function (error, element) {
                // Styled checkboxes, radios, bootstrap switch
                if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container')) {
                    if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                        error.appendTo(element.parent().parent().parent().parent());
                    }
                    else {
                        error.appendTo(element.parent().parent().parent().parent().parent());
                    }
                }
                else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
                    error.appendTo(element.parent().parent().parent());
                }
                else if (element.parents('div').hasClass('has-feedback') || element.hasClass('select2-hidden-accessible')) {
                    error.appendTo(element.parent());
                }
                else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                    error.appendTo(element.parent().parent());
                }
                else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                    error.appendTo(element.parent().parent());
                }
                else {
                    error.insertAfter(element);
                }
            },
            validClass: "validation-valid-label",
            success: function (label) {
                label.addClass("validation-valid-label").text("Correcto!");
            },
            rules: {},
            messages: {
                custom: {
                    required: "El campo es requerido"
                }
            }
        };
        setOptions.rules = rules;
        return setOptions;
    }
    exports.validateForm = validateForm;
    function serializeForm(id_form) {
        var objectForm = $("#" + id_form).serializeArray();
        var checkboxes = $("#" + id_form + " input:checkbox");
        // let datesinputs = $(`#${id_form} input[type="date"]`);
        if (checkboxes.length) {
            checkboxes.map(function (value, key) {
                objectForm.push({ value: $(key).is(':checked') ? 1 : 0, name: key.name });
            });
        }
        return objectForm;
    }
    exports.serializeForm = serializeForm;
    function drawTable(data, campos, pk, options) {
        if (pk === void 0) { pk = null; }
        if (options === void 0) { options = {
            edit_name: null,
            delete_name: null,
            enumerar: null,
            table_id: null
        }; }
        var html = '';
        data.map(function (value, key) {
            html += "<tr>";
            html += options.enumerar ? "<td>" + (key + 1) + "</td>" : '';
            campos.map(function (val, pos) {
                html += "<td>" + value[val] + "</td>";
            });
            if (options !== null) {
                if (options.edit_name !== null || options.delete_name !== null) {
                    html += "<td><ul class=\"icons-list\">\n                            " + (options.edit_name !== '' ? "<li name=\"" + options.edit_name + "\" data-value=" + value[pk] + " class=\"text-primary-600\"><a><i class=\"icon-pencil7\"></i></a></li>" : '') + "\n                            " + (options.delete_name !== '' ? "<li name=\"" + options.delete_name + "\" data-value=" + value[pk] + " class=\"text-danger-600\"><a><i class=\"icon-trash\"></i></a></li>" : '') + "\n\t\t\t\t\t\t </ul></td>";
                }
            }
            html += "</tr>";
        });
        $("#" + options.table_id).find('tbody').html(html);
    }
    exports.drawTable = drawTable;
    /**
     * Componente que renderiza un element Dropdown.
     * @param data Data a iterar, tiene que ser una lista de Object (Array<Object>)
     * @param campos Vienen a ser las KEYS de cada objecto en la lista del parametro "data"
     * @param extra Opciones extras.
     * @returns      <Div> HTMLElement String.
     */
    function setDropdown(data, campos, extra) {
        var html = "<option value=\"-1\">Seleccione</option>";
        data.map(function (value, key) {
            var value_concated = '';
            campos.text.map(function (v, k) {
                value_concated += value[v] + " ";
            });
            html += "<option value=\"" + value[campos.id] + "\">" + value_concated + "</option>";
        });
        $("#" + extra.id_element).html(html);
        if (extra.bootstrap_multiselect) {
            $("#" + extra.id_element).selectpicker('destroy');
            $("#" + extra.id_element).selectpicker('render');
        }
        extra.select2 ? $("#" + extra.id_element).select2() : '';
    }
    exports.setDropdown = setDropdown;
    function formToObject(form) {
        var formObject = {};
        form.map(function (value, key) {
            formObject[value.name] = value.value;
        });
        return formObject;
    }
    exports.formToObject = formToObject;
    function showInfo(message) {
        swal(message);
    }
    exports.showInfo = showInfo;
});
//# sourceMappingURL=utils.js.map