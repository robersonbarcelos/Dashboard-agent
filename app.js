const STORAGE_KEY = "painel-roberson-v3";
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
    if (stored?.tasks && stored?.timeLogs) return stored;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return structuredClone(seedData);
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
    createdAt: new Date().toISOString(),
  };

  if (!task.title) return;
  state.data.tasks.unshift(task);
  saveData();
  form.reset();
  form.front.value = "Social Media";
  form.priority.value = "Media";
  form.due.value = "Hoje";
  render();
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
  });
  saveData();
  render();
}

function taskRow(task) {
  const progress = Math.min(100, Math.round(((Number(task.spent) || 0) / Math.max(Number(task.estimate) || 1, 1)) * 100));
  const isActive = state.data.activeTimer?.taskId === task.id;
  const elapsed = isActive ? ` + ${minutesToHours(currentTimerMinutes())} rodando` : "";
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
          <span>Prazo: ${escapeHtml(task.due)}</span>
          <span>${minutesToHours(task.spent)} / ${minutesToHours(task.estimate)}${elapsed}</span>
        </div>
        <p class="task-next">Proxima acao: ${escapeHtml(task.next)}</p>
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
      <div class="form-actions">
        <button class="primary-action" type="submit">Adicionar tarefa</button>
        <span class="task-meta">Salva automaticamente neste navegador.</span>
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
  document.querySelector("#taskForm")?.addEventListener("submit", addTask);

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
    });
  });
}

function render() {
  const [title, subtitle] = viewMeta[state.view];
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

  document.querySelector("#viewContent").innerHTML = renderers[state.view]();
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

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    if (state.view === "today") state.quick = "today";
    setActiveNav();
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

render();
setInterval(() => {
  if (state.data.activeTimer) updateMetrics();
}, 30000);
