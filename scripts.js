//Transformando as informações em variaveis
const inputValue = document.getElementById("input-box")
const inputList = document.getElementById("list-container")

//Função onclick
function addTask() {
    //Armazenando apenas o valor da tarefa em uma varivavel
    const task = inputValue.value.trim()

    //Condição que ocorrerá se não for digitado nada no campo da tarefa
    if (!task) {
        alert("Digite uma tarefa");
        return;
    }


    //Criando a lista com as tarefas
    const li = document.createElement("li")

    li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <div class="buttonsRight">
    <span class="edit-btn">EDIT</span>
    <span class="delete-btn">DELETE</span>
    </div>
    `;

    //Adicionando a lista a ul 
    inputList.appendChild(li)

    //Reiniciando o input de tarefas
    inputValue.value = ""


    //Armazenando todos os botões, e textos de span em uma variavel
    const checkbox = li.querySelector("input")
    const editBtn = li.querySelector(".edit-btn")
    const deleteBtn = li.querySelector(".delete-btn")
    const taskSpan = li.querySelector("span");

    //Ao ser clicado, a tarefa vai ganhar uma classe "completed"
    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);

        updateCounters()
    })


    //Ao ser clicado, você poderá editar a tarefa
    editBtn.addEventListener("click", function () {
        const update = prompt("Editar tarefa:", taskSpan.textContent)
        if (update !== null) {
            taskSpan.textContent = update;
            li.classList.remove("completed")
        }

        checkbox.checked = false
        updateCounters()
        noTaskScan();

    })

    //Remover a tarefa
    deleteBtn.addEventListener("click", function () {
        if (confirm("Você tem certeza de que deseja excluir esta tarefa?")) {
            li.remove()

        }
        updateCounters();
        noTaskScan();
    })

    //Contador de tarefa
    const completedCounter = document.getElementById("completed-counter")
    const uncompletedCounter = document.getElementById("uncompleted-counter")

    function updateCounters() {
        const taskCompleted = document.querySelectorAll(".completed").length
        const taskUncompleted = document.querySelectorAll("li:not(.completed)").length

        completedCounter.textContent = taskCompleted
        uncompletedCounter.textContent = taskUncompleted

    }
    updateCounters(); //Está função tem que está declarada após cada ação, para sempre reiniciar o contador


    //Apagar texto de não ter tarefa, após adicionar tarefa

    function noTaskScan() {
        const noTask = document.getElementById("no-task")
        const tasks = document.querySelectorAll("li")

        if (tasks.length > 0) {
            noTask.style.display = "none";
        }
        else {
            noTask.style.display = "block";
        }
    }

    noTaskScan();
}