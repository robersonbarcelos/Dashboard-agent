const STORAGE_KEY = "painel-roberson-v4";
const DEFAULT_CLIENTS = ["Cliente 1", "Cliente 2", "Cliente 3", "Cliente 4", "Cliente 5", "Cliente 6"];
const INVESTMENT_BLOCKS = ["Estudar mercado", "Backtesting e analise de setups", "Acompanhamento de trades"];

const seedData = {
  tasks: [
    {
      id: "T-001",
      title: "Roteiro de reels - Cliente 1",
      front: "Social Media",
      client: "Cliente 1",
      type: "Roteiro",
      status: "Em execucao",
      priority: "Alta",
      due: "Hoje",
      estimate: 90,
      spent: 55,
      next: "Finalizar gancho, CTA e enviar para aprovacao.",
      taskMode: "Pontual",
      recurrence: "Nao se aplica",
      subtasks: [
        { id: "S-001-1", title: "Definir gancho", done: true },
        { id: "S-001-2", title: "Escrever roteiro", done: true },
        { id: "S-001-3", title: "Enviar para aprovacao", done: false },
      ],
      updates: [
        { id: "U-001-1", text: "Gancho revisado; falta CTA final.", status: "Em execucao", createdAt: new Date().toISOString() },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "T-002",
      title: "Editar video institucional - Cliente 2",
      front: "Social Media",
      client: "Cliente 2",
      type: "Edicao",
      status: "Aguardando",
      priority: "Media",
      due: "Amanha",
      estimate: 180,
      spent: 130,
      next: "Aguardar aprovacao do primeiro corte.",
      taskMode: "Pontual",
      recurrence: "Nao se aplica",
      subtasks: [
        { id: "S-002-1", title: "Montar primeiro corte", done: true },
        { id: "S-002-2", title: "Receber feedback do cliente", done: false },
      ],
      updates: [
        { id: "U-002-1", text: "Primeiro corte enviado; aguardando cliente aprovar.", status: "Aguardando", createdAt: new Date().toISOString() },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "T-003",
      title: "Calendario editorial semanal - Cliente 3",
      front: "Social Media",
      client: "Cliente 3",
      type: "Planejamento",
      status: "A fazer",
      priority: "Alta",
      due: "Hoje",
      estimate: 120,
      spent: 0,
      next: "Separar temas e ordem de producao.",
      taskMode: "Recorrente",
      recurrence: "Semanal",
      subtasks: [
        { id: "S-003-1", title: "Listar temas", done: false },
        { id: "S-003-2", title: "Definir ordem de producao", done: false },
        { id: "S-003-3", title: "Validar calendario", done: false },
      ],
      updates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "T-004",
      title: "Separar pendencias pessoais da semana",
      front: "Pessoal",
      client: "Pessoal",
      type: "Rotina",
      status: "A fazer",
      priority: "Baixa",
      due: "Sexta",
      estimate: 40,
      spent: 0,
      next: "Transformar lembretes soltos em lista.",
      taskMode: "Recorrente",
      recurrence: "Semanal",
      subtasks: [],
      updates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "T-005",
      title: "Leitura da abertura dos indices",
      front: "Investimentos",
      client: "Mercado",
      type: "Estudar mercado",
      status: "Concluida",
      priority: "Media",
      due: "Hoje",
      estimate: 45,
      spent: 50,
      next: "Registrar leitura principal no diario.",
      taskMode: "Recorrente",
      recurrence: "Diaria",
      subtasks: [
        { id: "S-005-1", title: "Ler abertura", done: true },
        { id: "S-005-2", title: "Registrar vies", done: true },
      ],
      updates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "T-006",
      title: "Backtesting setup rompimento",
      front: "Investimentos",
      client: "Setups",
      type: "Backtesting e analise de setups",
      status: "A fazer",
      priority: "Alta",
      due: "Hoje",
      estimate: 120,
      spent: 0,
      next: "Definir amostra, regra de entrada e stop.",
      taskMode: "Pontual",
      recurrence: "Nao se aplica",
      subtasks: [
        { id: "S-006-1", title: "Definir amostra", done: false },
        { id: "S-006-2", title: "Rodar amostra", done: false },
        { id: "S-006-3", title: "Registrar estatistica", done: false },
      ],
      updates: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: "T-007",
      title: "Atualizar trades em aberto",
      front: "Investimentos",
      client: "Trades",
      type: "Acompanhamento de trades",
      status: "Atrasada",
      priority: "Alta",
      due: "Ontem",
      estimate: 30,
      spent: 15,
      next: "Atualizar status, risco e ponto de invalidacao.",
      taskMode: "Recorrente",
      recurrence: "Diaria",
      subtasks: [
        { id: "S-007-1", title: "Checar trades abertos", done: false },
        { id: "S-007-2", title: "Atualizar risco", done: false },
      ],
      updates: [
        { id: "U-007-1", text: "Pendente atualizar risco dos trades em aberto.", status: "Atrasada", createdAt: new Date().toISOString() },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "T-008",
      title: "Organizar bloco de execucao da tarde",
      front: "Agenda",
      client: "Agenda",
      type: "Planejamento",
      status: "A fazer",
      priority: "Media",
      due: "Hoje",
      estimate: 25,
      spent: 0,
      next: "Definir 3 prioridades antes de iniciar producao.",
      taskMode: "Recorrente",
      recurrence: "Diaria",
      subtasks: [],
      updates: [],
      createdAt: new Date().toISOString(),
    },
  ],
  timeLogs: [
    { id: "L-001", taskId: "T-001", front: "Social Media", client: "Cliente 1", type: "Roteiro", minutes: 55, day: "Hoje", createdAt: new Date().toISOString() },
    { id: "L-002", taskId: "T-002", front: "Social Media", client: "Cliente 2", type: "Edicao", minutes: 130, day: "Semana", createdAt: new Date().toISOString() },
    { id: "L-003", taskId: "T-005", front: "Investimentos", client: "Mercado", type: "Estudar mercado", minutes: 50, day: "Hoje", createdAt: new Date().toISOString() },
  ],
  activeTimer: null,
};

const state = {
  view: "today",
  mode: "focus",
  front: "all",
  status: "all",
  quick: "today",
  client: "all",
  data: loadData(),
};

const viewMeta = {
  today: ["Hoje", "Prioridades, atrasos e proximas acoes."],
  tasks: ["Tarefas", "Adicionar, filtrar e operar tarefas."],
  clients: ["Clientes", "Carga de trabalho e pendencias por cliente."],
  investments: ["Investimentos", "Estudo de mercado, backtesting e acompanhamento de trades."],
  time: ["Tempo", "Cronometro simples e historico de registros."],
  analysis: ["Analise", "Leitura semanal de gargalos, carga e produtividade."],
};

const modeMeta = {
  focus: ["Hoje", "Execucao limpa do que importa agora."],
  board: ["Board", "Fluxo visual por status."],
  list: ["Lista", "Tabela operacional para volume e filtros."],
  calendar: ["Calendario", "Prazos agrupados por periodo."],
  summary: ["Resumo", "Leitura executiva de risco, carga e proximas acoes."],
};

const statusClass = {
  Atrasada: "status-late",
  "Em execucao": "status-running",
  Aguardando: "status-waiting",
  Concluida: "status-done",
};

const priorityClass = {
  Alta: "priority-high",
  Media: "priority-medium",
};

function loadData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored?.tasks && stored?.timeLogs) return normalizeData(stored);
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return normalizeData(structuredClone(seedData));
}

function normalizeData(data) {
  return {
    tasks: (data.tasks || []).map(normalizeTask),
    timeLogs: data.timeLogs || [],
    activeTimer: data.activeTimer || null,
  };
}

function normalizeTask(task) {
  return {
    taskMode: "Pontual",
    recurrence: "Nao se aplica",
    subtasks: [],
    updates: [],
    ...task,
    subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
    updates: Array.isArray(task.updates) ? task.updates : [],
  };
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[char]);
}

