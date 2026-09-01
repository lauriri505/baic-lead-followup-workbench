const storageKey = "baic_admin_demo_config_v4";
const sourceData = window.BAIC_ADMIN_DATA;
const copy = (value) => JSON.parse(JSON.stringify(value));
let state = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved ? { ...copy(sourceData), ...saved, leads: copy(sourceData.leads) } : copy(sourceData);
  } catch (error) { return copy(sourceData); }
})();
if (!state.transitionConfig) state.transitionConfig = copy(sourceData.transitionConfig);
Object.keys(state.permissions || {}).forEach((role) => {
  state.permissions[role] = state.permissions[role].map((permission) => permission === "配置跟进节点" ? "配置线索流转" : permission);
});

const $ = (id) => document.getElementById(id);
const qsa = (selector) => Array.from(document.querySelectorAll(selector));
const esc = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const roleLabels = { tenant_admin: "北汽管理员", sales: "北汽销售" };
const permissionOptions = ["查看北汽全部线索", "查看本人负责线索", "配置账号与角色", "配置任务规则", "配置线索流转", "查看操作记录", "处理销售任务", "提交跟进结果", "编辑用户当前信息", "添加跟踪记事"];
const viewNames = { dashboard: "后台总览", leads: "线索数据", accounts: "账号与角色", tasks: "任务配置", nodes: "线索流转配置" };
const groupLabels = { initial: "待跟进", processing: "跟进中", valid: "有效线索", invalid: "无效线索", dormant: "暂存", lost: "流失", won: "成交" };
const categoryLabels = { contact: "联系", unreachable: "未接通", callback: "约定回访", dormant: "暂存", lost: "终止" };
const taskLabels = { FIRST_CONTACT: "首次联系", CALLBACK: "普通回访" };

