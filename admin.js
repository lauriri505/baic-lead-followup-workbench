const storageKey = "baic_admin_demo_config_v1";
const sourceData = window.BAIC_ADMIN_DATA;
const copy = (value) => JSON.parse(JSON.stringify(value));

let state = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved ? { ...copy(sourceData), ...saved, leads: copy(sourceData.leads) } : copy(sourceData);
  } catch (error) {
    return copy(sourceData);
  }
})();

const $ = (id) => document.getElementById(id);
const qsa = (selector) => Array.from(document.querySelectorAll(selector));
const roleLabels = { tenant_admin: "北汽管理员", sales: "北汽销售" };
const permissionOptions = ["查看北汽全部线索", "查看本人负责线索", "配置账号与角色", "配置任务规则", "配置跟进节点", "查看操作记录", "处理销售任务", "提交跟进结果", "编辑用户当前信息", "添加跟踪记事"];
const viewNames = { dashboard: "后台总览", leads: "线索数据", accounts: "账号与角色", tasks: "任务配置", nodes: "跟进节点" };

function persist() {
  localStorage.setItem(storageKey, JSON.stringify({ accounts: state.accounts, permissions: state.permissions, taskRules: state.taskRules, nodes: state.nodes }));
}

let toastTimer;
function toast(message) {
  const node = $("adminToast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("show"), 2200);
}

function openView(view) {
  qsa(".admin-view").forEach((section) => {
    section.hidden = section.id !== view + "View";
    section.classList.toggle("active", section.id === view + "View");
  });
  qsa(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $("viewTitle").textContent = viewNames[view];
  document.querySelector(".admin-sidebar").classList.remove("open");
  if (view === "leads") renderLeads();
  if (view === "accounts") renderAccounts();
  if (view === "tasks") renderTaskRules();
  if (view === "nodes") renderNodes();
}

function statusClass(status) {
  if (status === "战败") return "lost";
  if (status === "成交") return "won";
  if (status === "暂存") return "dormant";
  return "";
}

function leadRow(lead) {
  return `<tr><td><strong>${lead.id}</strong></td><td class="lead-person"><strong>${lead.name}</strong><small>${lead.phone}</small></td><td>${lead.source}</td><td>BAIC ${lead.series} ${lead.model}</td><td><span class="table-status ${statusClass(lead.status)}">${lead.status} · ${lead.subStatus}</span></td><td>${lead.assignee}</td><td><span class="task-state ${lead.taskStatus === "处理中" ? "processing" : ""}">${lead.task} · ${lead.taskStatus}</span></td><td>${lead.createdAt}</td></tr>`;
}

function renderDashboard() {
  const activeTasks = state.leads.filter((lead) => ["待处理", "处理中"].includes(lead.taskStatus)).length;
  const metrics = [
    ["北汽线索总数", state.leads.length, "当前租户全部品牌线索", "emphasis"],
    ["待跟进", state.leads.filter((lead) => lead.status === "待跟进").length, "等待销售首次联系", ""],
    ["跟进中", state.leads.filter((lead) => lead.status === "跟进中").length, "已进入联系节奏", ""],
    ["有效销售任务", activeTasks, "待处理 + 处理中", ""]
  ];
  $("metricGrid").innerHTML = metrics.map(([label, value, note, cls]) => `<article class="metric-card ${cls}"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join("");
  const stages = ["待跟进", "跟进中", "暂存", "战败", "成交"].map((name) => [name, state.leads.filter((lead) => lead.status === name).length]);
  const max = Math.max(...stages.map((item) => item[1]), 1);
  $("stageBars").innerHTML = stages.map(([name, count]) => `<div class="stage-row"><span>${name}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(5, count / max * 100)}%"></div></div><strong>${count}</strong></div>`).join("");
  const taskStates = ["待处理", "处理中", "已完成", "已结束"].map((name) => [name, state.leads.filter((lead) => lead.taskStatus === name).length]);
  $("taskSummary").innerHTML = taskStates.map(([name, count]) => `<div class="summary-cell"><span>${name}</span><strong>${count}</strong></div>`).join("");
  $("recentLeadRows").innerHTML = state.leads.slice(0, 5).map(leadRow).join("");
}

function buildLeadFilters() {
  const statuses = [...new Set(state.leads.map((lead) => lead.status))];
  const assignees = [...new Set(state.leads.map((lead) => lead.assignee))];
  $("leadStatusFilter").innerHTML = `<option value="">全部线索状态</option>${statuses.map((item) => `<option>${item}</option>`).join("")}`;
  $("leadAssigneeFilter").innerHTML = `<option value="">全部负责人</option>${assignees.map((item) => `<option>${item}</option>`).join("")}`;
}

function renderLeads() {
  const query = $("leadSearch").value.trim().toLowerCase();
  const status = $("leadStatusFilter").value;
  const assignee = $("leadAssigneeFilter").value;
  const filtered = state.leads.filter((lead) => {
    const matchesText = !query || [lead.id, lead.name, lead.phone].some((value) => value.toLowerCase().includes(query));
    return matchesText && (!status || lead.status === status) && (!assignee || lead.assignee === assignee);
  });
  $("leadTotal").textContent = filtered.length;
  $("leadRows").innerHTML = filtered.map(leadRow).join("");
  $("leadEmpty").hidden = filtered.length > 0;
}

function renderAccounts() {
  $("accountRows").innerHTML = state.accounts.map((account, index) => `<tr><td><strong>${account.id}</strong></td><td>${account.username}</td><td><select class="account-role" data-index="${index}"><option value="tenant_admin" ${account.role === "tenant_admin" ? "selected" : ""}>北汽管理员</option><option value="sales" ${account.role === "sales" ? "selected" : ""}>北汽销售</option></select></td><td>${account.role === "tenant_admin" ? "北汽全部线索" : "本人负责线索"}</td><td><select class="account-status" data-index="${index}"><option ${account.status === "启用" ? "selected" : ""}>启用</option><option ${account.status === "停用" ? "selected" : ""}>停用</option></select></td><td>${account.lastLogin}</td></tr>`).join("");
  $("roleGrid").innerHTML = Object.keys(roleLabels).map((role) => `<article class="role-card"><h3>${roleLabels[role]}</h3><p>${role === "tenant_admin" ? "管理当前北汽租户，不可访问其他品牌数据" : "处理本人负责的线索和任务"}</p><div class="permission-list">${permissionOptions.map((permission) => `<label><input type="checkbox" data-role="${role}" value="${permission}" ${(state.permissions[role] || []).includes(permission) ? "checked" : ""}>${permission}</label>`).join("")}</div></article>`).join("");
}

function renderTaskRules() {
  $("taskRuleList").innerHTML = state.taskRules.map((rule, index) => `<article class="task-rule"><span class="rule-index">${String(index + 1).padStart(2, "0")}</span><div class="rule-field"><label>任务类型</label><input data-task-index="${index}" data-field="type" value="${rule.type}"></div><div class="rule-field"><label>触发事件</label><input data-task-index="${index}" data-field="trigger" value="${rule.trigger}"></div><div class="rule-field"><label>默认截止时间</label><input data-task-index="${index}" data-field="deadline" value="${rule.deadline}"></div><label class="switch-label"><input type="checkbox" data-task-index="${index}" data-field="enabled" ${rule.enabled ? "checked" : ""}>启用规则</label></article>`).join("");
}

function renderNodes() {
  state.nodes.sort((a, b) => a.order - b.order);
  $("nodeList").innerHTML = state.nodes.map((node, index) => `<article class="node-card"><div class="node-order"><strong>${String(index + 1).padStart(2, "0")}</strong><span class="order-buttons"><button type="button" data-node-move="up" data-index="${index}" aria-label="上移">▲</button><button type="button" data-node-move="down" data-index="${index}" aria-label="下移">▼</button></span></div><div class="node-name"><strong>${node.main}</strong><small>${node.sub}</small></div><div class="result-tags">${node.results.length ? node.results.map((result) => `<span class="result-tag">${result}</span>`).join("") : `<span class="result-tag">终态，无可选结果</span>`}</div><div class="node-task"><span>后续任务</span><strong>${node.nextTask}</strong></div><label class="switch-label"><input type="checkbox" data-node-enabled="${index}" ${node.enabled ? "checked" : ""}>启用</label></article>`).join("");
}

qsa(".nav-item").forEach((button) => button.addEventListener("click", () => openView(button.dataset.view)));
qsa("[data-go]").forEach((button) => button.addEventListener("click", () => openView(button.dataset.go)));
$("menuButton").addEventListener("click", () => document.querySelector(".admin-sidebar").classList.toggle("open"));
["leadSearch", "leadStatusFilter", "leadAssigneeFilter"].forEach((id) => $(id).addEventListener(id === "leadSearch" ? "input" : "change", renderLeads));
$("resetLeadFilters").addEventListener("click", () => { $("leadSearch").value = ""; $("leadStatusFilter").value = ""; $("leadAssigneeFilter").value = ""; renderLeads(); });

$("showAccountForm").addEventListener("click", () => { $("accountForm").hidden = false; $("accountId").focus(); });
$("showTaskForm").addEventListener("click", () => { $("taskForm").hidden = false; $("taskType").focus(); });
$("showNodeForm").addEventListener("click", () => { $("nodeForm").hidden = false; $("nodeMain").focus(); });
qsa(".cancel-inline").forEach((button) => button.addEventListener("click", () => { button.closest("form").hidden = true; button.closest("form").reset(); }));

$("accountForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const id = $("accountId").value.trim();
  if (state.accounts.some((account) => account.id === id)) return toast("账号ID已存在，请使用新的ID");
  const role = $("accountRole").value;
  state.accounts.unshift({ id, username: $("accountName").value.trim(), role, dataScope: role === "tenant_admin" ? "北汽全部线索" : "本人负责线索", status: "启用", lastLogin: "尚未登录" });
  persist(); renderAccounts(); event.target.reset(); event.target.hidden = true; toast("北汽账号已创建");
});

$("accountRows").addEventListener("change", (event) => {
  const index = Number(event.target.dataset.index);
  if (event.target.classList.contains("account-role")) { state.accounts[index].role = event.target.value; state.accounts[index].dataScope = event.target.value === "tenant_admin" ? "北汽全部线索" : "本人负责线索"; }
  if (event.target.classList.contains("account-status")) state.accounts[index].status = event.target.value;
  persist(); renderAccounts(); toast("账号配置已更新");
});

$("savePermissions").addEventListener("click", () => {
  state.permissions = {};
  qsa(".permission-list input:checked").forEach((input) => { if (!state.permissions[input.dataset.role]) state.permissions[input.dataset.role] = []; state.permissions[input.dataset.role].push(input.value); });
  persist(); toast("角色权限已保存");
});

$("taskForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.taskRules.push({ id: `RULE-${Date.now()}`, type: $("taskType").value.trim(), trigger: $("taskTriggerInput").value.trim(), deadline: $("taskDeadline").value.trim(), assignee: "原销售", enabled: true });
  renderTaskRules(); event.target.reset(); event.target.hidden = true; toast("任务规则已添加，保存后生效");
});

