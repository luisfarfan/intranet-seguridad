/**
 * Created by LFarfan on 20/12/2016.
 */
var sistemas = [];
var proyectos_siga = [];
var proyectos_siga_selected = {};
var proyectos_seguridad = [];
var proyectos_seguridad_selected = [];

var proyectosistema_selected = null;

var administradores = null;
var administradoresLibres = null;
var usuarioAdmSelected = null;
var sistemaSelected = null;
$(function () {

    $('#usuarios_encargados').select2({
        ajax: {
            url: `${BASEURL}/services/filterusers/`,
            processResults: function (data) {
                return {
                    results: data.items
                };
            }
        },
    });
    $('[data-popup="lightbox"]').fancybox({
        padding: 3
    });

    Dropzone.autoDiscover = false;
    $("#dropzone_single").dropzone({
        autoProcessQueue: false,
        renameFilename: 'presentation_image',
        maxFiles: 1,
        init: function () {
            var submitButton = document.querySelector("#btn_save_proyectosistema")
            var myDropzone = this; // closure
            submitButton.addEventListener("click", function () {
                alert_confirm(() => {
                    "use strict";
                    if (proyectosistema_selected) {
                        let url = `${BASEURL}/rest_proyectos/sistemaproyecto/${proyectosistema_selected.id}/`;
                        let formData = formToObject('frm_datos_proyectosistema')
                        let ajaxOptions = {
                            url: url,
                            type: 'PATCH',
                            data: formData,
                            success: response => {
                                myDropzone.options.url = `${BASEURL}/rest_proyectos/prueba/${proyectosistema_selected.id}/`;
                                myDropzone.processQueue();
                                //$('#modal_proyecto_sistema').modal('hide');
                                location.reload();
                            }
                        }
                        $.ajax(ajaxOptions);
                    } else {
                        let url = `${BASEURL}/rest_proyectos/saveProyectoSistema/`;
                        let id_sistemas = $('#select_sistemas_no_asignados').val();
                        let id_proyecto = proyectos_seguridad_selected[0].id;
                        let data = {
                            id_sistemas: [id_sistemas],
                            id_proyecto: id_proyecto
                        };
                        $.ajax({
                            url: url,
                            type: 'POST',
                            data: data,
                            success: response => {
                                getProyectosSeguridad();
                                //$('#modal_asignacion').modal('hide');
                                myDropzone.options.url = `${BASEURL}/rest_proyectos/prueba/${response}/`;
                                datosProyectoSistema(response);
                                myDropzone.processQueue();
                                location.reload()
                            }
                        });
                    }
                });
            });
        }
    });
    getProyectosSiga();
    getProyectosSeguridad();
    $('#tbl_sistemas_asignados').on('click', '[name="a_editar"]', (ev) => {
        "use strict";
        let id_sistema = $(ev.currentTarget).data('value');
        $.getJSON(`${BASEURL}/rest_proyectos/get_proyecto_sistema/${proyectos_seguridad_selected[0].id}/${id_sistema}/`, (proyectosistema) => {
            $.getJSON(`${BASEURL}/rest_proyectos/sistemaproyecto/${proyectosistema[0].id}/`, (proyectosistema) => {
                proyectosistema_selected = proyectosistema;
                for (let key in proyectosistema) {
                    $(`input[name=${key}]`).val(proyectosistema[key]);
                }
                if (proyectosistema_selected['presentation_image'] != '') {
                    $('#img_proyectosistema').attr('src', `${BASEURL}/static/media/${proyectosistema_selected['presentation_image']}`);
                    $('#a_proyectosistema').attr('href', `${BASEURL}/static/media/${proyectosistema_selected['presentation_image']}`);
                    $('#div_img_proyectosistema').show();
                } else {
                    $('#div_img_proyectosistema').hide();
                }
            });
        });
        $('#modal_proyecto_sistema').modal();
    });
    $('#tbl_sistemas_asignados').on('click', '[name="a_administradores"]', (ev) => {
        "use strict";
        sistemaSelected = $(ev.currentTarget).data('value');
        ProyectosUsers.getAdministradores()
    });
    $('#tabla_administradores_sistema').on('click', '[name="li_delete"]', (ev) => {
        "use strict";
        let administradorSelected = $(ev.currentTarget).data('value');
        alert_confirm(() => {
            ProyectosUsers.deleteAdministrador({
                'usuario': administradorSelected,
                'proyectosistema': proyectosistema_selected[0].id
            });
        }, 'Esta seguro de eliminar a este administador?');
    });

    $('#btn_addadm').on('click', () => {
        "use strict";
        let useradm_selected = $('#usuarios_administradores').val();
        if (useradm_selected == "") {
            swal('Seleccione un usuario de la lista desplegable', 'info')
            return false;
        } else {
            alert_confirm(() => {
                ProyectosUsers.addAdministrador({
                    'usuario': useradm_selected,
                    'proyectosistema': proyectosistema_selected[0].id
                });
            }, 'Esta seguro de agregar este administrador ?')
        }
    });
});

