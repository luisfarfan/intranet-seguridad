define(["require", "exports", "./usuarios.service", "../../core/utils"], function (require, exports, usuarios_service_1, utils) {
    "use strict";
    var UsuarioController = (function () {
        function UsuarioController() {
            var _this = this;
            this.usuario_selected = null;
            this.usuarioService = new usuarios_service_1.UsuarioService();
            this.usuario_formRules = {
                dni: {
                    number: true
                },
                ape_pat: {
                    maxlength: 50
                },
                ape_mat: {
                    maxlength: 50
                },
                nombre: {
                    maxlength: 100
                },
                fecha_contrato_inicio: {
                    required: false,
                    date: true
                },
                fecha_contrato_fin: {
                    required: false,
                    date: true
                },
                fecha_contrato_extended: {
                    required: false,
                    maxlength: 100,
                    date: true
                },
                email_inst: {
                    required: false,
                    maxlength: 100,
                    email: true
                },
                email_personal: {
                    required: false,
                    maxlength: 100,
                    email: true
                },
                usuario: {
                    required: true,
                    maxlength: 100
                },
                tipousuario: {
                    required: true
                },
                clave: {
                    required: true,
                    maxlength: 50
                }
            };
            this.usuario_form = $('#form_usuario').validate(utils.validateForm(this.usuario_formRules));
            this.getUsuarios();
            $('#btn_add_usuario').on('click', function () {
                _this.setFormUsuario();
            });
            $("#btn_delete_usuario").on('click', function () {
                usuarioController.deleteUsuario();
            });
            $('#btn_submit_form').on('click', function () {
                _this.saveUsuario();
            });
        }
        UsuarioController.prototype.getUsuarios = function () {
            var _this = this;
            this.usuarioService.get().done(function (usuarios) {
                _this.usuarios = usuarios;
                var html = '';
                _this.usuarios.map(function (value, pos) {
                    html += "<tr data-value=\"" + value.id + "\">\n                            <td>" + value.usuario + "</td>\n                            <td>" + value.nombre + " " + value.ape_pat + " " + value.ape_mat + "</td>\n                            <td>" + value.fecha_contrato_fin + "</td>\n                            <td>" + value.email_inst + "</td>\n                            <td>DNI</td>\n                            <td>" + value.dni + "</td>\n                            <td>" + (value.activo === 1 ? '<span class="label label-success">Activo</span>' : '<span class="label label-danger">Inactivo</span>') + "</td>\n                            <td></td>\n                         </tr>";
                });
                $('#table_usuarios').find('tbody').html(html);
                if (!$.fn.DataTable.isDataTable('#table_usuarios')) {
                    var table = $('#table_usuarios').DataTable();
                }
                else {
                    $('#table_usuarios').DataTable().destroy();
                    var table = $('#table_usuarios').DataTable();
                }
                $('.dataTables_length select').select2({
                    minimumResultsForSearch: Infinity,
                    width: 'auto'
                });
                $('#table_usuarios tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                        usuarioController.usuario_selected = null;
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                        usuarioController.setUsuario($(this).data('value'));
                    }
                });
            });
        };
        UsuarioController.prototype.setUsuario = function (id) {
            var _this = this;
            this.usuarios.filter(function (value) { return value.id === id ? _this.usuario_selected = value : ''; });
        };
        UsuarioController.prototype.setFormUsuario = function () {
            var usuario_selected = this.usuario_selected;
            if (this.usuario_selected !== null) {
                for (var key in usuario_selected) {
                    var input = $("input[name=\"" + key + "\"]");
                    if ($("[name=\"" + key + "\"]").is(':checkbox')) {
                        usuario_selected[key] == 1 ? input.prop('checked', true) : '';
                    }
                    else {
                        console.log(usuario_selected[key]);
                        input.val(usuario_selected[key]);
                    }
                }
            }
            else {
                $('#form_usuario')[0].reset();
            }
        };
        UsuarioController.prototype.saveUsuario = function () {
            var _this = this;
            this.usuario_form.form();
            if (this.usuario_form.valid()) {
                var data_form = utils.formToObject(utils.serializeForm('form_usuario'));
                if (this.usuario_selected === null) {
                    this.usuarioService.add(data_form).done(function () {
                        utils.showSwalAlert('Se agrego el usuario correctamente!', 'Exito!', 'success');
                        _this.getUsuarios();
                        $('#modal_usuario').modal('hide');
                    }).fail(function () {
                        utils.showSwalAlert('Error!', 'Exito!', 'error');
                    });
                }
                else {
                    this.usuarioService.update(this.usuario_selected.id, data_form).done(function () {
                        utils.showSwalAlert('Se agrego el usuario correctamente!', 'Exito!', 'success');
                        _this.getUsuarios();
                        $('#modal_usuario').modal('hide');
                    }).fail(function () {
                        utils.showSwalAlert('Error!', 'Exito!', 'error');
                    });
                }
            }
        };
        UsuarioController.prototype.deleteUsuario = function () {
            var _this = this;
            if (this.usuario_selected !== null) {
                this.usuarioService["delete"](this.usuario_selected.id).done(function () {
                    utils.showSwalAlert('Se elimino el usuario correctamente!', 'Exito!', 'success');
                    _this.getUsuarios();
                }).fail(function () {
                    utils.showSwalAlert('Error!', 'Exito!', 'error');
                });
            }
            else {
                utils.showInfo('Usted debe seleccionar algun usuario');
            }
        };
        return UsuarioController;
    }());
    var usuarioController = new UsuarioController();
});
//# sourceMappingURL=usuarios.view.js.map