function persist() {
  localStorage.setItem(storageKey, JSON.stringify({ accounts: state.accounts, permissions: state.permissions, taskRules: state.taskRules, transitionConfig: state.transitionConfig }));
}
let toastTimer;
function toast(message) {
  $("adminToast").textContent = message;
  $("adminToast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("adminToast").classList.remove("show"), 2400);
}
function openView(view) {
  qsa(".admin-view").forEach((section) => {
    section.hidden = section.id !== view + "View";
    section.classList.toggle("active", section.id === view + "View");
  });
  qsa(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  $("viewTitle").textContent = viewNames[view];
  document.querySelector(".admin-sidebar").classList.remove("open");
  ({ leads: renderLeads, accounts: renderAccounts, tasks: renderTaskRules, nodes: renderTransitions })[view]?.();
}

function statusClass(status) { return ["战败", "流失"].includes(status) ? "lost" : status === "成交" ? "won" : ""; }
function leadRow(lead) {
  return `<tr><td><strong>${esc(lead.id)}</strong></td><td class="lead-person"><strong>${esc(lead.name)}</strong><small>${esc(lead.phone)}</small></td><td>${esc(lead.source)}</td><td>BAIC ${esc(lead.series)} ${esc(lead.model)}</td><td><span class="table-status ${statusClass(lead.status)}">${esc(lead.status)} · ${esc(lead.subStatus)}</span></td><td>${esc(lead.assignee)}</td><td><span class="task-state ${lead.taskStatus === "处理中" ? "processing" : ""}">${esc(lead.task)} · ${esc(lead.taskStatus)}</span></td><td>${esc(lead.createdAt)}</td></tr>`;
}
function renderDashboard() {
  const activeTasks = state.leads.filter((lead) => ["待处理", "处理中"].includes(lead.taskStatus)).length;
  const metrics = [["北汽线索总数", state.leads.length, "当前租户全部品牌线索", "emphasis"], ["待跟进", state.leads.filter((lead) => lead.status === "待跟进").length, "等待销售首次联系", ""], ["跟进中", state.leads.filter((lead) => lead.status === "跟进中").length, "已进入联系节奏", ""], ["有效销售任务", activeTasks, "待处理 + 处理中", ""]];
  $("metricGrid").innerHTML = metrics.map(([label, value, note, cls]) => `<article class="metric-card ${cls}"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join("");
  const stages = ["待跟进", "跟进中", "流失", "成交"].map((name) => [name, state.leads.filter((lead) => lead.status === name).length]);
  const max = Math.max(...stages.map((item) => item[1]), 1);
  $("stageBars").innerHTML = stages.map(([name, count]) => `<div class="stage-row"><span>${name}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(5, count / max * 100)}%"></div></div><strong>${count}</strong></div>`).join("");
  $("taskSummary").innerHTML = ["待处理", "处理中", "已逾期", "已完成", "已结束"].map((name) => `<div class="summary-cell"><span>${name}</span><strong>${state.leads.filter((lead) => lead.taskStatus === name).length}</strong></div>`).join("");
  $("recentLeadRows").innerHTML = state.leads.slice(0, 5).map(leadRow).join("");
}
function buildLeadFilters() {
  $("leadStatusFilter").innerHTML = `<option value="">全部线索状态</option>${[...new Set(state.leads.map((lead) => lead.status))].map((item) => `<option>${esc(item)}</option>`).join("")}`;
  $("leadAssigneeFilter").innerHTML = `<option value="">全部负责人</option>${[...new Set(state.leads.map((lead) => lead.assignee))].map((item) => `<option>${esc(item)}</option>`).join("")}`;
}
function renderLeads() {
  const query = $("leadSearch").value.trim().toLowerCase();
  const filtered = state.leads.filter((lead) => (!query || [lead.id, lead.name, lead.phone].some((value) => value.toLowerCase().includes(query))) && (!$("leadStatusFilter").value || lead.status === $("leadStatusFilter").value) && (!$("leadAssigneeFilter").value || lead.assignee === $("leadAssigneeFilter").value));
  $("leadTotal").textContent = filtered.length;
  $("leadRows").innerHTML = filtered.map(leadRow).join("");
  $("leadEmpty").hidden = filtered.length > 0;
}
function renderAccounts() {
  $("accountRows").innerHTML = state.accounts.map((account, index) => `<tr><td><strong>${esc(account.id)}</strong></td><td>${esc(account.username)}</td><td><select class="account-role" data-index="${index}"><option value="tenant_admin" ${account.role === "tenant_admin" ? "selected" : ""}>北汽管理员</option><option value="sales" ${account.role === "sales" ? "selected" : ""}>北汽销售</option></select></td><td>${account.role === "tenant_admin" ? "北汽全部线索" : "本人负责线索"}</td><td><select class="account-status" data-index="${index}"><option ${account.status === "启用" ? "selected" : ""}>启用</option><option ${account.status === "停用" ? "selected" : ""}>停用</option></select></td><td>${esc(account.lastLogin)}</td></tr>`).join("");
  $("roleGrid").innerHTML = Object.keys(roleLabels).map((role) => `<article class="role-card"><h3>${roleLabels[role]}</h3><p>${role === "tenant_admin" ? "管理当前北汽租户，不可访问其他品牌数据" : "处理本人负责的线索和任务"}</p><div class="permission-list">${permissionOptions.map((permission) => `<label><input type="checkbox" data-role="${role}" value="${permission}" ${(state.permissions[role] || []).includes(permission) ? "checked" : ""}>${permission}</label>`).join("")}</div></article>`).join("");
}
function renderTaskRules() {
  $("taskRuleList").innerHTML = state.taskRules.map((rule, index) => `<article class="task-rule"><span class="rule-index">${String(index + 1).padStart(2, "0")}</span><div class="rule-field"><label>任务类型</label><input data-task-index="${index}" data-field="type" value="${esc(rule.type)}"></div><div class="rule-field"><label>触发事件</label><input data-task-index="${index}" data-field="trigger" value="${esc(rule.trigger)}"></div><div class="rule-field"><label>默认截止时间</label><input data-task-index="${index}" data-field="deadline" value="${esc(rule.deadline)}"></div><label class="switch-label"><input type="checkbox" data-task-index="${index}" data-field="enabled" ${rule.enabled ? "checked" : ""}>启用规则</label></article>`).join("");
}

function stateByCode(code) { return state.transitionConfig.states.find((item) => item.code === code); }
function resultByCode(code) { return state.transitionConfig.results.find((item) => item.code === code); }
function tagByCode(code) { return (state.transitionConfig.leadTags || []).find((item) => item.code === code); }
function stateName(code) { return stateByCode(code)?.name || code || "—"; }
function resultName(code) { return resultByCode(code)?.name || code || "—"; }
function markDirty() { $("transitionSaveHint").textContent = "有未保存的线索流转配置"; }

function renderTransitionSummary() {
  const config = state.transitionConfig;
  const values = [["状态节点", config.states.length, `${config.states.filter((item) => item.terminal).length} 个终态`], ["线索标签", (config.leadTags || []).length, "不参与状态流转"], ["跟进结果", config.results.length, "销售工作台可选动作"], ["流转规则", config.flows.length, "状态 + 结果的组合"], ["配置版本", config.brand.version, config.brand.status]];
  $("transitionSummary").innerHTML = values.map(([label, value, note]) => `<article><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`).join("");
}
function renderStateTree() {
  $("leadTagList").innerHTML = (state.transitionConfig.leadTags || []).map((tag) => `<span class="lead-quality-tag" style="--tag-color:${tag.color}"><i></i>${esc(tag.name)}<small>${esc(tag.code)}</small></span>`).join("");
  const levels = [...new Set(state.transitionConfig.states.map((item) => item.level))].sort((a, b) => a - b);
  $("stateTree").style.gridTemplateColumns = `repeat(${levels.length}, minmax(180px, 1fr))`;
  $("stateTree").innerHTML = levels.map((level) => {
    const items = state.transitionConfig.states.filter((item) => item.level === level);
    return `<div class="tree-level"><header><span>层级 ${level}</span><strong>${items.length}</strong></header><div>${items.map((item) => `<button class="tree-node ${item.terminal ? "terminal" : ""}" data-edit-state="${esc(item.code)}" type="button" style="--node-color:${item.color}" title="${esc(item.code)}"><span></span><strong>${esc(item.name)}</strong><small>${esc(item.businessStage || groupLabels[item.group])}</small></button>`).join("") || `<p>暂无节点</p>`}</div></div>`;
  }).join("");
}
function renderStateRows() {
  $("stateRows").innerHTML = state.transitionConfig.states.map((item) => `<tr><td><code>${esc(item.code)}</code></td><td><span class="state-name-cell"><i style="background:${item.color}"></i><strong>${esc(item.name)}</strong></span></td><td><span class="group-chip ${item.group}">${esc(item.businessStage || groupLabels[item.group] || item.group)}</span></td><td>${esc(stateName(item.parent))}</td><td>${item.level}</td><td><span class="attribute-tags">${item.terminal ? "<em>终态</em>" : ""}${item.dormant ? "<em>休眠</em>" : ""}${!item.terminal && !item.dormant ? "<em>普通</em>" : ""}</span></td><td><div class="row-actions"><button data-edit-state="${esc(item.code)}" type="button">编辑</button><button class="danger-text" data-delete-state="${esc(item.code)}" type="button">删除</button></div></td></tr>`).join("");
}
function renderStrategyFilter() {
  const current = $("strategyStateFilter").value;
  $("strategyStateFilter").innerHTML = `<option value="">全部当前节点</option>${state.transitionConfig.states.map((item) => `<option value="${esc(item.code)}">${esc(item.name)}</option>`).join("")}`;
  if (stateByCode(current)) $("strategyStateFilter").value = current;
}
function renderStrategyRows() {
  const flows = state.transitionConfig.flows.filter((item) => !$("strategyStateFilter").value || item.current === $("strategyStateFilter").value);
  $("strategyCount").textContent = `显示 ${flows.length} / ${state.transitionConfig.flows.length} 条规则`;
  $("strategyRows").innerHTML = flows.map((flow) => {
    const result = resultByCode(flow.result);
    const progressLabels = { trialStatus: "是否试驾", visitStatus: "是否到店", dealStatus: "是否成交" };
    const fieldUpdates = Object.entries(flow.fieldUpdates || {}).map(([field, value]) => `${progressLabels[field] || field}：${value === "YES" ? "是" : "否"}`);
    const updates = [...(flow.setTags || []).map((code) => `标签：${tagByCode(code)?.name || code}`), ...fieldUpdates, flow.unreachable ? "未接通次数 +1" : "", flow.reason || result?.requiresReason ? "原因必填" : "", result?.requiresCallbackTime ? "时间必填" : "", flow.retry ? "生成重试" : "", flow.reactivation ? "到期回捞" : ""].filter(Boolean);
    return `<tr><td><strong>${esc(stateName(flow.current))}</strong><small class="table-code">${esc(flow.current)}</small></td><td><strong>${esc(resultName(flow.result))}</strong><small class="table-code">${categoryLabels[result?.category] || result?.category || "—"}</small></td><td><span class="flow-direction">→</span><strong>${esc(stateName(flow.next))}</strong>${flow.current === flow.next ? `<small class="self-loop">状态保持</small>` : ""}</td><td><div class="update-tags">${updates.length ? updates.map((item) => `<span>${item}</span>`).join("") : "<span>无</span>"}</div></td><td>${flow.task ? `<strong>${taskLabels[flow.task] || esc(flow.task)}</strong><small class="table-code">${esc(flow.task)}</small>` : "不生成任务"}</td><td>${esc(flow.deadline || "—")}</td><td><div class="row-actions"><button data-edit-flow="${flow.id}" type="button">编辑</button><button class="danger-text" data-delete-flow="${flow.id}" type="button">删除</button></div></td></tr>`;
  }).join("") || `<tr><td colspan="7" class="empty-cell">当前筛选条件下没有流转规则</td></tr>`;
}
function renderFlowBoard() {
  const config = state.transitionConfig;
  const levels = [...new Set(config.states.map((item) => item.level))].sort((a, b) => a - b);
  $("flowLegend").innerHTML = `<span><i class="legend-dot initial"></i>待跟进</span><span><i class="legend-dot processing"></i>跟进中</span><span><i class="legend-dot lost"></i>流失</span><span><i class="legend-dot won"></i>成交</span><strong>${state.transitionConfig.states.length} 个节点 · ${state.transitionConfig.flows.length} 条规则</strong>`;
  const nodeWidth = 172;
  const nodeHeight = 58;
  const columnGap = 265;
  const rowStep = 62;
  const paddingX = 46;
  const paddingY = 38;
  const baicRows = { issued: 4, pending: 2.6, not_followed: 5.4, contacted: 4, interested: 0.5, prospect_lost: 2.8, no_intent: 5, unreach_limit: 7.2, wrong_number: 9.4, prospect: 0.5, clear_reject: 3.3, bought_other: 6.2, won: 0.5 };
  const positions = {};
  levels.forEach((level) => {
    const entries = config.states.filter((item) => item.level === level);
    entries.forEach((item, index) => {
      const fallbackRow = index - (entries.length - 1) / 2 + 4.8;
      positions[item.code] = { x: paddingX + (level - 1) * columnGap, y: paddingY + (baicRows[item.code] ?? fallbackRow) * rowStep };
    });
  });
  const canvasWidth = paddingX * 2 + (Math.max(...levels) - 1) * columnGap + nodeWidth;
  const canvasHeight = Math.max(720, ...Object.values(positions).map((point) => point.y + nodeHeight + paddingY));
  const groupedEdges = Object.values(config.flows.reduce((groups, flow) => {
    const key = `${flow.current}:${flow.next}`;
    if (!groups[key]) groups[key] = { current: flow.current, next: flow.next, results: [] };
    groups[key].results.push(resultName(flow.result));
    return groups;
  }, {}));
  const edgeSvg = groupedEdges.map((flow) => {
    const source = positions[flow.current];
    const target = positions[flow.next];
    if (!source || !target) return "";
    const label = flow.results.length > 3 ? `${flow.results.slice(0, 3).join(" / ")} 等${flow.results.length}项` : flow.results.join(" / ");
    if (flow.current === flow.next) {
      const x1 = source.x + nodeWidth * .72;
      const y1 = source.y;
      const x2 = source.x + nodeWidth;
      const y2 = source.y + nodeHeight * .3;
      const path = `M ${x1} ${y1} C ${x1} ${y1 - 54}, ${x2 + 58} ${y1 - 54}, ${x2 + 58} ${y2} C ${x2 + 58} ${y2 + 14}, ${x2 + 28} ${y2}, ${x2} ${y2}`;
      return `<g class="flow-edge self-edge"><path d="${path}" marker-end="url(#flowArrow)"></path><text x="${source.x + nodeWidth + 24}" y="${source.y - 31}" text-anchor="middle">${esc(label)}</text></g>`;
    }
    const x1 = source.x + nodeWidth;
    const y1 = source.y + nodeHeight / 2;
    const x2 = target.x;
    const y2 = target.y + nodeHeight / 2;
    const bend = Math.max(72, (x2 - x1) * 0.46);
    const path = `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`;
    const labelX = (x1 + x2) / 2;
    const labelY = (y1 + y2) / 2 - 7;
    return `<g class="flow-edge"><path d="${path}" marker-end="url(#flowArrow)"></path><text x="${labelX}" y="${labelY}" text-anchor="middle">${esc(label)}</text></g>`;
  }).join("");
  const nodeSvg = config.states.map((item) => {
    const point = positions[item.code];
    const count = config.flows.filter((flow) => flow.current === item.code).length;
    return `<g class="flow-node-svg ${item.terminal ? "terminal" : ""}" data-flow-state="${esc(item.code)}" role="button" tabindex="0" transform="translate(${point.x} ${point.y})" style="--node-color:${item.color}"><rect class="node-body" width="${nodeWidth}" height="${nodeHeight}" rx="8"></rect><rect class="node-accent" width="4" height="${nodeHeight}" rx="2"></rect><circle class="node-port in" cx="0" cy="${nodeHeight / 2}" r="3"></circle><circle class="node-port out" cx="${nodeWidth}" cy="${nodeHeight / 2}" r="3"></circle><text class="node-title" x="18" y="24">${esc(item.name)}</text><text class="node-stage" x="18" y="42">${esc(item.businessStage || groupLabels[item.group])}</text><g class="node-count" transform="translate(${nodeWidth - 25} 10)"><circle cx="8" cy="8" r="8"></circle><text x="8" y="11" text-anchor="middle">${count}</text></g></g>`;
  }).join("");
  $("flowBoard").style.gridTemplateColumns = "none";
  $("flowBoard").innerHTML = `<svg class="transition-svg" viewBox="0 0 ${canvasWidth} ${canvasHeight}" width="${canvasWidth}" height="${canvasHeight}" aria-label="北汽线索状态流转图"><defs><marker id="flowArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L8,4 L0,8 z"></path></marker><filter id="flowShadow" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#152136" flood-opacity=".12"></feDropShadow></filter></defs>${edgeSvg}${nodeSvg}</svg>`;
  showFlowDetail($("flowDetail").dataset.state && stateByCode($("flowDetail").dataset.state) ? $("flowDetail").dataset.state : "issued");
}
function showFlowDetail(code) {
  const item = stateByCode(code); if (!item) return;
  qsa(".flow-node-svg").forEach((node) => node.classList.toggle("selected", node.dataset.flowState === code));
  $("flowDetail").dataset.state = code;
  const incoming = state.transitionConfig.flows.filter((flow) => flow.next === code && flow.current !== code);
  const outgoing = state.transitionConfig.flows.filter((flow) => flow.current === code);
  const line = (flow, incomingDirection) => `<li><span>${esc(incomingDirection ? stateName(flow.current) : resultName(flow.result))}</span><b>${esc(incomingDirection ? resultName(flow.result) : stateName(flow.next))}</b><em>${flow.task ? taskLabels[flow.task] || flow.task : "不生成任务"}</em></li>`;
  $("flowDetail").innerHTML = `<header><div><span class="detail-color" style="background:${item.color}"></span><strong>${esc(item.name)}</strong><code>${esc(item.code)}</code></div><small>${esc(item.businessStage || groupLabels[item.group] || item.group)} · 层级 ${item.level}${item.terminal ? " · 终态" : ""}</small></header><div class="flow-detail-grid"><section><h3>进入该节点 <span>${incoming.length}</span></h3><ul>${incoming.map((flow) => line(flow, true)).join("") || "<li class='no-rule'>无进入规则</li>"}</ul></section><section><h3>离开该节点 <span>${outgoing.length}</span></h3><ul>${outgoing.map((flow) => line(flow, false)).join("") || "<li class='no-rule'>无离开规则</li>"}</ul></section></div>`;
}
function renderTransitions() {
  renderTransitionSummary(); renderStateTree(); renderStateRows(); renderStrategyFilter(); renderStrategyRows(); renderFlowBoard();
  $("transitionJson").textContent = JSON.stringify(state.transitionConfig, null, 2);
}
function switchConfigTab(tab) {
  qsa(".config-tab").forEach((button) => button.classList.toggle("active", button.dataset.configTab === tab));
  qsa(".config-pane").forEach((pane) => { const active = pane.id === `config${tab[0].toUpperCase()}${tab.slice(1)}Pane`; pane.hidden = !active; pane.classList.toggle("active", active); });
  if (tab === "diagram") renderFlowBoard();
  if (tab === "preview") $("transitionJson").textContent = JSON.stringify(state.transitionConfig, null, 2);
}

let modalMode = "";
let editingKey = null;
function openTransitionModal(mode, key = null) {
  modalMode = mode; editingKey = key;
  const config = state.transitionConfig;
  $("transitionModalEyebrow").textContent = mode === "state" ? "STATE DICTIONARY" : "FOLLOW-UP STRATEGY";
  $("transitionModalTitle").textContent = `${key === null ? "添加" : "编辑"}${mode === "state" ? "节点" : "策略"}`;
  if (mode === "state") {
    const item = key ? stateByCode(key) : null;
    const parents = config.states.filter((entry) => entry.code !== key).map((entry) => `<option value="${esc(entry.code)}" ${item?.parent === entry.code ? "selected" : ""}>${esc(entry.name)}（${esc(entry.code)}）</option>`).join("");
    $("transitionModalBody").innerHTML = `<div class="modal-form-grid"><label><span>状态编码 *</span><input id="modalStateCode" required value="${esc(item?.code || "")}" ${item ? "readonly" : ""} placeholder="例如：pending"></label><label><span>显示名称 *</span><input id="modalStateName" required value="${esc(item?.name || "")}"></label><label><span>状态分组 *</span><select id="modalStateGroup">${Object.entries(groupLabels).map(([value, label]) => `<option value="${value}" ${item?.group === value ? "selected" : ""}>${label}</option>`).join("")}</select></label><label><span>业务阶段</span><select id="modalStateBusinessStage"><option ${item?.businessStage === "待跟进" ? "selected" : ""}>待跟进</option><option ${item?.businessStage === "跟进中" ? "selected" : ""}>跟进中</option><option ${item?.businessStage === "流失" ? "selected" : ""}>流失</option></select></label><label><span>父状态</span><select id="modalStateParent"><option value="">无（根状态）</option>${parents}</select></label><label><span>层级 *</span><input id="modalStateLevel" type="number" min="1" max="8" value="${item?.level || 1}" required></label><label><span>标签颜色</span><input id="modalStateColor" type="color" value="${item?.color || "#345f9f"}"></label></div><div class="modal-checks"><label><input id="modalStateTerminal" type="checkbox" ${item?.terminal ? "checked" : ""}>终态（不再产生后续流转）</label><label><input id="modalStateDormant" type="checkbox" ${item?.dormant ? "checked" : ""}>休眠态（允许到期回捞）</label></div>`;
    const wonStageOption = document.createElement("option");
    wonStageOption.textContent = "成交";
    wonStageOption.selected = item?.businessStage === "成交";
    $("modalStateBusinessStage").appendChild(wonStageOption);
  } else {
    const flow = key !== null ? config.flows.find((item) => item.id === Number(key)) : null;
    const stateOptions = (selected) => config.states.map((item) => `<option value="${esc(item.code)}" ${selected === item.code ? "selected" : ""}>${esc(item.name)}（${esc(item.code)}）</option>`).join("");
    const results = config.results.map((item) => `<option value="${esc(item.code)}" ${flow?.result === item.code ? "selected" : ""}>${esc(item.name)}（${esc(item.code)}）</option>`).join("");
    const tagOptions = (config.leadTags || []).map((tag) => `<option value="${esc(tag.code)}" ${(flow?.setTags || []).includes(tag.code) ? "selected" : ""}>${esc(tag.name)}</option>`).join("");
    const progressValue = Object.entries(flow?.fieldUpdates || {})[0];
    const progressKey = progressValue ? `${progressValue[0]}:${progressValue[1]}` : "";
    $("transitionModalBody").innerHTML = `<div class="modal-form-grid"><label><span>当前节点 *</span><select id="modalFlowCurrent">${stateOptions(flow?.current)}</select></label><label><span>跟进结果 *</span><select id="modalFlowResult">${results}<option value="__new__">＋ 新建跟进结果</option></select></label><label><span>流转至 *</span><select id="modalFlowNext">${stateOptions(flow?.next)}</select></label><label><span>同时更新线索标签</span><select id="modalFlowTag"><option value="">不更新标签</option>${tagOptions}</select></label><label><span>同时更新潜客字段</span><select id="modalFlowProgress"><option value="">不更新潜客字段</option><option value="trialStatus:YES" ${progressKey === "trialStatus:YES" ? "selected" : ""}>是否试驾：是</option><option value="trialStatus:NO" ${progressKey === "trialStatus:NO" ? "selected" : ""}>是否试驾：否</option><option value="visitStatus:YES" ${progressKey === "visitStatus:YES" ? "selected" : ""}>是否到店：是</option><option value="visitStatus:NO" ${progressKey === "visitStatus:NO" ? "selected" : ""}>是否到店：否</option><option value="dealStatus:YES" ${progressKey === "dealStatus:YES" ? "selected" : ""}>是否成交：是</option><option value="dealStatus:NO" ${progressKey === "dealStatus:NO" ? "selected" : ""}>是否成交：否</option></select></label><label><span>后续任务</span><select id="modalFlowTask"><option value="" ${!flow?.task ? "selected" : ""}>不生成任务</option><option value="FIRST_CONTACT" ${flow?.task === "FIRST_CONTACT" ? "selected" : ""}>首次联系</option><option value="CALLBACK" ${flow?.task === "CALLBACK" ? "selected" : ""}>普通回访</option></select></label><label><span>默认截止时间</span><input id="modalFlowDeadline" value="${esc(flow?.deadline || "—")}"></label></div><div class="new-result-fields" id="newResultFields" hidden><div class="modal-form-grid"><label><span>结果编码 *</span><input id="modalResultCode"></label><label><span>结果名称 *</span><input id="modalResultName"></label><label><span>结果分类</span><select id="modalResultCategory">${Object.entries(categoryLabels).map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select></label></div></div><div class="modal-checks"><label><input id="modalFlowUnreachable" type="checkbox" ${flow?.unreachable ? "checked" : ""}>未接通次数 +1</label><label><input id="modalFlowReason" type="checkbox" ${flow?.reason ? "checked" : ""}>原因必填</label><label><input id="modalFlowCallback" type="checkbox" ${resultByCode(flow?.result)?.requiresCallbackTime ? "checked" : ""}>下次联系时间必填</label><label><input id="modalFlowRetry" type="checkbox" ${flow?.retry ? "checked" : ""}>生成重试任务</label><label><input id="modalFlowReactivation" type="checkbox" ${flow?.reactivation ? "checked" : ""}>到期生成回捞任务</label></div>`;
    $("modalFlowResult").addEventListener("change", (event) => { $("newResultFields").hidden = event.target.value !== "__new__"; });
  }
  $("transitionModal").hidden = false;
  document.body.classList.add("modal-open");
  $("transitionModalBody").querySelector("input:not([readonly]), select")?.focus();
}
function closeTransitionModal() { $("transitionModal").hidden = true; document.body.classList.remove("modal-open"); $("transitionModalForm").reset(); }
function saveStateFromModal() {
  const code = $("modalStateCode").value.trim(); const name = $("modalStateName").value.trim();
  if (!code || !name) return toast("请填写状态编码和显示名称");
  if (editingKey === null && stateByCode(code)) return toast("状态编码已存在");
  const item = { code, name, group: $("modalStateGroup").value, businessStage: $("modalStateBusinessStage").value, parent: $("modalStateParent").value || null, level: Number($("modalStateLevel").value), terminal: $("modalStateTerminal").checked, dormant: $("modalStateDormant").checked, color: $("modalStateColor").value };
  if (editingKey === null) state.transitionConfig.states.push(item); else Object.assign(stateByCode(editingKey), item);
  markDirty(); closeTransitionModal(); renderTransitions(); toast("节点已更新，保存后生效");
}
function saveFlowFromModal() {
  const config = state.transitionConfig; let result = $("modalFlowResult").value;
  if (result === "__new__") {
    result = $("modalResultCode").value.trim(); const name = $("modalResultName").value.trim();
    if (!result || !name) return toast("请填写新跟进结果的编码和名称");
    if (resultByCode(result)) return toast("跟进结果编码已存在");
    config.results.push({ code: result, name, category: $("modalResultCategory").value, requiresCallbackTime: $("modalFlowCallback").checked, requiresReason: $("modalFlowReason").checked });
  } else {
    resultByCode(result).requiresCallbackTime = $("modalFlowCallback").checked;
    resultByCode(result).requiresReason = $("modalFlowReason").checked;
  }
  const current = $("modalFlowCurrent").value;
  if (config.flows.some((item) => item.current === current && item.result === result && item.id !== Number(editingKey))) return toast("该节点与跟进结果的组合已存在");
  const progressParts = $("modalFlowProgress").value.split(":");
  const flow = { id: editingKey === null ? Math.max(0, ...config.flows.map((item) => item.id)) + 1 : Number(editingKey), current, result, next: $("modalFlowNext").value, setTags: $("modalFlowTag").value ? [$("modalFlowTag").value] : [], fieldUpdates: progressParts.length === 2 ? { [progressParts[0]]: progressParts[1] } : {}, unreachable: $("modalFlowUnreachable").checked, reason: $("modalFlowReason").checked, task: $("modalFlowTask").value || null, deadline: $("modalFlowDeadline").value.trim() || "—", retry: $("modalFlowRetry").checked, reactivation: $("modalFlowReactivation").checked };
  if (editingKey === null) config.flows.push(flow); else Object.assign(config.flows.find((item) => item.id === Number(editingKey)), flow);
  markDirty(); closeTransitionModal(); renderTransitions(); switchConfigTab("strategies"); toast("跟进策略已更新，保存后生效");
}
function deleteState(code) {
  if (state.transitionConfig.states.some((item) => item.parent === code)) return toast("该节点存在子节点，不能删除");
  if (state.transitionConfig.flows.some((item) => item.current === code || item.next === code)) return toast("该节点已被流转规则引用，不能删除");
  if (!confirm(`确定删除节点“${stateName(code)}”吗？`)) return;
  state.transitionConfig.states = state.transitionConfig.states.filter((item) => item.code !== code); markDirty(); renderTransitions();
}
function deleteFlow(id) {
  if (!confirm("确定删除这条流转策略吗？")) return;
  state.transitionConfig.flows = state.transitionConfig.flows.filter((item) => item.id !== Number(id)); markDirty(); renderTransitions(); switchConfigTab("strategies");
}
function validateTransitions() {
  const states = new Set(state.transitionConfig.states.map((item) => item.code)); const results = new Set(state.transitionConfig.results.map((item) => item.code)); const tags = new Set((state.transitionConfig.leadTags || []).map((item) => item.code)); const combinations = new Set(); const errors = [];
  state.transitionConfig.states.forEach((item) => { if (item.parent && !states.has(item.parent)) errors.push(`${item.name} 的父节点不存在`); });
  state.transitionConfig.flows.forEach((flow) => { if (!states.has(flow.current) || !states.has(flow.next)) errors.push(`规则 ${flow.id} 引用了不存在的节点`); if (!results.has(flow.result)) errors.push(`规则 ${flow.id} 引用了不存在的跟进结果`); (flow.setTags || []).forEach((tag) => { if (!tags.has(tag)) errors.push(`规则 ${flow.id} 引用了不存在的线索标签`); }); const key = `${flow.current}:${flow.result}`; if (combinations.has(key)) errors.push(`${stateName(flow.current)} + ${resultName(flow.result)} 存在重复规则`); combinations.add(key); });
  return errors;
}

qsa(".nav-item").forEach((button) => button.addEventListener("click", () => openView(button.dataset.view)));
qsa("[data-go]").forEach((button) => button.addEventListener("click", () => openView(button.dataset.go)));
$("menuButton").addEventListener("click", () => document.querySelector(".admin-sidebar").classList.toggle("open"));
["leadSearch", "leadStatusFilter", "leadAssigneeFilter"].forEach((id) => $(id).addEventListener(id === "leadSearch" ? "input" : "change", renderLeads));
$("resetLeadFilters").addEventListener("click", () => { $("leadSearch").value = ""; $("leadStatusFilter").value = ""; $("leadAssigneeFilter").value = ""; renderLeads(); });
$("showAccountForm").addEventListener("click", () => { $("accountForm").hidden = false; $("accountId").focus(); });
$("showTaskForm").addEventListener("click", () => { $("taskForm").hidden = false; $("taskType").focus(); });
qsa(".cancel-inline").forEach((button) => button.addEventListener("click", () => { button.closest("form").hidden = true; button.closest("form").reset(); }));
$("accountForm").addEventListener("submit", (event) => { event.preventDefault(); const id = $("accountId").value.trim(); if (state.accounts.some((account) => account.id === id)) return toast("账号ID已存在，请使用新的ID"); const role = $("accountRole").value; state.accounts.unshift({ id, username: $("accountName").value.trim(), role, dataScope: role === "tenant_admin" ? "北汽全部线索" : "本人负责线索", status: "启用", lastLogin: "尚未登录" }); persist(); renderAccounts(); event.target.reset(); event.target.hidden = true; toast("北汽账号已创建"); });
$("accountRows").addEventListener("change", (event) => { const index = Number(event.target.dataset.index); if (event.target.classList.contains("account-role")) { state.accounts[index].role = event.target.value; state.accounts[index].dataScope = event.target.value === "tenant_admin" ? "北汽全部线索" : "本人负责线索"; } if (event.target.classList.contains("account-status")) state.accounts[index].status = event.target.value; persist(); renderAccounts(); toast("账号配置已更新"); });
$("savePermissions").addEventListener("click", () => { state.permissions = {}; qsa(".permission-list input:checked").forEach((input) => { if (!state.permissions[input.dataset.role]) state.permissions[input.dataset.role] = []; state.permissions[input.dataset.role].push(input.value); }); persist(); toast("角色权限已保存"); });
$("taskForm").addEventListener("submit", (event) => { event.preventDefault(); state.taskRules.push({ id: `RULE-${Date.now()}`, type: $("taskType").value.trim(), trigger: $("taskTriggerInput").value.trim(), deadline: $("taskDeadline").value.trim(), assignee: "原销售", enabled: true }); renderTaskRules(); event.target.reset(); event.target.hidden = true; toast("任务规则已添加，保存后生效"); });
$("taskRuleList").addEventListener("input", (event) => { const index = Number(event.target.dataset.taskIndex); if (Number.isNaN(index)) return; state.taskRules[index][event.target.dataset.field] = event.target.type === "checkbox" ? event.target.checked : event.target.value; $("taskSaveHint").textContent = "有未保存的任务配置"; });
$("saveTaskRules").addEventListener("click", () => { persist(); $("taskSaveHint").textContent = "配置已保存，将应用到新生成的任务"; toast("任务配置已保存"); });

qsa(".config-tab").forEach((button) => button.addEventListener("click", () => switchConfigTab(button.dataset.configTab)));
$("showStateForm").addEventListener("click", () => openTransitionModal("state"));
$("showStrategyForm").addEventListener("click", () => openTransitionModal("flow"));
$("strategyStateFilter").addEventListener("change", renderStrategyRows);
$("stateTree").addEventListener("click", (event) => { const target = event.target.closest("[data-edit-state]"); if (target) openTransitionModal("state", target.dataset.editState); });
$("stateRows").addEventListener("click", (event) => { const edit = event.target.closest("[data-edit-state]"); const remove = event.target.closest("[data-delete-state]"); if (edit) openTransitionModal("state", edit.dataset.editState); if (remove) deleteState(remove.dataset.deleteState); });
$("strategyRows").addEventListener("click", (event) => { const edit = event.target.closest("[data-edit-flow]"); const remove = event.target.closest("[data-delete-flow]"); if (edit) openTransitionModal("flow", edit.dataset.editFlow); if (remove) deleteFlow(remove.dataset.deleteFlow); });
$("flowBoard").addEventListener("click", (event) => { const target = event.target.closest("[data-flow-state]"); if (target) showFlowDetail(target.dataset.flowState); });
$("flowBoard").addEventListener("keydown", (event) => { const target = event.target.closest("[data-flow-state]"); if (target && ["Enter", " "].includes(event.key)) { event.preventDefault(); showFlowDetail(target.dataset.flowState); } });
$("transitionModalForm").addEventListener("submit", (event) => { event.preventDefault(); modalMode === "state" ? saveStateFromModal() : saveFlowFromModal(); });
[$("closeTransitionModal"), $("cancelTransitionModal")].forEach((button) => button.addEventListener("click", closeTransitionModal));
$("transitionModal").addEventListener("click", (event) => { if (event.target === $("transitionModal")) closeTransitionModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !$("transitionModal").hidden) closeTransitionModal(); });
$("saveTransitions").addEventListener("click", () => { const errors = validateTransitions(); if (errors.length) return toast(`配置未保存：${errors[0]}`); const version = Number(state.transitionConfig.brand.version.replace(/[^0-9.]/g, "")) || 1; state.transitionConfig.brand.version = `V${(version + 0.1).toFixed(1)}`; state.transitionConfig.brand.status = "已保存"; state.transitionConfig.brand.updatedAt = new Date().toLocaleString("zh-CN", { hour12: false }); persist(); renderTransitions(); $("transitionSaveHint").textContent = `配置已保存 · ${state.transitionConfig.brand.version} · ${state.transitionConfig.brand.updatedAt}`; toast("线索流转配置已保存"); });
$("copyTransitionConfig").addEventListener("click", async () => { try { await navigator.clipboard.writeText(JSON.stringify(state.transitionConfig, null, 2)); toast("配置已复制"); } catch (error) { toast("浏览器未允许复制，请手动选择配置内容"); } });
$("exportTransitionConfig").addEventListener("click", () => { const blob = new Blob([JSON.stringify(state.transitionConfig, null, 2)], { type: "application/json" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `baic-lead-transition-${state.transitionConfig.brand.version}.json`; link.click(); URL.revokeObjectURL(link.href); });

buildLeadFilters(); renderDashboard(); renderAccounts(); renderTaskRules(); renderTransitions();
