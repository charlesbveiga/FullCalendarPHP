<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
    <link href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css' rel='stylesheet'>
    <link href="css/custom.css" rel=stylesheet>

    <title>Agenda</title>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var calendarEl = document.getElementById('calendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                locale: 'pt-br'
            });
            calendar.render();
        });
    </script>
</head>

<body>

    <div class="container">

        <div class="card mb-4 border-light shadow">
            <div class="card-body">
                <h2 class="mt-0 me-3 ms-2 pb-2 border-bottom">Agenda</h2>
                <span id="msg"></span>
                <form class="ms-2 me-2 row g-3">

                    <div class="col-md-5 col-sm-12 col-12">
                        <label class="form-label" for="user_id">Pesquisar Tarefas do Profissional</label>
                        <select name="user_id" id="user_id" class="form-select">
                            <option value="">Selecione</option>
                        </select>
                    </div>

                    <div class="col-md-5 col-sm-12">
                        <label class="form-label" for="client_id">Pesquisar Atendimento do Cliente</label>
                        <input type="text" name="client_id" id="client_id" data-target-pesq-client-id="" class="form-control" placeholder="Pesquisar Cliente">
                        <!--Carregar as opções retornadas do BD -->
                        <span id="resultado_pesquisa" style="position: absolute; z-index: 1;"></span>
                    </div>

                    <div class="col-md-2 col-sm-12 mt-md-4 pt-md-3">
                        <button type="button" class="btn btn-warning mt-md-1"
                            id="limparPesquisaUsuarioCliente">Limpar Cliente
                        </button>
                    </div>

                </form>
            </div>
        </div>

        <div class="card p-4 border-ligth shadow">
            <div class="card-body">
                <div id='calendar'></div>
            </div>
        </div>
    </div>

    <!-- Modal Visualizar-->
    <div class="modal fade" id="visualizarModal" tabindex="-1" aria-labelledby="visualizarModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="visualizarModalLabel">Visualizar Tarefa</h1>
                    <h1 class="modal-title fs-5" id="editarModalLabel" style="display: none;">Editar Tarefa</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <span id="msgViewEvento"></span>

                    <div id="visualizarEvento">

                        <dl class="row">
                            <dt class="col-sm-3">ID: </dt>
                            <dd class="col-sm-9" id="visualizar_id"></dd>

                            <dt class="col-sm-3">Título: </dt>
                            <dd class="col-sm-9" id="visualizar_title"></dd>

                            <dt class="col-sm-3">Início: </dt>
                            <dd class="col-sm-9" id="visualizar_start"></dd>

                            <dt class="col-sm-3">Fim: </dt>
                            <dd class="col-sm-9" id="visualizar_end"></dd>

                            <dt class="col-sm-3">ID do Profissional: </dt>
                            <dd class="col-sm-9" id="visualizar_user_id"></dd>

                            <dt class="col-sm-3">Nome do Profissional: </dt>
                            <dd class="col-sm-9" id="visualizar_name"></dd>

                            <dt class="col-sm-3">E-mail do Profissional: </dt>
                            <dd class="col-sm-9" id="visualizar_email"></dd>

                            <dt class="col-sm-3">ID do Cliente: </dt>
                            <dd class="col-sm-9" id="visualizar_client_id"></dd>

                            <dt class="col-sm-3">Nome do Cliente: </dt>
                            <dd class="col-sm-9" id="visualizar_client_name"></dd>

                            <dt class="col-sm-3">E-mail do Cliente: </dt>
                            <dd class="col-sm-9" id="visualizar_client_email"></dd>

                            <dt class="col-sm-3">Observação: </dt>
                            <dd class="col-sm-9" id="visualizar_obs"></dd>
                        </dl>

                        <button type="button" class="btn btn-warning" id="btnViewEditEvento">Editar</button>

                        <button type="button" class="btn btn-danger" id="btnApagarEvento">Excluir</button>

                    </div>

                    <!-- Editar Evento-->

                    <div id="editarEvento" style="display: none;">

                        <span id="msgEditEvento"></span>


                        <form method="post" id="formEditEvento">

                            <input type="hidden" name="edit_id" id="edit_id">

                            <div class="row mb-3">
                                <label for="edit_title" class="col-sm-2 col-form-label">Título</label>
                                <div class="col-sm-10">
                                    <input type="text" name="edit_title" class="form-control" id="edit_title" placeholder="Título da Tarefa">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="edit_start" class="col-sm-2 col-form-label">Ínicio</label>
                                <div class="col-sm-10">
                                    <input type="datetime-local" name="edit_start" class="form-control" id="edit_start">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="edit_end" class="col-sm-2 col-form-label">Fim</label>
                                <div class="col-sm-10">
                                    <input type="datetime-local" name="edit_end" class="form-control" id="edit_end">
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="edit_color" class="col-sm-2 col-form-label">Urgência</label>
                                <div class="col-sm-10">
                                    <select name="edit_color" class="form-control" id="edit_color">
                                        <option value="">Selecione</option>
                                        <option style="background-color:#1C1C1C; color:#F2F2F2;" value="#1C1C1C">Urgentíssimo</option>
                                        <option style="background-color:#FF0004; color:#F2F2F2;" value="#FF0004">Urgente</option>
                                        <option style="background-color:#FF4500; color:#F2F2F2;" value="#FF4500">Atenção</option>
                                        <option style="background-color:#FFD700; color:#F2F2F2;" value="#FFD700">Moderado</option>
                                        <option style="background-color:#228822; color:#F2F2F2;" value="#228822">Resolvido</option>
                                        <option style="background-color:#15778F; color:#F2F2F2;" value="#15778F">Revisar</option>
                                        <option style="background-color:#40E0D0; color:#F2F2F2;" value="#40E0D0">Eventual</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="edit_user_id" class="col-sm-2 col-form-label">Profissional</label>
                                <div class="col-sm-10">
                                    <select name="edit_user_id" class="form-control" id="edit_user_id">
                                        <option value="">Selecione Profissional</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="edit_client_id" class="col-sm-2 col-form-label">Cliente</label>
                                <div class="col-sm-10">
                                    <select name="edit_client_id" class="form-control" id="edit_client_id">
                                        <option value="">Selecione Cliente</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="edit_obs" class="col-sm-2 col-form-label">Observação</label>
                                <div class="col-sm-10">
                                    <input type="text" name="edit_obs" class="form-control" id="edit_obs" placeholder="Observação da Tarefa">
                                </div>
                            </div>

                            <button type="button" name="btnViewEvento" class="btn btn-primary" id="btnViewEvento">Cancelar</button>

                            <button type="submit" name="btnEditEvento" class="btn btn-warning" id="btnEditEvento">Salvar</button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- Modal Cadastrar-->
    <div class="modal fade" id="cadastrarModal" tabindex="-1" aria-labelledby="cadastrarModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="cadastrarModalLabel">Cadastrar Tarefa</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <span id="msgCadEvento"></span>


                    <form method="post" id="formCadEvento">

                        <div class="row mb-3">
                            <label for="cad_title" class="col-sm-2 col-form-label">Título</label>
                            <div class="col-sm-10">
                                <input type="text" name="cad_title" class="form-control" id="cad_title" placeholder="Título da Tarefa">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="cad_start" class="col-sm-2 col-form-label">Ínicio</label>
                            <div class="col-sm-10">
                                <input type="datetime-local" name="cad_start" class="form-control" id="cad_start">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="cad_end" class="col-sm-2 col-form-label">Fim</label>
                            <div class="col-sm-10">
                                <input type="datetime-local" name="cad_end" class="form-control" id="cad_end">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="cad_color" class="col-sm-2 col-form-label">Urgência</label>
                            <div class="col-sm-10">
                                <select name="cad_color" class="form-control" id="cad_color">
                                    <option value="">Selecione</option>
                                    <option style="background-color:#1C1C1C; color:#F2F2F2;" value="#1C1C1C">Urgentíssimo</option>
                                    <option style="background-color:#FF0004; color:#F2F2F2;" value="#FF0004">Urgente</option>
                                    <option style="background-color:#FF4500; color:#F2F2F2;" value="#FF4500">Atenção</option>
                                    <option style="background-color:#FFD700; color:#F2F2F2;" value="#FFD700">Moderado</option>
                                    <option style="background-color:#228822; color:#F2F2F2;" value="#228822">Resolvido</option>
                                    <option style="background-color:#15778F; color:#F2F2F2;" value="#15778F">Revisar</option>
                                    <option style="background-color:#40E0D0; color:#F2F2F2;" value="#40E0D0">Eventual</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="cad_user_id" class="col-sm-2 col-form-label">Profissional</label>
                            <div class="col-sm-10">
                                <select name="cad_user_id" class="form-control" id="cad_user_id">
                                    <option value="">Selecione Usuário</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="cad_client_id" class="col-sm-2 col-form-label">Cliente</label>
                            <div class="col-sm-10">
                                <select name="cad_client_id" class="form-control" id="cad_client_id">
                                    <option value="">Selecione Usuário</option>
                                </select>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="cad_obs" class="col-sm-2 col-form-label">Observação</label>
                            <div class="col-sm-10">
                                <input type="text" name="cad_obs" class="form-control" id="cad_obs" placeholder="Descrição da Tarefa">
                            </div>
                        </div>

                        <button type="submit" name="btnCadEvento" class="btn btn-success" id="btnCadEvento">Cadastrar Tarefa</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts Bootstrap e dependências -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js" integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"></script>
    <script src='js/index.global.min.js'></script>
    <script src='js/bootstrap5/index.global.min.js'></script>
    <script src='js/core/locales-all.global.min.js'></script>

    <!-- Scripts customizados -->
    <script src="js/custom.js"></script>
    <script src="js/converter_data.js"></script>
    <script src="js/listar_usuario.js"></script>
    <script src="js/listar_cliente.js"></script>
    <script src="js/carregar_eventos.js"></script>
    <script src="js/carregar_eventos_profissional.js"></script>
    <script src="js/carregar_eventos_cliente.js"></script>
    <script src="js/editar_evento.js"></script>
    <script src="js/cadastrar_evento.js"></script>
    <script src="js/apagar_evento.js"></script>
    <script src="js/pesquisar_cliente.js"></script>
</body>

</html>