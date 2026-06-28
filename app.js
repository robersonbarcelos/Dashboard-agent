const tasks = [
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
  },
  {
    id: "T-009",
    title: "Legenda e capa - Cliente 4",
    front: "Social Media",
    client: "Cliente 4",
    type: "Copy",
    status: "A fazer",
    priority: "Media",
    due: "Semana",
    estimate: 70,
    spent: 0,
    next: "Criar legenda curta e sugestao de capa.",
  },
];

const timeLogs = [
  { taskId: "T-001", front: "Social Media", client: "Cliente 1", type: "Roteiro", minutes: 55, day: "Hoje" },
  { taskId: "T-002", front: "Social Media", client: "Cliente 2", type: "Edicao", minutes: 130, day: "Semana" },
  { taskId: "T-005", front: "Investimentos", client: "Mercado", type: "Estudar mercado", minutes: 50, day: "Hoje" },
  { taskId: "T-007", front: "Investimentos", client: "Trades", type: "Acompanhamento de trades", minutes: 15, day: "Semana" },
  { taskId: "T-004", front: "Pessoal", client: "Pessoal", type: "Rotina", minutes: 30, day: "Semana" },
];

const clients = ["Cliente 1", "Cliente 2", "Cliente 3", "Cliente 4", "Cliente 5", "Cliente 6"];
const investmentBlocks = ["Estudar mercado", "Backtesting e analise de setups", "Acompanhamento de trades"];

const state = {
  view: "today",
  front: "all",
  status: "all",
  quick: "today",
  client: "all",
};

