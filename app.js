const tasks = [
  {
    id: "T-001",
    title: "Roteiro de reels - Cliente 1",
    front: "Social Media",
    client: "Cliente 1",
    type: "Roteiro",
    status: "Em execução",
    priority: "Alta",
    due: "Hoje",
    estimate: 90,
    spent: 55,
    next: "Finalizar gancho e CTA",
  },
  {
    id: "T-002",
    title: "Editar vídeo institucional - Cliente 2",
    front: "Social Media",
    client: "Cliente 2",
    type: "Edição",
    status: "Aguardando",
    priority: "Média",
    due: "Amanhã",
    estimate: 180,
    spent: 130,
    next: "Aguardar aprovação do corte",
  },
  {
    id: "T-003",
    title: "Calendário editorial semanal - Cliente 3",
    front: "Social Media",
    client: "Cliente 3",
    type: "Planejamento",
    status: "A fazer",
    priority: "Alta",
    due: "Hoje",
    estimate: 120,
    spent: 0,
    next: "Separar temas da semana",
  },
  {
    id: "T-004",
    title: "Revisar pendências pessoais da semana",
    front: "Pessoal",
    client: "Pessoal",
    type: "Rotina",
    status: "A fazer",
    priority: "Baixa",
    due: "Sexta",
    estimate: 40,
    spent: 0,
    next: "Listar decisões pendentes",
  },
  {
    id: "T-005",
    title: "Estudar mercado - abertura dos índices",
    front: "Investimentos",
    client: "Mercado",
    type: "Estudar mercado",
    status: "Concluída",
    priority: "Média",
    due: "Hoje",
    estimate: 45,
    spent: 50,
    next: "Registrar leitura principal",
  },
  {
    id: "T-006",
    title: "Backtesting setup rompimento",
    front: "Investimentos",
    client: "Setups",
    type: "Backtesting e análise de setups",
    status: "A fazer",
    priority: "Alta",
    due: "Hoje",
    estimate: 120,
    spent: 0,
    next: "Definir amostra e regra de entrada",
  },
  {
    id: "T-007",
    title: "Acompanhamento de trades em aberto",
    front: "Investimentos",
    client: "Trades",
    type: "Acompanhamento de trades",
    status: "Atrasada",
    priority: "Alta",
    due: "Ontem",
    estimate: 30,
    spent: 15,
    next: "Atualizar status e risco",
  },
  {
    id: "T-008",
    title: "Organizar bloco de execução da tarde",
    front: "Agenda",
    client: "Agenda",
    type: "Planejamento",
    status: "A fazer",
    priority: "Média",
    due: "Hoje",
    estimate: 25,
    spent: 0,
    next: "Definir 3 prioridades",
  },
];

const timeLogs = [
  { taskId: "T-001", front: "Social Media", client: "Cliente 1", type: "Roteiro", minutes: 55, day: "Hoje" },
  { taskId: "T-002", front: "Social Media", client: "Cliente 2", type: "Edição", minutes: 130, day: "Semana" },
  { taskId: "T-005", front: "Investimentos", client: "Mercado", type: "Estudar mercado", minutes: 50, day: "Hoje" },
  { taskId: "T-007", front: "Investimentos", client: "Trades", type: "Acompanhamento de trades", minutes: 15, day: "Semana" },
  { taskId: "T-004", front: "Pessoal", client: "Pessoal", type: "Rotina", minutes: 30, day: "Semana" },
];

const clients = [
  "Cliente 1",
  "Cliente 2",
  "Cliente 3",
  "Cliente 4",
  "Cliente 5",
  "Cliente 6",
];

const state = {
  view: "today",
  front: "all",
  status: "all",
};

const viewTitles = {
  today: "Hoje",
  tasks: "Tarefas",
  social: "Social Media",
  investments: "Investimentos",
  time: "Tempo",
  stats: "Estatísticas",
};

const statusClass = {
  "Atrasada": "status-late",
  "Em execução": "status-running",
  "Aguardando": "status-waiting",
  "Concluída": "status-done",
};

const priorityClass = {
  "Alta": "priority-high",
  "Média": "priority-medium",
};

function minutesToHours(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (!hours) return `${rest}min`;
  if (!rest) return `${hours}h`;
  return `${hours}h${String(rest).padStart(2, "0")}`;
}

function filteredTasks() {
  return tasks.filter((task) => {
    const frontMatch = state.front === "all" || task.front === state.front;
    const statusMatch = state.status === "all" || task.status === state.status;
    return frontMatch && statusMatch;
  });
}