var ProyectosUsers = {
    drawAdministradorProyecto: () => {
        "use strict";
        let html = '';
        administradores.map((value, index) => {
            html += `<tr>
                        <td>${index + 1}</td>
                        <td>${value.usuario}</td>
                        <td>${value.nombre}</td>
                        <td>${value.ape_pat}</td>
                        <td>${value.ape_mat}</td>
                        <td>
                            <ul class="icons-list">
                                <li name="li_delete" class="text-danger-600" data-value="${value.id}"><a href="#"><i class="icon-trash"></i></a></li>
                            </ul>
                        </td>
                    </tr>`;
        });
        $('#tabla_administradores_sistema').find('tbody').html(html)
    },
    drawDropdownAdministradores: () => {
        "use strict";
        let html = '<option value="">Seleccione Administrador</option>';
        administradoresLibres.map((value, index) => {
            html += `<option value="${value.id}">${value.usuario} - <span class="text-bold">${value.nombre} ${value.ape_pat} ${value.ape_mat}</span></option>`;
        });
        $('#usuarios_administradores').html(html);
        $('#usuarios_administradores').select2()
    },
    addAdministrador: (obj) => {
        "use strict";
        $.ajax({
            url: `${BASEURL}/rest_proyectos/usuariosproyectosistema/1/`,
            type: 'POST',
            data: obj,
            success: (response) => {
                ProyectosUsers.getAdministradores();
            }
        })
    },
    deleteAdministrador: (obj) => {
        "use strict";
        $.ajax({
            url: `${BASEURL}/rest_proyectos/usuariosproyectosistema/2/`,
            type: 'POST',
            data: obj,
            success: (response) => {
                ProyectosUsers.getAdministradores();
            }
        })
    },
    getAdministradores: () => {
        "use strict";
        $.getJSON(`${BASEURL}/rest_proyectos/get_proyecto_sistema/${proyectos_seguridad_selected[0].id}/${sistemaSelected}/`, (proyectosistema) => {
            proyectosistema_selected = proyectosistema;
            console.log(proyectosistema_selected)
            $.getJSON(`${BASEURL}/services/filterusersadmin/${proyectosistema[0].id}/`, (usuarios) => {
                administradores = usuarios.administradores;
                administradoresLibres = usuarios.administradoresLibres
                ProyectosUsers.drawAdministradorProyecto();
                ProyectosUsers.drawDropdownAdministradores();
                $('#modal_administradores_proyectosistema').modal();
            });
        });
    }
}

$('#proyectos_siga').select2({
    containerCssClass: 'bg-primary-400'
});

//yaesta
$.getJSON(`${BASEURL}/rest_sistemas/sistema/`, response => sistemas = response);

//yaesta
function getProyectosSiga() {
    "use strict";
    $.ajax({
        url: `${BASE_URL}/rest_proyectos/getProyectosSiga/`,
        type: 'GET',
        success: response => {
            proyectos_siga = response;
            setSelect_v2('proyectos_siga', proyectos_siga, ['id', 'desc_proyecto'], true);
            $('#proyectos_siga').trigger('change');
        }
    });
}