function minutesToHours(minutes) {
  const safeMinutes = Math.max(0, Math.round(Number(minutes) || 0));
  const hours = Math.floor(safeMinutes / 60);
  const rest = safeMinutes % 60;
  if (!hours) return `${rest}min`;
  if (!rest) return `${hours}h`;
  return `${hours}h${String(rest).padStart(2, "0")}`;
}

function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function currentTimerMinutes() {
  const timer = state.data.activeTimer;
  if (!timer) return 0;
  return Math.max(1, Math.ceil((Date.now() - timer.startedAt) / 60000));
}

function slugFront(front) {
  return String(front).replace(/\s+/g, "-");
}

function subtaskSummary(task) {
  const total = task.subtasks?.length || 0;
  const done = task.subtasks?.filter((item) => item.done).length || 0;
  return { total, done };
}

function splitLines(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function allClients() {
  const fromTasks = state.data.tasks.map((task) => task.client).filter(Boolean);
  return [...new Set([...DEFAULT_CLIENTS, ...fromTasks])];
}

function findTask(taskId) {
  return state.data.tasks.find((task) => task.id === taskId);
}

function matchesQuick(task) {
  if (state.quick === "today") return task.due === "Hoje" || task.status === "Atrasada" || task.status === "Em execucao";
  if (state.quick === "late") return task.status === "Atrasada";
  if (state.quick === "week") return ["Hoje", "Amanha", "Semana", "Sexta"].includes(task.due);
  if (state.quick === "social") return task.front === "Social Media";
  if (state.quick === "investments") return task.front === "Investimentos";
  return true;
}

function filteredTasks() {
  return state.data.tasks.filter((task) => {
    const frontMatch = state.front === "all" || task.front === state.front;
    const statusMatch = state.status === "all" || task.status === state.status;
    const clientMatch = state.client === "all" || task.client === state.client;
    return frontMatch && statusMatch && clientMatch && matchesQuick(task);
  });
}

function addTask(event) {
  event.preventDefault();
  const form = event.currentTarget;
  syncRecurrenceField(form);
  const task = {
    id: `T-${Date.now()}`,
    title: form.title.value.trim(),
    front: form.front.value,
    client: form.client.value.trim() || form.front.value,
    type: form.type.value.trim() || "Geral",
    status: "A fazer",
    priority: form.priority.value,
    due: form.due.value,
    estimate: Number(form.estimate.value) || 30,
    spent: 0,
    next: form.next.value.trim() || "Definir proxima acao.",
    taskMode: form.taskMode.value,
    recurrence: form.taskMode.value === "Recorrente" ? form.recurrence.value : "Nao se aplica",
    subtasks: splitLines(form.subtasks.value).map((title, index) => ({
      id: `S-${Date.now()}-${index}`,
      title,
      done: false,
    })),
    updates: [],
    createdAt: new Date().toISOString(),
  };

  if (!task.title) return;
  state.data.tasks.unshift(task);
  saveData();
  form.reset();
  form.front.value = "Social Media";
  form.priority.value = "Media";
  form.due.value = "Hoje";
  form.taskMode.value = "Pontual";
  syncRecurrenceField(form);
  render();
}

function syncRecurrenceField(form) {
  const taskMode = form?.elements?.taskMode;
  const recurrence = form?.elements?.recurrence;
  const recurrenceField = recurrence?.closest(".form-field");
  if (!taskMode || !recurrence) return;

  const isRecurring = taskMode.value === "Recorrente";
  recurrence.disabled = !isRecurring;
  recurrence.required = isRecurring;
  recurrenceField?.classList.toggle("is-disabled", !isRecurring);

  if (!isRecurring) {
    recurrence.value = "Nao se aplica";
    return;
  }

  if (recurrence.value === "Nao se aplica") {
    recurrence.value = "Diaria";
  }
}

function startTimer(taskId) {
  const current = state.data.activeTimer;
  if (current?.taskId === taskId) return;
  if (current) finishTimer(false);

  state.data.tasks = state.data.tasks.map((task) => ({
    ...task,
    status: task.id === taskId ? "Em execucao" : task.status,
  }));
  state.data.activeTimer = { taskId, startedAt: Date.now() };
  saveData();
  render();
}

function finishTimer(markWaiting = true) {
  const timer = state.data.activeTimer;
  if (!timer) return;
  const task = findTask(timer.taskId);
  if (!task) {
    state.data.activeTimer = null;
    saveData();
    render();
    return;
  }

  const minutes = currentTimerMinutes();
  task.spent = (Number(task.spent) || 0) + minutes;
  if (markWaiting && task.status !== "Concluida") task.status = "Aguardando";
  state.data.timeLogs.unshift({
    id: `L-${Date.now()}`,
    taskId: task.id,
    front: task.front,
    client: task.client,
    type: task.type,
    minutes,
    day: "Hoje",
    createdAt: new Date().toISOString(),
  });
  state.data.activeTimer = null;
  saveData();
  render();
}

function completeTask(taskId) {
  const task = findTask(taskId);
  if (!task) return;
  if (state.data.activeTimer?.taskId === taskId) finishTimer(false);
  task.status = "Concluida";
  task.completedAt = new Date().toISOString();
  saveData();
  render();
}

function reopenTask(taskId) {
  const task = findTask(taskId);
  if (!task) return;
  task.status = "A fazer";
  delete task.completedAt;
  saveData();
  render();
}

function duplicateTask(taskId) {
  const task = findTask(taskId);
  if (!task) return;
  state.data.tasks.unshift({
    ...task,
    id: `T-${Date.now()}`,
    title: `${task.title} (copia)`,
    status: "A fazer",
    spent: 0,
    createdAt: new Date().toISOString(),
    completedAt: undefined,
    subtasks: (task.subtasks || []).map((item, index) => ({ ...item, id: `S-${Date.now()}-${index}`, done: false })),
    updates: [],
  });
  saveData();
  render();
}

function toggleSubtask(taskId, subtaskId) {
  const task = findTask(taskId);
  if (!task) return;
  const item = task.subtasks.find((subtask) => subtask.id === subtaskId);
  if (!item) return;
  item.done = !item.done;
  task.updates.unshift({
    id: `U-${Date.now()}`,
    text: `${item.done ? "Concluida etapa" : "Reaberta etapa"}: ${item.title}`,
    status: task.status,
    createdAt: new Date().toISOString(),
  });
  saveData();
  render();
}

function addTaskUpdate(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const task = findTask(form.dataset.task);
  if (!task) return;
  const text = form.update.value.trim();
  if (!text) return;
  task.status = form.status.value;
  task.next = form.next.value.trim() || task.next;
  task.updates.unshift({
    id: `U-${Date.now()}`,
    text,
    status: task.status,
    createdAt: new Date().toISOString(),
  });
  saveData();
  render();
}

function renderSubtasks(task) {
  const subtasks = task.subtasks || [];
  if (!subtasks.length) return "";
  const { done, total } = subtaskSummary(task);
  return `
    <div class="subtask-block">
      <span class="task-meta">${done}/${total} etapas feitas</span>
      <div class="subtask-list">
        ${subtasks.map((item) => `
          <button class="subtask-pill ${item.done ? "done" : ""}" data-action="toggle-subtask" data-task="${task.id}" data-subtask="${item.id}" type="button">
            <span>${item.done ? "Feito" : "Aberto"}</span>
            ${escapeHtml(item.title)}
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderUpdates(task) {
  const updates = task.updates || [];
  const latest = updates.slice(0, 3);
  const history = latest.length
    ? latest.map((update) => `
      <li>
        <strong>${escapeHtml(update.status)}</strong>
        <span>${escapeHtml(update.text)}</span>
      </li>
    `).join("")
    : `<li><span>Nenhuma atualizacao registrada ainda.</span></li>`;

  return `
    <details class="update-box">
      <summary>Atualizar andamento (${updates.length})</summary>
      <form class="update-form" data-task="${task.id}">
        <label>Status
          <select name="status">
            <option ${task.status === "A fazer" ? "selected" : ""}>A fazer</option>
            <option ${task.status === "Em execucao" ? "selected" : ""}>Em execucao</option>
            <option ${task.status === "Aguardando" ? "selected" : ""}>Aguardando</option>
            <option ${task.status === "Concluida" ? "selected" : ""}>Concluida</option>
            <option ${task.status === "Atrasada" ? "selected" : ""}>Atrasada</option>
          </select>
        </label>
        <label>Proxima acao
          <input name="next" value="${escapeHtml(task.next)}" placeholder="Ex: aguardar cliente aprovar" />
        </label>
        <label class="full">Registro
          <textarea name="update" required placeholder="Ex: feito primeiro corte, aguardando cliente aprovar"></textarea>
        </label>
        <button class="primary-action" type="submit">Salvar andamento</button>
      </form>
      <ul class="timeline">${history}</ul>
    </details>
  `;
}

function taskRow(task) {
  const progress = Math.min(100, Math.round(((Number(task.spent) || 0) / Math.max(Number(task.estimate) || 1, 1)) * 100));
  const isActive = state.data.activeTimer?.taskId === task.id;
  const elapsed = isActive ? ` + ${minutesToHours(currentTimerMinutes())} rodando` : "";
  const { done, total } = subtaskSummary(task);
  const actionButtons = task.status === "Concluida"
    ? `<button class="secondary-action" data-action="reopen" data-task="${task.id}">Reabrir</button>`
    : `
        <button class="secondary-action" data-action="start" data-task="${task.id}">${isActive ? "Rodando" : "Iniciar"}</button>
        ${isActive ? `<button class="primary-action" data-action="finish">Finalizar tempo</button>` : ""}
        <button class="primary-action" data-action="complete" data-task="${task.id}">Concluir</button>
      `;

  return `
    <article class="task-row">
      <span class="task-stripe stripe-${slugFront(task.front)}" aria-hidden="true"></span>
      <div>
        <p class="task-title">${escapeHtml(task.title)}</p>
        <div class="task-meta">
          <span>${escapeHtml(task.front)}</span>
          <span>${escapeHtml(task.client)}</span>
          <span>${escapeHtml(task.type)}</span>
          <span>${escapeHtml(task.taskMode)}</span>
          ${task.taskMode === "Recorrente" ? `<span>${escapeHtml(task.recurrence)}</span>` : ""}
          <span>Prazo: ${escapeHtml(task.due)}</span>
          <span>${minutesToHours(task.spent)} / ${minutesToHours(task.estimate)}${elapsed}</span>
          ${total ? `<span>Etapas: ${done}/${total}</span>` : ""}
        </div>
        <p class="task-next">Proxima acao: ${escapeHtml(task.next)}</p>
        ${renderSubtasks(task)}
        ${renderUpdates(task)}
        <div class="progress-track" aria-label="Progresso de tempo">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
      </div>
      <div class="task-actions">
        <span class="chip ${statusClass[task.status] || ""}">${escapeHtml(task.status)}</span>
        <span class="chip ${priorityClass[task.priority] || ""}">${escapeHtml(task.priority)}</span>
        <div class="row-actions">
          ${actionButtons}
          <button class="secondary-action" data-action="duplicate" data-task="${task.id}">Duplicar</button>
        </div>
      </div>
    </article>
  `;
}

function panel(title, subtitle, content, extraClass = "") {
  return `
    <section class="panel ${extraClass}">
      <div class="panel-header">
        <h2>${title}</h2>
        <small>${subtitle}</small>
      </div>
      ${content}
    </section>
  `;
}

function renderTaskList(list) {
  if (!list.length) return `<div class="empty-state">Nenhuma tarefa encontrada com os filtros atuais.</div>`;
  return `<div class="task-list">${list.map(taskRow).join("")}</div>`;
}

function compactTaskCard(task) {
  const isActive = state.data.activeTimer?.taskId === task.id;
  return `
    <article class="board-card">
      <p class="task-title small">${escapeHtml(task.title)}</p>
      <div class="task-meta">
        <span>${escapeHtml(task.front)}</span>
        <span>${escapeHtml(task.client)}</span>
        <span>Prazo: ${escapeHtml(task.due)}</span>
      </div>
      <p class="task-next">${escapeHtml(task.next)}</p>
      <div class="task-meta">
        <span class="chip ${priorityClass[task.priority] || ""}">${escapeHtml(task.priority)}</span>
        <span class="chip">${escapeHtml(task.taskMode === "Recorrente" ? task.recurrence : "Pontual")}</span>
      </div>
      <div class="row-actions" style="margin-top: 8px;">
        ${task.status === "Concluida"
          ? `<button class="secondary-action" data-action="reopen" data-task="${task.id}">Reabrir</button>`
          : `
            <button class="secondary-action" data-action="start" data-task="${task.id}">${isActive ? "Rodando" : "Iniciar"}</button>
            <button class="primary-action" data-action="complete" data-task="${task.id}">Concluir</button>
          `}
      </div>
    </article>
  `;
}

function renderFocusMode() {
  const focusTasks = state.data.tasks
    .filter((task) => ["Atrasada", "Em execucao"].includes(task.status) || task.due === "Hoje")
    .filter((task) => state.front === "all" || task.front === state.front)
    .filter((task) => state.status === "all" || task.status === state.status)
    .sort((a, b) => {
      const priorityScore = { Alta: 0, Media: 1, Baixa: 2 };
      const statusScore = { Atrasada: 0, "Em execucao": 1, "A fazer": 2, Aguardando: 3, Concluida: 4 };
      return (statusScore[a.status] ?? 5) - (statusScore[b.status] ?? 5)
        || (priorityScore[a.priority] ?? 3) - (priorityScore[b.priority] ?? 3);
    });
  const active = state.data.activeTimer ? findTask(state.data.activeTimer.taskId) : null;
  const activeBlock = active
    ? `<div class="notice">Rodando agora: <strong>${escapeHtml(active.title)}</strong> | ${minutesToHours(currentTimerMinutes())}</div>`
    : `<div class="empty-state">Nenhuma tarefa rodando. Inicie uma prioridade quando comecar.</div>`;

  return [
    panel("Foco do dia", "atrasadas, em execucao e prazo hoje", renderTaskList(focusTasks), "full"),
    panel("Agora", "cronometro e execucao atual", activeBlock),
    panel("Adicionar rapido", "entrada manual leve", taskForm()),
  ].join("");
}

function renderBoardMode() {
  const statuses = ["A fazer", "Em execucao", "Aguardando", "Concluida"];
  const tasks = filteredTasks().filter((task) => task.status !== "Atrasada");
  const lateTasks = filteredTasks().filter((task) => task.status === "Atrasada");
  const columns = statuses.map((status) => {
    const columnTasks = tasks.filter((task) => task.status === status);
    return `
      <section class="board-column">
        <div class="board-column-header">
          <strong>${status}</strong>
          <span class="chip">${columnTasks.length}</span>
        </div>
        <div class="board-card-list">
          ${columnTasks.length ? columnTasks.map(compactTaskCard).join("") : `<div class="empty-state">Sem tarefas.</div>`}
        </div>
      </section>
    `;
  }).join("");

  return [
    panel("Board operacional", "fluxo simples no estilo Kanban", `<div class="board-grid">${columns}</div>`, "full"),
    lateTasks.length ? panel("Atrasadas", "fora do fluxo normal", renderTaskList(lateTasks), "full") : "",
  ].join("");
}

function renderListMode() {
  const rows = filteredTasks().map((task) => `
    <tr>
      <td>
        <div class="table-title">
          <strong>${escapeHtml(task.title)}</strong>
          <span class="task-meta">${escapeHtml(task.next)}</span>
        </div>
      </td>
      <td>${escapeHtml(task.front)}</td>
      <td>${escapeHtml(task.client)}</td>
      <td><span class="chip ${statusClass[task.status] || ""}">${escapeHtml(task.status)}</span></td>
      <td><span class="chip ${priorityClass[task.priority] || ""}">${escapeHtml(task.priority)}</span></td>
      <td>${escapeHtml(task.due)}</td>
      <td>${escapeHtml(task.taskMode === "Recorrente" ? task.recurrence : "Pontual")}</td>
      <td>${minutesToHours(task.spent)} / ${minutesToHours(task.estimate)}</td>
      <td>
        <div class="table-actions">
          ${task.status === "Concluida"
            ? `<button class="secondary-action" data-action="reopen" data-task="${task.id}">Reabrir</button>`
            : `<button class="secondary-action" data-action="start" data-task="${task.id}">Iniciar</button><button class="primary-action" data-action="complete" data-task="${task.id}">Concluir</button>`}
        </div>
      </td>
    </tr>
  `).join("");

  const table = `
    <div class="task-table">
      <table>
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>Frente</th>
            <th>Projeto</th>
            <th>Status</th>
            <th>Prioridade</th>
            <th>Prazo</th>
            <th>Recorrencia</th>
            <th>Tempo</th>
            <th>Acao</th>
          </tr>
        </thead>
        <tbody>${rows || `<tr><td colspan="9">Nenhuma tarefa encontrada com os filtros atuais.</td></tr>`}</tbody>
      </table>
    </div>
  `;

  return [
    panel("Nova tarefa", "entrada manual rapida", taskForm(), "full"),
    panel("Lista operacional", "volume, status e proximas acoes", table, "full"),
  ].join("");
}

function renderCalendarMode() {
  const buckets = ["Hoje", "Amanha", "Semana", "Sexta", "Sem prazo"];
  const tasks = filteredTasks();
  const columns = buckets.map((due) => {
    const dueTasks = tasks.filter((task) => task.due === due);
    return `
      <section class="calendar-day">
        <div class="calendar-day-header">
          <strong>${due}</strong>
          <span class="chip">${dueTasks.length}</span>
        </div>
        <div class="board-card-list">
          ${dueTasks.length ? dueTasks.map(compactTaskCard).join("") : `<div class="empty-state">Livre.</div>`}
        </div>
      </section>
    `;
  }).join("");

  return panel("Calendario operacional", "prazos agrupados por periodo", `<div class="calendar-grid">${columns}</div>`, "full");
}

function renderSummaryMode() {
  const open = state.data.tasks.filter((task) => task.status !== "Concluida").length;
  const done = state.data.tasks.filter((task) => task.status === "Concluida").length;
  const late = state.data.tasks.filter((task) => task.status === "Atrasada").length;
  const waiting = state.data.tasks.filter((task) => task.status === "Aguardando").length;
  const high = state.data.tasks.filter((task) => task.priority === "Alta" && task.status !== "Concluida").length;
  const today = state.data.tasks.filter((task) => task.due === "Hoje" && task.status !== "Concluida").length;
  const cards = `
    <div class="summary-grid">
      <article class="summary-card"><strong>${open}</strong><span>Abertas</span></article>
      <article class="summary-card"><strong>${late}</strong><span>Atrasadas</span></article>
      <article class="summary-card"><strong>${high}</strong><span>Alta prioridade</span></article>
      <article class="summary-card"><strong>${today}</strong><span>Com prazo hoje</span></article>
      <article class="summary-card"><strong>${waiting}</strong><span>Aguardando resposta</span></article>
      <article class="summary-card"><strong>${done}</strong><span>Concluidas</span></article>
    </div>
  `;
  const critical = state.data.tasks
    .filter((task) => task.status === "Atrasada" || (task.priority === "Alta" && task.status !== "Concluida"))
    .slice(0, 6);
  const next = state.data.tasks
    .filter((task) => task.status !== "Concluida")
    .slice(0, 6);

  return [
    panel("Resumo executivo", "indicadores de decisao", cards, "full"),
    panel("Pontos criticos", "resolver antes de abrir mais fila", renderTaskList(critical)),
    panel("Proximas acoes", "fila objetiva", renderTaskList(next)),
  ].join("");
}

function renderModeContent() {
  if (state.mode === "focus") return renderFocusMode();
  if (state.mode === "board") return renderBoardMode();
  if (state.mode === "list") return renderListMode();
  if (state.mode === "calendar") return renderCalendarMode();
  if (state.mode === "summary") return renderSummaryMode();
  return renderFocusMode();
}

function taskForm() {
  return `
    <form id="taskForm" class="form-grid">
      <label class="form-field full">Titulo
        <input name="title" required placeholder="Ex: Cliente 1 - editar reels 03" />
      </label>
      <label class="form-field">Frente
        <select name="front">
          <option>Social Media</option>
          <option>Pessoal</option>
          <option>Investimentos</option>
          <option>Agenda</option>
        </select>
      </label>
      <label class="form-field">Cliente/projeto
        <input name="client" placeholder="Cliente 1, Pessoal, Mercado..." />
      </label>
      <label class="form-field">Tipo
        <input name="type" placeholder="Roteiro, Edicao, Backtesting..." />
      </label>
      <label class="form-field">Natureza
        <select name="taskMode">
          <option>Pontual</option>
          <option>Recorrente</option>
        </select>
      </label>
      <label class="form-field">Recorrencia
        <select name="recurrence">
          <option value="Nao se aplica">Nao se aplica</option>
          <option>Diaria</option>
          <option>Semanal</option>
          <option>Quinzenal</option>
          <option>Mensal</option>
        </select>
      </label>
      <label class="form-field">Prazo
        <select name="due">
          <option>Hoje</option>
          <option>Amanha</option>
          <option>Semana</option>
          <option>Sexta</option>
          <option>Sem prazo</option>
        </select>
      </label>
      <label class="form-field">Prioridade
        <select name="priority">
          <option>Media</option>
          <option>Alta</option>
          <option>Baixa</option>
        </select>
      </label>
      <label class="form-field">Estimativa min
        <input name="estimate" type="number" min="5" step="5" value="30" />
      </label>
      <label class="form-field full">Proxima acao
        <textarea name="next" placeholder="Qual e o proximo movimento objetivo?"></textarea>
      </label>
      <label class="form-field full">Etapas / subtarefas
        <textarea name="subtasks" placeholder="Uma etapa por linha. Ex:&#10;Separar arquivos&#10;Editar primeira versao&#10;Enviar para aprovacao"></textarea>
      </label>
      <div class="form-actions">
        <button class="primary-action" type="submit">Adicionar tarefa</button>
        <span class="task-meta">Classifique como pontual ou recorrente antes de salvar.</span>
      </div>
    </form>
  `;
}

function renderToday() {
  const todayTasks = filteredTasks();
  const lateTasks = state.data.tasks.filter((task) => task.status === "Atrasada");
  const nextActions = todayTasks.slice(0, 5).map((task) => `
    <article class="task-row">
      <span class="task-stripe stripe-${slugFront(task.front)}" aria-hidden="true"></span>
      <div>
        <p class="task-title">${escapeHtml(task.next)}</p>
        <div class="task-meta">
          <span>${escapeHtml(task.title)}</span>
          <span>${escapeHtml(task.front)}</span>
          <span>${escapeHtml(task.client)}</span>
        </div>
      </div>
      <div class="task-actions">
        <span class="chip ${statusClass[task.status] || ""}">${escapeHtml(task.status)}</span>
      </div>
    </article>
  `).join("");

  return [
    panel("Prioridades do dia", "tarefas que devem aparecer primeiro", renderTaskList(todayTasks)),
    panel("Proximas acoes", "comando objetivo para executar", nextActions || `<div class="empty-state">Sem acoes pendentes.</div>`),
    panel("Atrasadas", `${lateTasks.length} ponto(s) de atencao`, renderTaskList(lateTasks), "full"),
  ].join("");
}

function renderTasks() {
  const clientButtons = ["all", ...allClients()].map((client) => `
    <button class="quick-chip ${state.client === client ? "active" : ""}" data-client="${escapeHtml(client)}">
      ${client === "all" ? "Todos clientes" : escapeHtml(client)}
    </button>
  `).join("");

  return [
    panel("Nova tarefa", "entrada manual rapida", taskForm(), "full"),
    panel("Filtro por cliente", "social media sem misturar tudo", `<div class="quick-filters">${clientButtons}</div>`, "full"),
    panel("Lista operacional", "tarefas filtradas", renderTaskList(filteredTasks()), "full"),
  ].join("");
}

function renderClients() {
  const cards = allClients().map((client) => {
    const clientTasks = state.data.tasks.filter((task) => task.client === client);
    const open = clientTasks.filter((task) => task.status !== "Concluida").length;
    const late = clientTasks.filter((task) => task.status === "Atrasada").length;
    const minutes = state.data.timeLogs.filter((log) => log.client === client).reduce((sum, log) => sum + log.minutes, 0);
    const nextTask = clientTasks.find((task) => task.status !== "Concluida");
    return `
      <article class="client-card">
        <strong>${escapeHtml(client)}</strong>
        <span>${open} aberta(s) | ${late} atrasada(s)</span>
        <span>${minutesToHours(minutes)} registrados</span>
        <span>${nextTask ? escapeHtml(nextTask.next) : "Sem proxima acao cadastrada"}</span>
        <button data-client="${escapeHtml(client)}">Ver tarefas</button>
      </article>
    `;
  }).join("");

  return [
    panel("Clientes Social Media", "visao por carga e proxima acao", `<div class="client-grid">${cards}</div>`, "full"),
    panel("Fila filtrada", state.client === "all" ? "selecione um cliente" : escapeHtml(state.client), renderTaskList(filteredTasks()), "full"),
  ].join("");
}

function renderInvestments() {
  const blocks = INVESTMENT_BLOCKS.map((type) => {
    const blockTasks = state.data.tasks.filter((task) => task.front === "Investimentos" && task.type === type);
    const open = blockTasks.filter((task) => task.status !== "Concluida").length;
    const minutes = state.data.timeLogs.filter((log) => log.front === "Investimentos" && log.type === type).reduce((sum, log) => sum + log.minutes, 0);
    const next = blockTasks.find((task) => task.status !== "Concluida")?.next || "Sem proxima acao pendente.";
    return `
      <article class="work-card">
        <strong>${escapeHtml(type)}</strong>
        <span>${open} aberta(s)</span>
        <span>${minutesToHours(minutes)} registrados</span>
        <span>${escapeHtml(next)}</span>
      </article>
    `;
  }).join("");

  const investmentTasks = state.data.tasks.filter((task) => task.front === "Investimentos").filter(matchesQuick);
  return [
    panel("Blocos de investimento", "escopo atual", `<div class="work-grid">${blocks}</div>`, "full"),
    panel("Fila de investimentos", "planejamento e acompanhamento; execucao real exige confirmacao fora do painel", renderTaskList(investmentTasks), "full"),
  ].join("");
}

function renderTime() {
  const active = state.data.activeTimer ? findTask(state.data.activeTimer.taskId) : null;
  const activePanel = active
    ? `
      <div class="notice">
        Rodando agora: <strong>${escapeHtml(active.title)}</strong> | ${minutesToHours(currentTimerMinutes())}
      </div>
      <div class="form-actions" style="margin-top: 10px;">
        <button class="primary-action" data-action="finish">Finalizar tempo</button>
        <button class="secondary-action" data-action="complete" data-task="${active.id}">Concluir tarefa</button>
      </div>
    `
    : `<div class="empty-state">Nenhum cronometro ativo. Inicie por uma tarefa.</div>`;

  const rows = state.data.timeLogs.map((log) => `
    <article class="task-row">
      <span class="task-stripe stripe-${slugFront(log.front)}" aria-hidden="true"></span>
      <div>
        <p class="task-title">${escapeHtml(log.type)}</p>
        <div class="task-meta">
          <span>${escapeHtml(log.front)}</span>
          <span>${escapeHtml(log.client)}</span>
          <span>${escapeHtml(log.day || todayKey(new Date(log.createdAt)))}</span>
        </div>
      </div>
      <div class="task-actions">
        <span class="chip">${minutesToHours(log.minutes)}</span>
      </div>
    </article>
  `).join("");

  return [
    panel("Cronometro", "controle de tempo atual", activePanel),
    panel("Registros de tempo", "historico salvo no navegador", `<div class="task-list">${rows || `<div class="empty-state">Sem registros ainda.</div>`}</div>`),
  ].join("");
}

function groupMinutesBy(key) {
  return state.data.timeLogs.reduce((acc, log) => {
    acc[log[key]] = (acc[log[key]] || 0) + log.minutes;
    return acc;
  }, {});
}

function statBars(group) {
  const entries = Object.entries(group).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return `<div class="empty-state">Sem tempo registrado ainda.</div>`;
  const max = Math.max(...entries.map((entry) => entry[1]), 1);
  return entries.map(([label, minutes]) => `
    <div class="stat-row">
      <div class="panel-header">
        <strong>${escapeHtml(label)}</strong>
        <small>${minutesToHours(minutes)}</small>
      </div>
      <div class="progress-track">
        <div class="progress-bar" style="width: ${Math.round((minutes / max) * 100)}%"></div>
      </div>
    </div>
  `).join("");
}

function renderAnalysis() {
  const late = state.data.tasks.filter((task) => task.status === "Atrasada").length;
  const waiting = state.data.tasks.filter((task) => task.status === "Aguardando").length;
  const socialMinutes = state.data.timeLogs.filter((log) => log.front === "Social Media").reduce((sum, log) => sum + log.minutes, 0);
  const insight = `
    <div class="task-list">
      <article class="task-row"><span class="task-stripe stripe-Social-Media"></span><p class="task-title">Social Media consumiu ${minutesToHours(socialMinutes)} nos registros atuais.</p></article>
      <article class="task-row"><span class="task-stripe stripe-Agenda"></span><p class="task-title">${waiting} tarefa(s) dependem de aprovacao ou resposta.</p></article>
      <article class="task-row"><span class="task-stripe stripe-Investimentos"></span><p class="task-title">${late} tarefa(s) atrasada(s) precisam de decisao antes de aumentar a fila.</p></article>
    </div>
  `;

  return [
    panel("Tempo por frente", "onde a operacao pesa", `<div class="stat-list">${statBars(groupMinutesBy("front"))}</div>`),
    panel("Tempo por cliente/projeto", "carga operacional", `<div class="stat-list">${statBars(groupMinutesBy("client"))}</div>`),
    panel("Leitura operacional", "o que merece decisao", insight, "full"),
  ].join("");
}

function updateMetrics() {
  const open = state.data.tasks.filter((task) => task.status !== "Concluida").length;
  const late = state.data.tasks.filter((task) => task.status === "Atrasada").length;
  const todayMinutes = state.data.timeLogs.filter((log) => log.day === "Hoje").reduce((sum, log) => sum + log.minutes, 0);
  const weekMinutes = state.data.timeLogs.reduce((sum, log) => sum + log.minutes, 0);
  const active = state.data.activeTimer ? findTask(state.data.activeTimer.taskId) : state.data.tasks.find((task) => task.status === "Em execucao");
  const activeElapsed = state.data.activeTimer ? ` | ${minutesToHours(currentTimerMinutes())}` : "";

  document.querySelector("#metricOpen").textContent = open;
  document.querySelector("#metricLate").textContent = late;
  document.querySelector("#metricTodayHours").textContent = minutesToHours(todayMinutes + currentTimerMinutes());
  document.querySelector("#metricWeekHours").textContent = minutesToHours(weekMinutes + currentTimerMinutes());
  document.querySelector("#activeTaskTitle").textContent = active ? active.title : "Nenhuma tarefa ativa";
  document.querySelector("#activeTaskMeta").textContent = active ? `${active.client} - ${active.next}${activeElapsed}` : "Quando iniciar pelo Telegram, aparece aqui.";
}

function bindDynamicEvents() {
  const taskFormElement = document.querySelector("#taskForm");
  if (taskFormElement) {
    taskFormElement.addEventListener("submit", addTask);
    taskFormElement.elements.taskMode.addEventListener("change", () => syncRecurrenceField(taskFormElement));
    syncRecurrenceField(taskFormElement);
  }

  document.querySelectorAll(".update-form").forEach((form) => {
    form.addEventListener("submit", addTaskUpdate);
  });

  document.querySelectorAll("[data-client]").forEach((button) => {
    button.addEventListener("click", () => {
      state.client = button.dataset.client;
      state.view = "tasks";
      setActiveNav();
      render();
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      const taskId = button.dataset.task;
      if (action === "start") startTimer(taskId);
      if (action === "finish") finishTimer(true);
      if (action === "complete") completeTask(taskId);
      if (action === "reopen") reopenTask(taskId);
      if (action === "duplicate") duplicateTask(taskId);
      if (action === "toggle-subtask") toggleSubtask(taskId, button.dataset.subtask);
    });
  });
}

function render() {
  const modeDrivenView = state.view === "today" || state.view === "tasks";
  const [title, subtitle] = modeDrivenView ? modeMeta[state.mode] : viewMeta[state.view];
  document.querySelector("#viewTitle").textContent = title;
  document.querySelector("#viewSubtitle").textContent = subtitle;
  updateMetrics();

  const renderers = {
    today: renderToday,
    tasks: renderTasks,
    clients: renderClients,
    investments: renderInvestments,
    time: renderTime,
    analysis: renderAnalysis,
  };

  document.querySelector("#viewContent").innerHTML = modeDrivenView ? renderModeContent() : renderers[state.view]();
  bindDynamicEvents();
}

function setActiveNav() {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === state.view);
  });
}

