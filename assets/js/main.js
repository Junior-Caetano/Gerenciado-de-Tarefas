const formTarefa = document.getElementById("form-tarefa");
const listaTarefas = document.getElementById("lista-tarefas");
const filterSelect = document.getElementById("filtro");

//Array para armazenar tarefas
let tarefas = [];

//Adicionar nova tarefa
function criarTarefa(titulo, descricao) {
    const tarefa = {
       titulo: titulo,
       descricao: descricao,
       completa: false
    };

    tarefas.push(tarefa);
    salvarTarefas()
    mostrarTarefas();

}

// Função para renderizar a lista de tarefas
function mostrarTarefas() {
    
    // Limpa a lista antes de renderizar novamente
    listaTarefas.innerHTML = "";

    const filtro = filterSelect.value;
    let tarefasFiltradas = tarefas;
    if (filtro === 'completa') {
        tarefasFiltradas = tarefas.filter(tarefa => tarefa.completa);
    } else if (filtro === 'incompleta') {
        tarefasFiltradas = tarefas.filter(tarefa => !tarefa.completa);
    }

        
    // Renderiza cada tarefa na lista
    tarefasFiltradas.forEach((tarefa, index) => {
      const liTarefa = document.createElement("li");
      liTarefa.classList.add("tarefa");
  
      const titulo = document.createElement("div");
      titulo.classList.add("titulo");
      titulo.innerText = tarefa.titulo;
  
      const descricao = document.createElement("div");
      descricao.classList.add("descricao");
      descricao.innerText = tarefa.descricao;
  
      const actions = document.createElement("div");
      actions.classList.add("actions");
  
      const completarCheckbox = document.createElement("input");
      completarCheckbox.type = "checkbox";
      completarCheckbox.checked = tarefa.completa;
      completarCheckbox.addEventListener("change", () => mudarStatus(index));
  
      const completeLabel = document.createElement("label");
      completeLabel.innerText = "Completa";
  
      const editarButton = document.createElement("button");
      editarButton.classList.add("btn-editar");
      /*editarButton.innerText = " "; Opcional: Texto no botão */
      editarButton.addEventListener("click", () => mostrarEditarForm(index));
  
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("btn-excluir");
      /*deleteButton.innerText = " "; Opcional: Texto no botão */
      deleteButton.addEventListener("click", () => deletarTarefa(index));
  
      actions.appendChild(completarCheckbox);
      actions.appendChild(completeLabel);
      actions.appendChild(editarButton);
      actions.appendChild(deleteButton);
  
      liTarefa.appendChild(titulo);
      liTarefa.appendChild(descricao);
      liTarefa.appendChild(actions);
  
      listaTarefas.appendChild(liTarefa);

    });
}



// Função para marcar/desmarcar uma tarefa como completa
function mudarStatus(index) {
  tarefas[index].completa = !tarefas[index].completa;
  salvarTarefas()
  mostrarTarefas();
  
}

// Função para exibir o formulário de edição de tarefa
function mostrarEditarForm(index) {
  const tarefa = tarefas[index];

  // Cria o formulário de edição
  const editarForm = document.createElement("form");
  editarForm.classList.add("edit-form");

  const tituloLabel = document.createElement("label");
  tituloLabel.innerText = "Novo Título:";
  const tituloInput = document.createElement("input");
  tituloInput.type = "text";
  tituloInput.value = tarefa.titulo;
  tituloInput.required = true;

  const descriptionLabel = document.createElement("label");
  descriptionLabel.innerText = "Nova Descrição:";
  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.value = tarefa.descricao;
  descriptionInput.required = true;

  const updateButton = document.createElement("button");
  updateButton.classList.add("btn");
  updateButton.innerText = "Atualizar";
  updateButton.addEventListener("click", (e) => {
    e.preventDefault();
    updateTask(index, tituloInput.value, descriptionInput.value);
  });

  editarForm.appendChild(tituloLabel);
  editarForm.appendChild(tituloInput);
  editarForm.appendChild(descriptionLabel);
  editarForm.appendChild(descriptionInput);
  editarForm.appendChild(updateButton);

  // Substitui o conteúdo atual da tarefa pelo formulário de edição
  const liTarefa = listaTarefas.childNodes[index];
  liTarefa.innerHTML = "";
  liTarefa.appendChild(editarForm);
}

// Função para atualizar uma tarefa
function updateTask(index, novoTitulo, novaDescricao) {
  tarefas[index].titulo = novoTitulo;
  tarefas[index].descricao = novaDescricao;
  mostrarTarefas();
}

// Função para excluir uma tarefa
function deletarTarefa(index) {
  tarefas.splice(index, 1);
  mostrarTarefas();
}

// Event listener para o formulário de adição de tarefas
formTarefa.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("titulo-tarefa");
    const descriptionInput = document.getElementById("desc-tarefa");
    criarTarefa(titleInput.value, descriptionInput.value);
    titleInput.value = "";
    descriptionInput.value = "";
});

// Event listener para o filtro de tarefas
filterSelect.addEventListener('change', mostrarTarefas);

// Função para salvar as tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}


// Função para carregar as tarefas do localStorage
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefas');
    if (tarefasSalvas) {
      tarefas = JSON.parse(tarefasSalvas);
    }
  }

  // Função para carregar as tarefas do localStorage quando a página é carregada
window.addEventListener('DOMContentLoaded', () => {
    carregarTarefas();
    mostrarTarefas();
  });