$('#proyectos_siga').on('change', event => {
    "use strict";
    proyectos_siga_selected = findInObject(proyectos_siga, 'id', event.target.value);
    setTable('tbl_proyecto_siga_selected', proyectos_siga_selected, ['id', 'desc_proyecto', 'codi_meta', 'CODI_DEPE_TDE', 'annio_meta']);
    if (proyectos_siga_selected.length > 0) {
        $('#btn_agregar_proyecto').prop('disabled', false);
    } else {
        $('#btn_agregar_proyecto').prop('disabled', true);
    }
});

//yaesta
function getProyectosSeguridad() {
    "use strict";

    let _html = '';
    $('#tbl_proyectos_seguridad').find('tbody').empty();
    $.ajax({
        url: `${BASE_URL}/rest_proyectos/proyecto/`,
        type: 'GET',
        success: response => {
            proyectos_seguridad = response;
            $.each(proyectos_seguridad, (key, val) => {
                _html += `<tr>
                            <td>${val.sigla}</td>
                            <td>${val.anio}</td>
                            <td>${val.nombre == null ? '' : val.nombre}</td>
                            <td>${val.cod_meta}</td>
                            <td>${val.estado == 1 ? '<span class="label label-success">Activo</span>' : '<span class="label label-danger">Inactivo</span>'}</td>
                            <td>
                               <ul class="icons-list">
                                    <li><a data-popup="tooltip" onclick="modal_editarProyecto(${val['id']})" title="" data-original-title="Editar Proyecto"><i class="icon-pencil7"></i></a></li>
                                    <li><a data-popup="tooltip" onclick="modal_asignarSistemas(${val['id']})" title="" data-original-title="Asignar Sistemas"><i class="icon-cog7"></i></a></li>
						        </ul>
						    </td>`;
                _html += `</tr>`;
            });
            $('#tbl_proyectos_seguridad').find('tbody').html(_html);
        }
    });
}

function modal_editarProyecto(id) {
    "use strict";

    $('#modal_editar_proyecto').modal('show');
    proyectos_seguridad_selected = findInObject(proyectos_seguridad, 'id', id);
    for (let i in proyectos_seguridad_selected[0]) {
        if (i == 'estado') {
            if (proyectos_seguridad_selected[0][i] == 1) {
                $(`input[name=${i}]`).prop('checked', true);
            } else {
                $(`input[name=${i}]`).prop('checked', false);
            }
        }
        $(`input[name=${i}]`).val(proyectos_seguridad_selected[0][i]);
    }
}

function modal_asignarSistemas(id) {
    "use strict";

    proyectos_seguridad_selected = findInObject(proyectos_seguridad, 'id', id);
    console.log(proyectos_seguridad_selected)
    setModal_asignarSistemas();
    $('#modal_asignacion').modal('show');
}

function setModal_asignarSistemas() {
    "use strict";

    let diff_sistemas = diffSistemas(sistemas, proyectos_seguridad_selected[0].sistemas);
    setSelect_v2('select_sistemas_no_asignados', diff_sistemas.no_asignado, ['id', 'nombre'], true);

    $('.multiselect').multiselect('destroy');

    // var multiselect = $('.multiselect').multiselect({
    //     onChange: function () {
    //         $.uniform.update();
    //     }
    // });
    //
    // $(".styled, .multiselect-container input").uniform({radioClass: 'choice'});

    let _html = '';
    $('#tbl_sistemas_asignados').find('tbody').empty();
    $.each(diff_sistemas.asignado, (key, val) => {
        _html += `<tr>
                    <td>${val.nombre}</td>
                    <td>
                       <ul class="icons-list">
                            <li><a name="a_eliminar" data-value="${val.id}" data-popup="tooltip" title="" data-original-title="Desasignar Sistema"><i class="icon-trash"></i></a></li>
                            <li><a name="a_editar" data-value="${val.id}" data-popup="tooltip" title="" data-original-title="Desasignar Sistema"><i class="icon-pencil4"></i></a></li>
                            <li><a name="a_administradores" data-value="${val.id}" data-popup="tooltip" title="" data-original-title="Gestión de Administradores del Sistema"><i class="icon-users"></i></a></li>
                        </ul>
                     </td>`;
        _html += `</tr>`;
    });

    $('#tbl_sistemas_asignados').find('tbody').html(_html);

    $('#select_sistemas_no_asignados').trigger('change');
}