const viewMeta = {
  today: ["Hoje", "Prioridades, atrasos e proximas acoes."],
  tasks: ["Tarefas", "Lista geral filtravel por frente, cliente e status."],
  clients: ["Clientes", "Carga de trabalho e pendencias por cliente."],
  investments: ["Investimentos", "Estudo de mercado, backtesting e acompanhamento de trades."],
  time: ["Tempo", "Registros para medir onde a operacao esta consumindo horas."],
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

function minutesToHours(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest}min`;
  if (!rest) return `${hours}h`;
  return `${hours}h${String(rest).padStart(2, "0")}`;
}

function slugFront(front) {
  return front.replace(/\s+/g, "-");
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
  return tasks.filter((task) => {
    const frontMatch = state.front === "all" || task.front === state.front;
    const statusMatch = state.status === "all" || task.status === state.status;
    const clientMatch = state.client === "all" || task.client === state.client;
    return frontMatch && statusMatch && clientMatch && matchesQuick(task);
  });
}

function taskRow(task) {
  const progress = Math.min(100, Math.round((task.spent / Math.max(task.estimate, 1)) * 100));
  return `
    <article class="task-row">
      <span class="task-stripe stripe-${slugFront(task.front)}" aria-hidden="true"></span>
      <div>
        <p class="task-title">${task.title}</p>
        <div class="task-meta">
          <span>${task.front}</span>
          <span>${task.client}</span>
          <span>${task.type}</span>
          <span>Prazo: ${task.due}</span>
          <span>${minutesToHours(task.spent)} / ${minutesToHours(task.estimate)}</span>
        </div>
        <p class="task-next">Proxima acao: ${task.next}</p>
        <div class="progress-track" aria-label="Progresso de tempo">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
      </div>
      <div class="task-actions">
        <span class="chip ${statusClass[task.status] || ""}">${task.status}</span>
        <span class="chip ${priorityClass[task.priority] || ""}">${task.priority}</span>
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

function renderToday() {
  const todayTasks = filteredTasks();
  const lateTasks = tasks.filter((task) => task.status === "Atrasada");
  const nextActions = todayTasks.slice(0, 5).map((task) => `
    <article class="task-row">
      <span class="task-stripe stripe-${slugFront(task.front)}" aria-hidden="true"></span>
      <div>
        <p class="task-title">${task.next}</p>
        <div class="task-meta">
          <span>${task.title}</span>
          <span>${task.front}</span>
          <span>${task.client}</span>
        </div>
      </div>
      <div class="task-actions">
        <span class="chip ${statusClass[task.status] || ""}">${task.status}</span>
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
  const clientButtons = ["all", ...clients].map((client) => `
    <button class="quick-chip ${state.client === client ? "active" : ""}" data-client="${client}">
      ${client === "all" ? "Todos clientes" : client}
    </button>
  `).join("");

  return [
    panel("Filtro por cliente", "social media sem misturar tudo", `<div class="quick-filters">${clientButtons}</div>`, "full"),
    panel("Lista operacional", "tarefas filtradas", renderTaskList(filteredTasks()), "full"),
  ].join("");
}

function renderClients() {
  const cards = clients.map((client) => {
    const clientTasks = tasks.filter((task) => task.client === client);
    const open = clientTasks.filter((task) => task.status !== "Concluida").length;
    const late = clientTasks.filter((task) => task.status === "Atrasada").length;
    const minutes = timeLogs.filter((log) => log.client === client).reduce((sum, log) => sum + log.minutes, 0);
    const nextTask = clientTasks.find((task) => task.status !== "Concluida");
    return `
      <article class="client-card">
        <strong>${client}</strong>
        <span>${open} aberta(s) | ${late} atrasada(s)</span>
        <span>${minutesToHours(minutes)} registrados</span>
        <span>${nextTask ? nextTask.next : "Sem proxima acao cadastrada"}</span>
        <button data-client="${client}">Ver tarefas</button>
      </article>
    `;
  }).join("");

  return [
    panel("Clientes Social Media", "visao por carga e proxima acao", `<div class="client-grid">${cards}</div>`, "full"),
    panel("Fila filtrada", state.client === "all" ? "selecione um cliente" : state.client, renderTaskList(filteredTasks()), "full"),
  ].join("");
}

function renderInvestments() {
  const blocks = investmentBlocks.map((type) => {
    const blockTasks = tasks.filter((task) => task.front === "Investimentos" && task.type === type);
    const open = blockTasks.filter((task) => task.status !== "Concluida").length;
    const minutes = timeLogs.filter((log) => log.front === "Investimentos" && log.type === type).reduce((sum, log) => sum + log.minutes, 0);
    const next = blockTasks.find((task) => task.status !== "Concluida")?.next || "Sem proxima acao pendente.";
    return `
      <article class="work-card">
        <strong>${type}</strong>
        <span>${open} aberta(s)</span>
        <span>${minutesToHours(minutes)} registrados</span>
        <span>${next}</span>
      </article>
    `;
  }).join("");

  const investmentTasks = tasks.filter((task) => task.front === "Investimentos").filter(matchesQuick);
  return [
    panel("Blocos de investimento", "escopo atual", `<div class="work-grid">${blocks}</div>`, "full"),
    panel("Fila de investimentos", "sem execucao real de trade pelo painel", renderTaskList(investmentTasks), "full"),
  ].join("");
}

function renderTime() {
  const rows = timeLogs.map((log) => `
    <article class="task-row">
      <span class="task-stripe stripe-${slugFront(log.front)}" aria-hidden="true"></span>
      <div>
        <p class="task-title">${log.type}</p>
        <div class="task-meta">
          <span>${log.front}</span>
          <span>${log.client}</span>
          <span>${log.day}</span>
        </div>
      </div>
      <div class="task-actions">
        <span class="chip">${minutesToHours(log.minutes)}</span>
      </div>
    </article>
  `).join("");

  return [
    panel("Registros de tempo", "dados simulados da primeira versao", `<div class="task-list">${rows}</div>`),
    panel("Comandos Telegram", "padrao de captura", `
      <div class="task-list">
        <article class="task-row"><span class="task-stripe"></span><p class="task-title">iniciar tarefa: Cliente 1 - roteiro reels</p></article>
        <article class="task-row"><span class="task-stripe"></span><p class="task-title">finalizar tarefa: levou 1h20, aguardando aprovacao</p></article>
        <article class="task-row"><span class="task-stripe"></span><p class="task-title">hoje fiz: Cliente 2, editei 3 videos, 2h30</p></article>
      </div>
    `),
  ].join("");
}

function groupMinutesBy(key) {
  return timeLogs.reduce((acc, log) => {
    acc[log[key]] = (acc[log[key]] || 0) + log.minutes;
    return acc;
  }, {});
}

function statBars(group) {
  const entries = Object.entries(group).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map((entry) => entry[1]), 1);
  return entries.map(([label, minutes]) => `
    <div class="stat-row">
      <div class="panel-header">
        <strong>${label}</strong>
        <small>${minutesToHours(minutes)}</small>
      </div>
      <div class="progress-track">
        <div class="progress-bar" style="width: ${Math.round((minutes / max) * 100)}%"></div>
      </div>
    </div>
  `).join("");
}

function renderAnalysis() {
  const late = tasks.filter((task) => task.status === "Atrasada").length;
  const waiting = tasks.filter((task) => task.status === "Aguardando").length;
  const socialMinutes = timeLogs.filter((log) => log.front === "Social Media").reduce((sum, log) => sum + log.minutes, 0);
  const insight = `
    <div class="task-list">
      <article class="task-row">
        <span class="task-stripe stripe-Social-Media"></span>
        <p class="task-title">Social Media esta consumindo ${minutesToHours(socialMinutes)} na amostra atual.</p>
      </article>
      <article class="task-row">
        <span class="task-stripe stripe-Agenda"></span>
        <p class="task-title">${waiting} tarefa(s) dependem de aprovacao ou resposta.</p>
      </article>
      <article class="task-row">
        <span class="task-stripe stripe-Investimentos"></span>
        <p class="task-title">${late} tarefa(s) atrasada(s) precisam ser resolvidas antes de aceitar mais demanda.</p>
      </article>
    </div>
  `;

  return [
    panel("Tempo por frente", "onde a operacao pesa", `<div class="stat-list">${statBars(groupMinutesBy("front"))}</div>`),
    panel("Tempo por cliente/projeto", "carga operacional", `<div class="stat-list">${statBars(groupMinutesBy("client"))}</div>`),
    panel("Leitura operacional", "o que merece decisao", insight, "full"),
  ].join("");
}

function updateMetrics() {
  const open = tasks.filter((task) => task.status !== "Concluida").length;
  const late = tasks.filter((task) => task.status === "Atrasada").length;
  const todayMinutes = timeLogs.filter((log) => log.day === "Hoje").reduce((sum, log) => sum + log.minutes, 0);
  const weekMinutes = timeLogs.reduce((sum, log) => sum + log.minutes, 0);
  const active = tasks.find((task) => task.status === "Em execucao");

  document.querySelector("#metricOpen").textContent = open;
  document.querySelector("#metricLate").textContent = late;
  document.querySelector("#metricTodayHours").textContent = minutesToHours(todayMinutes);
  document.querySelector("#metricWeekHours").textContent = minutesToHours(weekMinutes);
  document.querySelector("#activeTaskTitle").textContent = active ? active.title : "Nenhuma tarefa ativa";
  document.querySelector("#activeTaskMeta").textContent = active ? `${active.client} - ${active.next}` : "Quando iniciar pelo Telegram, aparece aqui.";
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

  document.querySelectorAll("[data-client]").forEach((button) => {
    button.addEventListener("click", () => {
      state.client = button.dataset.client;
      state.view = "tasks";
      setActiveNav();
      render();
    });
  });
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