function setActiveQuick() {
  document.querySelectorAll(".quick-chip[data-quick]").forEach((item) => {
    item.classList.toggle("active", item.dataset.quick === state.quick);
  });
}

function setActiveMode() {
  document.querySelectorAll(".mode-tab[data-mode]").forEach((item) => {
    item.classList.toggle("active", item.dataset.mode === state.mode);
  });
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    if (state.view === "today") {
      state.mode = "focus";
      state.quick = "today";
    }
    if (state.view === "tasks") state.mode = "list";
    setActiveNav();
    setActiveMode();
    setActiveQuick();
    render();
  });
});

document.querySelectorAll(".mode-tab[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    state.mode = button.dataset.mode;
    state.view = "tasks";
    if (state.mode === "focus") {
      state.view = "today";
      state.quick = "today";
    }
    setActiveNav();
    setActiveMode();
    setActiveQuick();
    render();
  });
});

document.querySelectorAll(".quick-chip[data-quick]").forEach((button) => {
  button.addEventListener("click", () => {
    const quick = button.dataset.quick;
    state.quick = quick === "clear" ? "all" : quick;
    if (quick === "social") state.view = "clients";
    if (quick === "investments") state.view = "investments";
    if (quick === "clear") {
      state.front = "all";
      state.status = "all";
      state.client = "all";
      document.querySelector("#frontFilter").value = "all";
      document.querySelector("#statusFilter").value = "all";
    }
    setActiveNav();
    setActiveQuick();
    render();
  });
});

document.querySelector("#frontFilter").addEventListener("change", (event) => {
  state.front = event.target.value;
  state.quick = "all";
  setActiveQuick();
  render();
});

document.querySelector("#statusFilter").addEventListener("change", (event) => {
  state.status = event.target.value;
  state.quick = "all";
  setActiveQuick();
  render();
});

setActiveMode();
render();
setInterval(() => {
  if (state.data.activeTimer) updateMetrics();
}, 30000);
