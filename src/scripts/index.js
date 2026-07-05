const API_URL = "http://127.0.0.1:5000";

const form = document.getElementById("form-cadastro");
const listaContatos = document.getElementById("lista-contatos");
const mensagem = document.getElementById("mensagem");
const filtroNome = document.getElementById("filtro-nome");

const campoId = document.getElementById("contato-id");
const campoNome = document.getElementById("nome");
const campoSobrenome = document.getElementById("sobrenome");
const campoApelido = document.getElementById("apelido");
const campoCelular = document.getElementById("celular");
const campoEmail = document.getElementById("email");

const modalExcluir = document.getElementById("modal-excluir");
const btnCancelarExclusao = document.getElementById("btn-cancelar-exclusao");
const btnConfirmarExclusao = document.getElementById("btn-confirmar-exclusao");

let contatoPendenteExclusao = null;

function mostrarMensagem(texto, tipo = "sucesso") {
  if (mensagem) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem-status ${tipo}`;
  }
}

export function btnLimpar(botao, event) {
  event.preventDefault();

  if (confirm("Certeza que deseja limpar os dados digitados?")) {
    botao.form.reset();
    campoId.value = "";
    mostrarMensagem("Formulário limpo com sucesso.");
  }
}

function limparFormulario() {
  form.reset();
  campoId.value = "";
}

async function carregarContatos(nome = "") {
  try {
    let url = `${API_URL}/contatos`;

    if (nome) {
      url += `?nome=${encodeURIComponent(nome)}`;
    }

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro ao carregar contatos.");
    }

    const contatos = await resposta.json();
    listaContatos.innerHTML = "";

    if (!contatos.length) {
      listaContatos.innerHTML =
        '<p class="sem-contatos">Nenhum contato encontrado.</p>';
      return;
    }

    contatos.forEach((contato) => {
      listaContatos.innerHTML += `
        <div class="card" id="contato-${contato.id}">
          <div class="card-body">
            <h3><strong>${contato.nome} ${contato.sobrenome || ""}</strong></h3>
            <p><strong>Apelido:</strong> ${contato.apelido || "Não informado"}</p>
            <p><strong>Celular:</strong> ${contato.celular}</p>
            <p><strong>E-mail:</strong> ${contato.email || "Não informado"}</p>
          </div>

          <div class="card-bottom">
            <button type="button" class="btn-small btn-editar">Editar</button>
            <button type="button" class="btn-small btn-excluir">Excluir</button>
          </div>
        </div>
      `;
    });
  } catch (erro) {
    mostrarMensagem("Erro ao carregar contatos.", "erro");
    console.error(erro);
  }
}

async function salvarContato(event) {
  event.preventDefault();

  const id = campoId.value;

  const contato = {
    nome: campoNome.value.trim().toUpperCase(),
    sobrenome: campoSobrenome.value.trim().toUpperCase(),
    apelido: campoApelido.value.trim().toUpperCase(),
    celular: campoCelular.value.trim(),
    email: campoEmail.value.trim().toUpperCase(),
  };

  try {
    const resposta = await fetch(
      id ? `${API_URL}/contatos/${id}` : `${API_URL}/contatos`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contato),
      },
    );

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(
        dados.erros?.join(" ") || dados.erro || "Erro ao salvar contato.",
      );
    }

    mostrarMensagem(
      id
        ? "Contato atualizado com sucesso."
        : "Contato cadastrado com sucesso.",
      "sucesso",
    );

    limparFormulario();
    carregarContatos(filtroNome?.value?.trim() || "");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
}

async function editarContato(id) {
  try {
    const resposta = await fetch(`${API_URL}/contatos/${id}`);

    if (!resposta.ok) {
      throw new Error("Erro ao buscar contato.");
    }

    const contato = await resposta.json();

    campoId.value = contato.id;
    campoNome.value = contato.nome || "";
    campoSobrenome.value = contato.sobrenome || "";
    campoApelido.value = contato.apelido || "";
    campoCelular.value = contato.celular || "";
    campoEmail.value = contato.email || "";

    mostrarMensagem("Contato carregado para edição.", "sucesso");
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (erro) {
    mostrarMensagem("Erro ao carregar contato para edição.", "erro");
    console.error(erro);
  }
}

function abrirModalExclusao(id) {
  contatoPendenteExclusao = id;
  modalExcluir.classList.remove("hidden");
  modalExcluir.setAttribute("aria-hidden", "false");
}

function fecharModalExclusao() {
  contatoPendenteExclusao = null;
  modalExcluir.classList.add("hidden");
  modalExcluir.setAttribute("aria-hidden", "true");
}

async function confirmarExclusao() {
  if (!contatoPendenteExclusao) return;

  try {
    const resposta = await fetch(
      `${API_URL}/contatos/${contatoPendenteExclusao}`,
      {
        method: "DELETE",
      },
    );

    if (!resposta.ok) {
      throw new Error("Erro ao excluir contato.");
    }

    mostrarMensagem("Contato excluído com sucesso.", "sucesso");
    fecharModalExclusao();
    carregarContatos(filtroNome?.value?.trim() || "");
  } catch (erro) {
    mostrarMensagem("Erro ao excluir contato.", "erro");
    console.error(erro);
  }
}

listaContatos.addEventListener("click", (event) => {
  const botaoEditar = event.target.closest(".btn-editar");
  const botaoExcluir = event.target.closest(".btn-excluir");

  if (!botaoEditar && !botaoExcluir) return;

  const card = event.target.closest(".card");
  if (!card) return;

  const contatoId = card.id.replace("contato-", "");

  if (botaoEditar) {
    editarContato(contatoId);
    return;
  }

  if (botaoExcluir) {
    abrirModalExclusao(contatoId);
  }
});

form?.addEventListener("submit", salvarContato);

document.getElementById("btn-buscar")?.addEventListener("click", () => {
  carregarContatos(filtroNome.value.trim());
});

document.getElementById("btn-listar")?.addEventListener("click", () => {
  if (filtroNome) filtroNome.value = "";
  carregarContatos();
});

btnCancelarExclusao?.addEventListener("click", fecharModalExclusao);
btnConfirmarExclusao?.addEventListener("click", confirmarExclusao);

modalExcluir?.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-backdrop")) {
    fecharModalExclusao();
  }
});

window.btnLimpar = btnLimpar;

window.addEventListener("DOMContentLoaded", () => {
  carregarContatos();
});