function addProyecto() {
    "use strict";

    let url = `${BASEURL}/rest_proyectos/proyecto/`;
    let data = {
        id_siga: proyectos_siga_selected[0].id,
        nombre: proyectos_siga_selected[0].desc_proyecto,
        sigla: proyectos_siga_selected[0].sigla,
        anio: proyectos_siga_selected[0].annio_meta,
        cod_meta: proyectos_siga_selected[0].codi_meta,
        estado: 1
    };
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
        success: response => {
            getProyectosSiga();
            getProyectosSeguridad();
        }
    });
}

function saveProyecto() {
    "use strict";

    let data = proyectos_seguridad_selected[0];
    data.sigla = $('input[name="sigla"]').val();
    data.descripcion = $('input[name="descripcion"]').val();
    data.estado = $('input[name="estado"]').is(':checked') ? 1 : 0;
    let url = `${BASEURL}/rest_proyectos/proyecto/${data.id}/`;
    $.ajax({
        url: url,
        type: 'PUT',
        data: data,
        success: response => {
            getProyectosSiga();
            getProyectosSeguridad();
            $('#modal_editar_proyecto').modal('hide');
        }
    });
}

$('#btn_agregar_proyecto').on('click', event => {
    "use strict";

    alert_confirm(addProyecto);
});

$('#btn_save_proyecto_seguridad').on('click', event => {
    "use strict";

    alert_confirm(saveProyecto);
});

function saveProyectoSistema() {
    "use strict";
    if (proyectosistema_selected) {
        datosProyectoSistema(proyectosistema_selected.id);
    } else {
        let url = `${BASEURL}/rest_proyectos/saveProyectoSistema/`;
        let id_sistemas = $('#select_sistemas_no_asignados').val();
        let id_proyecto = proyectos_seguridad_selected[0].id;
        let data = {
            id_sistemas: [id_sistemas],
            id_proyecto: id_proyecto
        };
        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            success: response => {
                getProyectosSeguridad();
                $('#modal_asignacion').modal('hide');
                datosProyectoSistema(response)
            }
        });
    }
}
function datosProyectoSistema(response, file = null) {
    let url = `${BASEURL}/rest_proyectos/sistemaproyecto/${response}/`;
    let formData = formToObject('frm_datos_proyectosistema')
    if (file) {
        formData['file'] = file
    }
    let ajaxOptions = {
        url: url,
        type: 'PATCH',
        data: formData,
        success: response => {
            $('#modal_proyecto_sistema').modal('hide');
        }
    }
    $.ajax(ajaxOptions);
}

$('#btn_asignar_sistemas').on('click', () => {
    "use strict";
    if ($('#select_sistemas_no_asignados').val() != "-1") {
        proyectosistema_selected = null;
        $('#frm_datos_proyectosistema')[0].reset();
        $('#modal_proyecto_sistema').modal()
        $('#div_img_proyectosistema').hide();
    } else {
        sweetAlert("", "No ha seleccionado ningun Sistema!", "error");
    }
});
// $('#btn_save_proyectosistema').on('click', () => {
//     "use strict";
//     alert_confirm(saveProyectoSistema);
// });

$('#select_sistemas_no_asignados').change(event => {
    "use strict";

    if (event.target.value == null) {
        $('#btn_asignar_sistemas').prop('disabled', true);
    } else {
        $('#btn_asignar_sistemas').prop('disabled', false);
    }
});


function serializeForm(id_form) {
    let objectForm = $(`#${id_form}`).serializeArray();
    let checkboxes = $(`#${id_form} input:checkbox`);
    // let datesinputs = $(`#${id_form} input[type="date"]`);
    if (checkboxes.length) {
        checkboxes.map((value, key) => {
            objectForm.push({value: $(key).is(':checked') ? 1 : 0, name: key.name})
        });
    }
    return objectForm;
}

function formToObject(form) {
    let formObject = {};
    form.map((value, key) => {
        formObject[value.name] = value.value;
    });
    return formObject;
}

function alert_confirm(callback, title = 'Está seguro de Guardar?', type = 'success', callback2 = null) {
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
    }, (confirm) => {
        if (confirm) {
            callback()
        } else {
            callback2 != null ? callback2 : '';
        }
    });
}