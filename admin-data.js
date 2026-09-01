window.BAIC_ADMIN_DATA = {
  tenant: { id: "TENANT-BAIC", name: "北汽", brand: "BAIC", scope: "仅北汽品牌数据" },
  currentAccount: { id: "baic_admin_001", name: "北汽管理员", role: "tenant_admin" },
  leads: [
    { id: "BAIC-LD-260831-001", name: "María Flores", phone: "5512789042", source: "北汽品牌官网", type: "金融", series: "BJ40", model: "Plus", status: "未跟进", subStatus: "正常等待跟进", quality: "UNKNOWN", assignee: "北汽销售001", createdAt: "2026-08-31 09:42", task: "首次联系", taskStatus: "待处理" },
    { id: "BAIC-LD-260831-002", name: "Carlos Rivera", phone: "5583017265", source: "金融计算器", type: "金融", series: "X55", model: "Honor", status: "未跟进", subStatus: "第1次未接通", quality: "UNKNOWN", assignee: "北汽销售002", createdAt: "2026-08-31 09:18", task: "普通回访", taskStatus: "处理中" },
    { id: "BAIC-LD-260831-003", name: "Ana Sánchez", phone: "5528901437", source: "试驾活动页", type: "试驾", series: "BJ30", model: "Exclusive", status: "已跟进", subStatus: "有意向 · 潜客", quality: "VALID", assignee: "北汽销售001", createdAt: "2026-08-31 08:55", task: "普通回访", taskStatus: "处理中" },
    { id: "BAIC-LD-260830-016", name: "Jorge Medina", phone: "5541198702", source: "经销商二维码", type: "全款", series: "EU5", model: "Luxury", status: "已跟进", subStatus: "已到店未成交", quality: "VALID", assignee: "北汽销售003", createdAt: "2026-08-30 16:24", task: "普通回访", taskStatus: "待处理" },
    { id: "BAIC-LD-260830-011", name: "Lucía Torres", phone: "5590276148", source: "WhatsApp活动", type: "金融", series: "X7", model: "Premium", status: "过期未跟进", subStatus: "超过72小时", quality: "UNKNOWN", assignee: "北汽销售002", createdAt: "2026-08-30 14:10", task: "首次联系", taskStatus: "已逾期" },
    { id: "BAIC-LD-260829-027", name: "Miguel García", phone: "5567319204", source: "车型详情页", type: "金融", series: "BJ40", model: "Honor", status: "无效线索", subStatus: "号码错误", quality: "INVALID", assignee: "北汽销售001", createdAt: "2026-08-29 18:32", task: "—", taskStatus: "已结束" },
    { id: "BAIC-LD-260829-019", name: "Sofía Castro", phone: "5536801742", source: "北汽品牌官网", type: "金融", series: "X55", model: "Luxury", status: "成交", subStatus: "已成交", quality: "VALID", assignee: "北汽销售003", createdAt: "2026-08-29 11:05", task: "—", taskStatus: "已完成" },
    { id: "BAIC-LD-260828-008", name: "Diego Ramírez", phone: "5571449038", source: "内容文章页", type: "试驾", series: "BJ30", model: "Honor", status: "已跟进", subStatus: "战败 · 明确拒绝", quality: "VALID", assignee: "北汽销售002", createdAt: "2026-08-28 10:21", task: "—", taskStatus: "已结束" }
  ],
  accounts: [
    { id: "baic_admin_001", username: "北汽管理员", role: "tenant_admin", dataScope: "北汽全部线索", status: "启用", lastLogin: "今天 09:12" },
    { id: "baic_sales_001", username: "北汽销售001", role: "sales", dataScope: "本人负责线索", status: "启用", lastLogin: "今天 09:38" },
    { id: "baic_sales_002", username: "北汽销售002", role: "sales", dataScope: "本人负责线索", status: "启用", lastLogin: "今天 09:26" },
    { id: "baic_sales_003", username: "北汽销售003", role: "sales", dataScope: "本人负责线索", status: "停用", lastLogin: "08-29 17:44" }
  ],
  permissions: {
    tenant_admin: ["查看北汽全部线索", "配置账号与角色", "配置任务规则", "配置线索流转", "查看操作记录"],
    sales: ["查看本人负责线索", "处理销售任务", "提交跟进结果", "编辑用户当前信息", "添加跟踪记事"]
  },
  taskRules: [
    { id: "RULE-FIRST", group: "FIRST_CONTACT", type: "首次联系", trigger: "新线索分配", deadline: "30分钟", assignee: "线索负责人", enabled: true },
    { id: "RULE-OVERDUE", group: "FIRST_CONTACT", type: "首次联系", trigger: "超过72小时仍未完成首次有效跟进", deadline: "立即处理", assignee: "线索负责人", enabled: true },
    { id: "RULE-RETRY", group: "CALLBACK", type: "普通回访", trigger: "第1或第2次未接通", deadline: "+2小时", assignee: "原销售", enabled: true },
    { id: "RULE-PROSPECT", group: "CALLBACK", type: "普通回访", trigger: "客户有意向但仍需推进", deadline: "+1天", assignee: "原销售", enabled: true },
    { id: "RULE-TRIAL", group: "CALLBACK", type: "普通回访", trigger: "已预约试驾或预约未到店", deadline: "+1天", assignee: "原销售", enabled: true },
    { id: "RULE-DEAL", group: "CALLBACK", type: "普通回访", trigger: "已到店但尚未成交", deadline: "+1天", assignee: "原销售", enabled: true }
  ],
  transitionConfig: {
    brand: { name: "北汽", code: "baic", version: "V1.0", status: "草稿", source: "北汽节点图" },
    states: [
      { code: "issued", name: "线索下发", group: "entry", businessStage: "系统入口", parent: null, level: 1, terminal: false, dormant: false, color: "#718096" },
      { code: "not_followed", name: "正常等待跟进", group: "not_followed", businessStage: "未跟进", parent: "issued", level: 2, terminal: false, dormant: false, color: "#4d8df7" },
      { code: "overdue", name: "超过72小时", group: "overdue", businessStage: "过期未跟进", parent: "not_followed", level: 3, terminal: false, dormant: false, color: "#f0a33a" },
      { code: "followed_prospect", name: "有意向 · 潜客", group: "followed", businessStage: "已跟进", parent: "not_followed", level: 4, terminal: false, dormant: false, color: "#2fcf9f" },
      { code: "trial_booked", name: "已预约试驾", group: "followed", businessStage: "已跟进", parent: "followed_prospect", level: 5, terminal: false, dormant: false, color: "#2fcf9f" },
      { code: "appointment_no_show", name: "预约未到店", group: "followed", businessStage: "已跟进", parent: "trial_booked", level: 6, terminal: false, dormant: false, color: "#4d8df7" },
      { code: "visited", name: "已到店", group: "followed", businessStage: "已跟进", parent: "trial_booked", level: 6, terminal: false, dormant: false, color: "#2fcf9f" },
      { code: "visited_not_deal", name: "已到店未成交", group: "followed", businessStage: "已跟进", parent: "visited", level: 7, terminal: false, dormant: false, color: "#4d8df7" },
      { code: "won", name: "已成交", group: "won", businessStage: "成交", parent: "visited", level: 7, terminal: true, dormant: false, color: "#19a974" },
      { code: "followed_lost_reject", name: "战败 · 明确拒绝", group: "followed", businessStage: "已跟进", parent: "followed_prospect", level: 7, terminal: true, dormant: false, color: "#dc6262" },
      { code: "followed_lost_other", name: "战败 · 已购买其他品牌", group: "followed", businessStage: "已跟进", parent: "followed_prospect", level: 7, terminal: true, dormant: false, color: "#dc6262" },
      { code: "invalid_unreachable", name: "3次未接通", group: "invalid", businessStage: "无效线索", parent: "not_followed", level: 4, terminal: true, dormant: false, color: "#8b95a6" },
      { code: "invalid_number", name: "号码错误", group: "invalid", businessStage: "无效线索", parent: "not_followed", level: 4, terminal: true, dormant: false, color: "#8b95a6" }
    ],
    qualityOptions: [
      { code: "UNKNOWN", name: "待判定", color: "#8b95a6" },
      { code: "VALID", name: "有效", color: "#19a974" },
      { code: "INVALID", name: "无效", color: "#dc6262" }
    ],
    leadTags: [],
    progressFields: [
      { code: "trialStatus", name: "是否预约试驾", values: ["YES", "NO"], resultCodes: ["interested"], sortOrder: 10 },
      { code: "visitStatus", name: "是否到店", values: ["YES", "NO"], resultCodes: ["interested"], dependsOn: { field: "trialStatus", value: "YES" }, sortOrder: 20 },
      { code: "dealStatus", name: "是否成交", values: ["YES", "NO"], resultCodes: ["interested"], dependsOn: { field: "visitStatus", value: "YES" }, sortOrder: 30 }
    ],
    progressStateRules: [
      { priority: 60, field: "dealStatus", value: "YES", next: "won" },
      { priority: 50, field: "dealStatus", value: "NO", requires: { visitStatus: "YES" }, next: "visited_not_deal" },
      { priority: 40, field: "visitStatus", value: "YES", next: "visited" },
      { priority: 30, field: "visitStatus", value: "NO", requires: { trialStatus: "YES" }, next: "appointment_no_show" },
      { priority: 20, field: "trialStatus", value: "YES", next: "trial_booked" },
      { priority: 10, field: "trialStatus", value: "NO", next: "followed_prospect" }
    ],
    results: [
      { code: "assigned", name: "下发分配", actor: "system", enabled: true, sortOrder: 10, category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "timeout", name: "超时未跟进", actor: "system", enabled: true, sortOrder: 20, category: "unreachable", requiresCallbackTime: false, requiresReason: false },
      { code: "interested", name: "有意向", actor: "sales", enabled: true, sortOrder: 10, category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "clear_reject", name: "明确拒绝", actor: "sales", enabled: true, sortOrder: 20, category: "lost", requiresCallbackTime: false, requiresReason: true },
      { code: "bought_other", name: "已购买其他品牌", actor: "sales", enabled: true, sortOrder: 30, category: "lost", requiresCallbackTime: false, requiresReason: true },
      { code: "unreachable", name: "未接通", actor: "sales", enabled: true, sortOrder: 40, category: "unreachable", requiresCallbackTime: false, requiresReason: false },
      { code: "invalid_number", name: "号码错误", actor: "sales", enabled: true, sortOrder: 50, category: "lost", requiresCallbackTime: false, requiresReason: true }
    ],
    flows: [
      { id: 1, current: "issued", result: "assigned", next: "not_followed", qualityUpdate: "UNKNOWN", unreachable: false, reason: false, task: "FIRST_CONTACT", taskRuleId: "RULE-FIRST", deadline: "30分钟" },
      { id: 2, current: "not_followed", result: "timeout", next: "overdue", qualityUpdate: "UNKNOWN", unreachable: false, reason: false, task: "FIRST_CONTACT", taskRuleId: "RULE-OVERDUE", deadline: "立即处理" },
      { id: 3, current: "not_followed", result: "interested", next: "followed_prospect", qualityUpdate: "VALID", unreachable: false, reason: false, task: "CALLBACK", taskRuleId: "RULE-PROSPECT", deadline: "+1天" },
      { id: 4, current: "not_followed", result: "clear_reject", next: "followed_lost_reject", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 5, current: "not_followed", result: "bought_other", next: "followed_lost_other", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 6, current: "not_followed", result: "unreachable", next: "not_followed", qualityUpdate: "UNKNOWN", unreachable: true, terminalAt: 3, terminalNext: "invalid_unreachable", terminalQuality: "INVALID", reason: false, task: "CALLBACK", taskRuleId: "RULE-RETRY", deadline: "+2小时" },
      { id: 7, current: "not_followed", result: "invalid_number", next: "invalid_number", qualityUpdate: "INVALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 8, current: "overdue", result: "interested", next: "followed_prospect", qualityUpdate: "VALID", unreachable: false, reason: false, task: "CALLBACK", taskRuleId: "RULE-PROSPECT", deadline: "+1天" },
      { id: 9, current: "overdue", result: "clear_reject", next: "followed_lost_reject", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 10, current: "overdue", result: "bought_other", next: "followed_lost_other", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 11, current: "overdue", result: "unreachable", next: "overdue", qualityUpdate: "UNKNOWN", unreachable: true, terminalAt: 3, terminalNext: "invalid_unreachable", terminalQuality: "INVALID", reason: false, task: "CALLBACK", taskRuleId: "RULE-RETRY", deadline: "+2小时" },
      { id: 12, current: "overdue", result: "invalid_number", next: "invalid_number", qualityUpdate: "INVALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 13, current: "followed_prospect", result: "interested", next: "followed_prospect", qualityUpdate: "VALID", unreachable: false, reason: false, task: "CALLBACK", taskRuleId: "RULE-PROSPECT", deadline: "+1天" },
      { id: 14, current: "followed_prospect", result: "clear_reject", next: "followed_lost_reject", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 15, current: "followed_prospect", result: "bought_other", next: "followed_lost_other", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 16, current: "trial_booked", result: "interested", next: "trial_booked", qualityUpdate: "VALID", unreachable: false, reason: false, task: "CALLBACK", taskRuleId: "RULE-TRIAL", deadline: "+1天" },
      { id: 17, current: "trial_booked", result: "clear_reject", next: "followed_lost_reject", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 18, current: "trial_booked", result: "bought_other", next: "followed_lost_other", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 19, current: "appointment_no_show", result: "interested", next: "appointment_no_show", qualityUpdate: "VALID", unreachable: false, reason: false, task: "CALLBACK", taskRuleId: "RULE-TRIAL", deadline: "+1天" },
      { id: 20, current: "appointment_no_show", result: "clear_reject", next: "followed_lost_reject", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 21, current: "appointment_no_show", result: "bought_other", next: "followed_lost_other", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 22, current: "visited", result: "interested", next: "visited", qualityUpdate: "VALID", unreachable: false, reason: false, task: "CALLBACK", taskRuleId: "RULE-DEAL", deadline: "+1天" },
      { id: 23, current: "visited", result: "clear_reject", next: "followed_lost_reject", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 24, current: "visited", result: "bought_other", next: "followed_lost_other", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 25, current: "visited_not_deal", result: "interested", next: "visited_not_deal", qualityUpdate: "VALID", unreachable: false, reason: false, task: "CALLBACK", taskRuleId: "RULE-DEAL", deadline: "+1天" },
      { id: 26, current: "visited_not_deal", result: "clear_reject", next: "followed_lost_reject", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 27, current: "visited_not_deal", result: "bought_other", next: "followed_lost_other", qualityUpdate: "VALID", unreachable: false, reason: true, task: null, deadline: "—" }
    ],
    journeyDiagram: {
      width: 2160,
      height: 900,
      nodes: [
        { id: "issued", label: "线索下发", subtitle: "系统入口", kind: "state", stateCode: "issued", x: 40, y: 360 },
        { id: "firstTask", label: "生成首次联系任务", subtitle: "30分钟", kind: "task", x: 245, y: 360 },
        { id: "notFollowed", label: "未跟进", subtitle: "待判定", kind: "state", stateCode: "not_followed", x: 485, y: 360 },
        { id: "overdue", label: "过期未跟进", subtitle: "待判定", kind: "state", stateCode: "overdue", x: 485, y: 80 },
        { id: "contactResult", label: "首次联系结果", subtitle: "销售提交", kind: "decision", x: 740, y: 360 },
        { id: "retryTask", label: "生成普通回访任务", subtitle: "继续联系", kind: "task", x: 730, y: 715 },
        { id: "invalidUnreachable", label: "3次未接通", subtitle: "无效线索", kind: "invalid", stateCode: "invalid_unreachable", x: 1010, y: 690 },
        { id: "invalidNumber", label: "号码错误", subtitle: "无效线索", kind: "invalid", stateCode: "invalid_number", x: 1010, y: 800 },
        { id: "prospect", label: "有意向潜客", subtitle: "有效线索", kind: "state", stateCode: "followed_prospect", x: 1010, y: 300 },
        { id: "appointment", label: "预约试驾？", subtitle: "推进判断", kind: "decision", x: 1250, y: 220 },
        { id: "booked", label: "已预约试驾", subtitle: "有效线索", kind: "state", stateCode: "trial_booked", x: 1470, y: 120 },
        { id: "arrival", label: "是否到店？", subtitle: "推进判断", kind: "decision", x: 1685, y: 230 },
        { id: "noShow", label: "预约未到店", subtitle: "继续跟进", kind: "state", stateCode: "appointment_no_show", x: 1685, y: 420 },
        { id: "arrived", label: "已到店", subtitle: "有效线索", kind: "state", stateCode: "visited", x: 1685, y: 70 },
        { id: "deal", label: "是否成交？", subtitle: "推进判断", kind: "decision", x: 1900, y: 210 },
        { id: "notDeal", label: "已到店未成交", subtitle: "继续跟进", kind: "state", stateCode: "visited_not_deal", x: 1900, y: 420 },
        { id: "won", label: "成交", subtitle: "终态", kind: "success", stateCode: "won", x: 1900, y: 40 },
        { id: "lostReject", label: "战败：明确拒绝", subtitle: "有效线索终态", kind: "failure", stateCode: "followed_lost_reject", x: 1460, y: 610 },
        { id: "lostOther", label: "战败：已购买其他品牌", subtitle: "有效线索终态", kind: "failure", stateCode: "followed_lost_other", x: 1700, y: 610 }
      ],
      edges: [
        { from: "issued", to: "firstTask" }, { from: "firstTask", to: "notFollowed" },
        { from: "notFollowed", to: "overdue", label: "超过72小时" }, { from: "notFollowed", to: "contactResult" }, { from: "overdue", to: "contactResult" },
        { from: "contactResult", to: "retryTask", label: "未接通1或2次" }, { from: "retryTask", to: "notFollowed", label: "再次联系" },
        { from: "contactResult", to: "invalidUnreachable", label: "第3次未接通" }, { from: "contactResult", to: "invalidNumber", label: "号码错误" },
        { from: "contactResult", to: "lostReject", label: "明确拒绝" }, { from: "contactResult", to: "lostOther", label: "购买其他品牌" },
        { from: "contactResult", to: "prospect", label: "有意向" }, { from: "prospect", to: "appointment" },
        { from: "appointment", to: "retryTask", label: "否" }, { from: "appointment", to: "booked", label: "是" }, { from: "booked", to: "arrival" },
        { from: "arrival", to: "noShow", label: "否" }, { from: "noShow", to: "retryTask" }, { from: "arrival", to: "arrived", label: "是" },
        { from: "arrived", to: "deal" }, { from: "deal", to: "notDeal", label: "否" }, { from: "notDeal", to: "retryTask" }, { from: "deal", to: "won", label: "是" },
        { from: "prospect", to: "lostReject", label: "后续明确拒绝" }, { from: "prospect", to: "lostOther", label: "后续购买其他品牌" }
      ]
    }
  }
};