$("taskRuleList").addEventListener("input", (event) => {
  const index = Number(event.target.dataset.taskIndex); if (Number.isNaN(index)) return;
  state.taskRules[index][event.target.dataset.field] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
  $("taskSaveHint").textContent = "有未保存的任务配置";
});
$("saveTaskRules").addEventListener("click", () => { persist(); $("taskSaveHint").textContent = "配置已保存，将应用到新生成的任务"; toast("任务配置已保存"); });

$("nodeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.nodes.push({ id: `NODE-${Date.now()}`, order: state.nodes.length + 1, main: $("nodeMain").value.trim(), sub: $("nodeSub").value.trim(), results: $("nodeResults").value.split(/[，,]/).map((value) => value.trim()).filter(Boolean), nextTask: $("nodeTask").value.trim(), enabled: true });
  renderNodes(); event.target.reset(); event.target.hidden = true; toast("跟进节点已添加，保存后生效");
});

$("nodeList").addEventListener("click", (event) => {
  const direction = event.target.dataset.nodeMove; if (!direction) return;
  const index = Number(event.target.dataset.index); const target = direction === "up" ? index - 1 : index + 1;
  if (target < 0 || target >= state.nodes.length) return;
  [state.nodes[index], state.nodes[target]] = [state.nodes[target], state.nodes[index]];
  state.nodes.forEach((node, order) => { node.order = order + 1; }); renderNodes();
});
$("nodeList").addEventListener("change", (event) => { const index = Number(event.target.dataset.nodeEnabled); if (Number.isNaN(index)) return; state.nodes[index].enabled = event.target.checked; });
$("saveNodes").addEventListener("click", () => { state.nodes.forEach((node, index) => { node.order = index + 1; }); persist(); toast("跟进节点配置已保存"); });

buildLeadFilters();
renderDashboard();
renderAccounts();
renderTaskRules();
renderNodes();
