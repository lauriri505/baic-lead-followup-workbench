window.BAIC_ADMIN_DATA = {
  tenant: { id: "TENANT-BAIC", name: "北汽", brand: "BAIC", scope: "仅北汽品牌数据" },
  currentAccount: { id: "baic_admin_001", name: "北汽管理员", role: "tenant_admin" },
  leads: [
    { id: "BAIC-LD-260831-001", name: "María Flores", phone: "5512789042", source: "北汽品牌官网", type: "金融", series: "BJ40", model: "Plus", status: "未跟进", subStatus: "正常等待跟进", assignee: "北汽销售001", createdAt: "2026-08-31 09:42", task: "首次联系", taskStatus: "待处理" },
    { id: "BAIC-LD-260831-002", name: "Carlos Rivera", phone: "5583017265", source: "金融计算器", type: "金融", series: "X55", model: "Honor", status: "未跟进", subStatus: "第1次未接通", assignee: "北汽销售002", createdAt: "2026-08-31 09:18", task: "普通回访", taskStatus: "处理中" },
    { id: "BAIC-LD-260831-003", name: "Ana Sánchez", phone: "5528901437", source: "试驾活动页", type: "试驾", series: "BJ30", model: "Exclusive", status: "已跟进", subStatus: "有意向 · 潜客", assignee: "北汽销售001", createdAt: "2026-08-31 08:55", task: "普通回访", taskStatus: "处理中" },
    { id: "BAIC-LD-260830-016", name: "Jorge Medina", phone: "5541198702", source: "经销商二维码", type: "全款", series: "EU5", model: "Luxury", status: "已跟进", subStatus: "有意向 · 潜客", assignee: "北汽销售003", createdAt: "2026-08-30 16:24", task: "普通回访", taskStatus: "待处理" },
    { id: "BAIC-LD-260830-011", name: "Lucía Torres", phone: "5590276148", source: "WhatsApp活动", type: "金融", series: "X7", model: "Premium", status: "过期未跟进", subStatus: "超过72小时", assignee: "北汽销售002", createdAt: "2026-08-30 14:10", task: "首次联系", taskStatus: "已逾期" },
    { id: "BAIC-LD-260829-027", name: "Miguel García", phone: "5567319204", source: "车型详情页", type: "金融", series: "BJ40", model: "Honor", status: "无效线索", subStatus: "号码错误", assignee: "北汽销售001", createdAt: "2026-08-29 18:32", task: "—", taskStatus: "已结束" },
    { id: "BAIC-LD-260829-019", name: "Sofía Castro", phone: "5536801742", source: "北汽品牌官网", type: "金融", series: "X55", model: "Luxury", status: "已跟进", subStatus: "有意向 · 潜客（已成交）", assignee: "北汽销售003", createdAt: "2026-08-29 11:05", task: "—", taskStatus: "已完成" },
    { id: "BAIC-LD-260828-008", name: "Diego Ramírez", phone: "5571449038", source: "内容文章页", type: "试驾", series: "BJ30", model: "Honor", status: "已跟进", subStatus: "战败 · 明确拒绝", assignee: "北汽销售002", createdAt: "2026-08-28 10:21", task: "—", taskStatus: "已结束" }
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
    { id: "RULE-FIRST", type: "首次联系", trigger: "新线索分配", deadline: "30分钟", assignee: "线索负责人", enabled: true },
    { id: "RULE-RETRY", type: "普通回访", trigger: "线索仍需继续联系", deadline: "+2小时", assignee: "原销售", enabled: true }
  ],
  transitionConfig: {
    brand: { name: "北汽", code: "baic", version: "V1.0", status: "草稿", source: "北汽节点图" },
    states: [
      { code: "issued", name: "线索下发", group: "entry", businessStage: "系统入口", parent: null, level: 1, terminal: false, dormant: false, color: "#718096" },
      { code: "not_followed", name: "正常等待跟进", group: "not_followed", businessStage: "未跟进", parent: "issued", level: 2, terminal: false, dormant: false, color: "#4d8df7" },
      { code: "overdue", name: "超过72小时", group: "overdue", businessStage: "过期未跟进", parent: "not_followed", level: 3, terminal: false, dormant: false, color: "#f0a33a" },
      { code: "followed_prospect", name: "有意向 · 潜客", group: "followed", businessStage: "已跟进", parent: "not_followed", level: 4, terminal: false, dormant: false, color: "#2fcf9f" },
      { code: "followed_lost_reject", name: "战败 · 明确拒绝", group: "followed", businessStage: "已跟进", parent: "followed_prospect", level: 5, terminal: true, dormant: false, color: "#dc6262" },
      { code: "followed_lost_other", name: "战败 · 已购买其他品牌", group: "followed", businessStage: "已跟进", parent: "followed_prospect", level: 5, terminal: true, dormant: false, color: "#dc6262" },
      { code: "invalid_unreachable", name: "3次未接通", group: "invalid", businessStage: "无效线索", parent: "not_followed", level: 4, terminal: true, dormant: false, color: "#8b95a6" },
      { code: "invalid_number", name: "号码错误", group: "invalid", businessStage: "无效线索", parent: "not_followed", level: 4, terminal: true, dormant: false, color: "#8b95a6" }
    ],
    leadTags: [],
    progressFields: [
      { code: "trialStatus", name: "是否试驾", values: ["YES", "NO"] },
      { code: "visitStatus", name: "是否到店", values: ["YES", "NO"] },
      { code: "dealStatus", name: "是否成交", values: ["YES", "NO"] }
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
      { id: 1, current: "issued", result: "assigned", next: "not_followed", setTags: [], unreachable: false, reason: false, task: "FIRST_CONTACT", deadline: "+30分钟" },
      { id: 2, current: "not_followed", result: "timeout", next: "overdue", setTags: [], unreachable: false, reason: false, task: "FIRST_CONTACT", deadline: "立即处理" },
      { id: 3, current: "not_followed", result: "interested", next: "followed_prospect", setTags: [], unreachable: false, reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 4, current: "not_followed", result: "clear_reject", next: "followed_lost_reject", setTags: [], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 5, current: "not_followed", result: "bought_other", next: "followed_lost_other", setTags: [], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 6, current: "not_followed", result: "unreachable", next: "not_followed", setTags: [], unreachable: true, terminalAt: 3, terminalNext: "invalid_unreachable", terminalTags: [], reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 7, current: "not_followed", result: "invalid_number", next: "invalid_number", setTags: [], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 8, current: "overdue", result: "interested", next: "followed_prospect", setTags: [], unreachable: false, reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 9, current: "overdue", result: "clear_reject", next: "followed_lost_reject", setTags: [], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 10, current: "overdue", result: "bought_other", next: "followed_lost_other", setTags: [], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 11, current: "overdue", result: "unreachable", next: "overdue", setTags: [], unreachable: true, terminalAt: 3, terminalNext: "invalid_unreachable", terminalTags: [], reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 12, current: "overdue", result: "invalid_number", next: "invalid_number", setTags: [], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 13, current: "followed_prospect", result: "interested", next: "followed_prospect", setTags: [], unreachable: false, reason: false, task: "CALLBACK", deadline: "+1天" },
      { id: 14, current: "followed_prospect", result: "clear_reject", next: "followed_lost_reject", setTags: [], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 15, current: "followed_prospect", result: "bought_other", next: "followed_lost_other", setTags: [], unreachable: false, reason: true, task: null, deadline: "—" }
    ]
  }
};