function taskRow(task) {
  const progress = Math.min(100, Math.round((task.spent / Math.max(task.estimate, 1)) * 100));
  return `
    <article class="task-row">
      <div>
        <p class="task-title">${task.title}</p>
        <div class="task-meta">
          <span>${task.front}</span>
          <span>${task.client}</span>
          <span>${task.type}</span>
          <span>Prazo: ${task.due}</span>
          <span>Tempo: ${minutesToHours(task.spent)} / ${minutesToHours(task.estimate)}</span>
        </div>
        <div class="progress-track" aria-label="Progresso de tempo">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
      </div>
      <div class="task-meta">
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
  if (!list.length) {
    return `<div class="empty-state">Nenhuma tarefa encontrada com os filtros atuais.</div>`;
  }
  return `<div class="task-list">${list.map(taskRow).join("")}</div>`;
}

function renderToday() {
  const todayTasks = filteredTasks().filter((task) => task.due === "Hoje" || task.status === "Atrasada" || task.status === "Em execução");
  const lateTasks = tasks.filter((task) => task.status === "Atrasada");
  const focus = todayTasks.slice(0, 4);
  const nextActions = focus.map((task) => `
    <article class="task-row">
      <div>
        <p class="task-title">${task.next}</p>
        <div class="task-meta">
          <span>${task.title}</span>
          <span>${task.front}</span>
        </div>
      </div>
      <span class="chip ${statusClass[task.status] || ""}">${task.status}</span>
    </article>
  `).join("");

  return [
    panel("Prioridades do dia", "execução e risco", renderTaskList(todayTasks)),
    panel("Próximas ações", "comando operacional", nextActions || `<div class="empty-state">Sem ações pendentes.</div>`),
    panel("Atrasadas", `${lateTasks.length} ponto(s) de atenção`, renderTaskList(lateTasks), "full"),
  ].join("");
}

function renderTasks() {
  return panel("Todas as tarefas", "filtrável por frente e status", renderTaskList(filteredTasks()), "full");
}

function renderSocial() {
  const socialTasks = filteredTasks().filter((task) => task.front === "Social Media");
  const clientCards = clients.map((client) => {
    const clientTasks = tasks.filter((task) => task.client === client);
    const open = clientTasks.filter((task) => task.status !== "Concluída").length;
    const minutes = timeLogs.filter((log) => log.client === client).reduce((sum, log) => sum + log.minutes, 0);
    return `
      <article class="client-card">
        <strong>${client}</strong>
        <span>${open} tarefa(s) abertas</span>
        <span>${minutesToHours(minutes)} registrados</span>
      </article>
    `;
  }).join("");

  return [
    panel("Clientes", "visão de carga", `<div class="client-grid">${clientCards}</div>`, "full"),
    panel("Fila Social Media", "produção, aprovação e entrega", renderTaskList(socialTasks), "full"),
  ].join("");
}

function renderInvestments() {
  const investmentTasks = filteredTasks().filter((task) => task.front === "Investimentos");
  const blocks = ["Estudar mercado", "Backtesting e análise de setups", "Acompanhamento de trades"].map((type) => {
    const blockTasks = tasks.filter((task) => task.front === "Investimentos" && task.type === type);
    const minutes = timeLogs.filter((log) => log.front === "Investimentos" && log.type === type).reduce((sum, log) => sum + log.minutes, 0);
    return `
      <article class="client-card">
        <strong>${type}</strong>
        <span>${blockTasks.length} tarefa(s)</span>
        <span>${minutesToHours(minutes)} registrados</span>
      </article>
    `;
  }).join("");

  return [
    panel("Blocos de investimento", "escopo atual", `<div class="client-grid">${blocks}</div>`, "full"),
    panel("Fila de investimentos", "estudo, testes e acompanhamento", renderTaskList(investmentTasks), "full"),
  ].join("");
}

function renderTime() {
  const rows = timeLogs.map((log) => `
    <article class="task-row">
      <div>
        <p class="task-title">${log.type}</p>
        <div class="task-meta">
          <span>${log.front}</span>
          <span>${log.client}</span>
          <span>${log.day}</span>
        </div>
      </div>
      <span class="chip">${minutesToHours(log.minutes)}</span>
    </article>
  `).join("");

  return [
    panel("Registros de tempo", "simulação inicial", `<div class="task-list">${rows}</div>`),
    panel("Comandos sugeridos", "entrada via Telegram", `
      <div class="task-list">
        <article class="task-row"><p class="task-title">iniciar tarefa: Cliente 1 - roteiro reels</p></article>
        <article class="task-row"><p class="task-title">finalizar tarefa: levou 1h20, aguardando aprovação</p></article>
        <article class="task-row"><p class="task-title">resumo do dia</p></article>
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

function renderStats() {
  return [
    panel("Tempo por frente", "onde a operação pesa", `<div class="stat-list">${statBars(groupMinutesBy("front"))}</div>`),
    panel("Tempo por cliente/projeto", "carga operacional", `<div class="stat-list">${statBars(groupMinutesBy("client"))}</div>`),
    panel("Tempo por tipo de tarefa", "gargalos por natureza", `<div class="stat-list">${statBars(groupMinutesBy("type"))}</div>`, "full"),
  ].join("");
}

function updateMetrics() {
  const open = tasks.filter((task) => task.status !== "Concluída").length;
  const late = tasks.filter((task) => task.status === "Atrasada").length;
  const todayMinutes = timeLogs.filter((log) => log.day === "Hoje").reduce((sum, log) => sum + log.minutes, 0);
  const weekMinutes = timeLogs.reduce((sum, log) => sum + log.minutes, 0);
  const active = tasks.find((task) => task.status === "Em execução");

  document.querySelector("#metricOpen").textContent = open;
  document.querySelector("#metricLate").textContent = late;
  document.querySelector("#metricTodayHours").textContent = minutesToHours(todayMinutes);
  document.querySelector("#metricWeekHours").textContent = minutesToHours(weekMinutes);
  document.querySelector("#activeTaskTitle").textContent = active ? active.title : "Nenhuma tarefa ativa";
  document.querySelector("#activeTaskMeta").textContent = active ? `${active.client} - ${active.next}` : "Use o Telegram para iniciar uma tarefa.";
}

function render() {
  document.querySelector("#viewTitle").textContent = viewTitles[state.view];
  updateMetrics();

  const content = {
    today: renderToday,
    tasks: renderTasks,
    social: renderSocial,
    investments: renderInvestments,
    time: renderTime,
    stats: renderStats,
  }[state.view]();

  document.querySelector("#viewContent").innerHTML = content;
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    state.view = button.dataset.view;
    render();
  });
});

document.querySelector("#frontFilter").addEventListener("change", (event) => {
  state.front = event.target.value;
  render();
});

document.querySelector("#statusFilter").addEventListener("change", (event) => {
  state.status = event.target.value;
  render();
});

render();
