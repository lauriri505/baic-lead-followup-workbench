window.BAIC_ADMIN_DATA = {
  tenant: { id: "TENANT-BAIC", name: "北汽", brand: "BAIC", scope: "仅北汽品牌数据" },
  currentAccount: { id: "baic_admin_001", name: "北汽管理员", role: "tenant_admin" },
  leads: [
    { id: "BAIC-LD-260831-001", name: "María Flores", phone: "5512789042", source: "北汽品牌官网", type: "金融", series: "BJ40", model: "Plus", status: "待跟进", subStatus: "—", assignee: "北汽销售001", createdAt: "2026-08-31 09:42", task: "首次联系", taskStatus: "待处理" },
    { id: "BAIC-LD-260831-002", name: "Carlos Rivera", phone: "5583017265", source: "金融计算器", type: "金融", series: "X55", model: "Honor", status: "跟进中", subStatus: "已联系", assignee: "北汽销售002", createdAt: "2026-08-31 09:18", task: "普通回访", taskStatus: "处理中" },
    { id: "BAIC-LD-260831-003", name: "Ana Sánchez", phone: "5528901437", source: "试驾活动页", type: "试驾", series: "BJ30", model: "Exclusive", status: "跟进中", subStatus: "有意向", assignee: "北汽销售001", createdAt: "2026-08-31 08:55", task: "普通回访", taskStatus: "处理中" },
    { id: "BAIC-LD-260830-016", name: "Jorge Medina", phone: "5541198702", source: "经销商二维码", type: "全款", series: "EU5", model: "Luxury", status: "跟进中", subStatus: "潜客", assignee: "北汽销售003", createdAt: "2026-08-30 16:24", task: "普通回访", taskStatus: "待处理" },
    { id: "BAIC-LD-260830-011", name: "Lucía Torres", phone: "5590276148", source: "WhatsApp活动", type: "金融", series: "X7", model: "Premium", status: "待跟进", subStatus: "未跟进", assignee: "北汽销售002", createdAt: "2026-08-30 14:10", task: "首次联系", taskStatus: "已逾期" },
    { id: "BAIC-LD-260829-027", name: "Miguel García", phone: "5567319204", source: "车型详情页", type: "金融", series: "BJ40", model: "Honor", status: "战败", subStatus: "号码错误", assignee: "北汽销售001", createdAt: "2026-08-29 18:32", task: "—", taskStatus: "已结束" },
    { id: "BAIC-LD-260829-019", name: "Sofía Castro", phone: "5536801742", source: "北汽品牌官网", type: "金融", series: "X55", model: "Luxury", status: "成交", subStatus: "已放款", assignee: "北汽销售003", createdAt: "2026-08-29 11:05", task: "—", taskStatus: "已完成" },
    { id: "BAIC-LD-260828-008", name: "Diego Ramírez", phone: "5571449038", source: "内容文章页", type: "试驾", series: "BJ30", model: "Honor", status: "流失", subStatus: "无意向", assignee: "北汽销售002", createdAt: "2026-08-28 10:21", task: "—", taskStatus: "已结束" }
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
      { code: "issued", name: "下发", group: "initial", businessStage: "待跟进", parent: null, level: 1, terminal: false, dormant: false, color: "#4d8df7" },
      { code: "pending", name: "待跟进", group: "initial", businessStage: "待跟进", parent: "issued", level: 2, terminal: false, dormant: false, color: "#4d8df7" },
      { code: "not_followed", name: "未跟进", group: "initial", businessStage: "待跟进", parent: "issued", level: 2, terminal: false, dormant: false, color: "#4d8df7" },
      { code: "contacted", name: "已跟进", group: "processing", businessStage: "跟进中", parent: "pending", level: 3, terminal: false, dormant: false, color: "#2fcf9f" },
      { code: "interested", name: "有意向", group: "valid", businessStage: "跟进中", parent: "contacted", level: 4, terminal: false, dormant: false, color: "#2fcf9f" },
      { code: "prospect_lost", name: "战败", group: "lost", businessStage: "流失", parent: "contacted", level: 4, terminal: false, dormant: false, color: "#ff6b6b" },
      { code: "no_intent", name: "无意向", group: "lost", businessStage: "流失", parent: "contacted", level: 4, terminal: true, dormant: false, color: "#ff6b6b" },
      { code: "unreach_limit", name: "3次未接通", group: "lost", businessStage: "流失", parent: "contacted", level: 4, terminal: true, dormant: false, color: "#ff6b6b" },
      { code: "wrong_number", name: "号码错误", group: "lost", businessStage: "流失", parent: "contacted", level: 4, terminal: true, dormant: false, color: "#ff6b6b" },
      { code: "prospect", name: "潜客", group: "valid", businessStage: "跟进中", parent: "interested", level: 5, terminal: false, dormant: false, color: "#2fcf9f" },
      { code: "clear_reject", name: "明确拒绝", group: "lost", businessStage: "流失", parent: "prospect_lost", level: 5, terminal: true, dormant: false, color: "#ff6b6b" },
      { code: "bought_other", name: "已购买其他品牌", group: "lost", businessStage: "流失", parent: "prospect_lost", level: 5, terminal: true, dormant: false, color: "#ff6b6b" },
      { code: "won", name: "成交", group: "won", businessStage: "成交", parent: "prospect", level: 6, terminal: true, dormant: false, color: "#19a974" }
    ],
    leadTags: [
      { code: "valid_lead", name: "有效线索", type: "lead_quality", color: "#2fcf9f" },
      { code: "invalid_lead", name: "无效线索", type: "lead_quality", color: "#ff9f43" }
    ],
    results: [
      { code: "assigned", name: "下发分配", actor: "system", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "timeout", name: "超时未跟进", actor: "system", category: "unreachable", requiresCallbackTime: false, requiresReason: false },
      { code: "first_contact", name: "完成首次联系", actor: "system", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "interested", name: "有意向", actor: "sales", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "lost", name: "进入战败分类", actor: "system", category: "lost", requiresCallbackTime: false, requiresReason: true },
      { code: "convert_prospect", name: "转潜客", actor: "sales", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "no_intent", name: "无意向", actor: "sales", category: "lost", requiresCallbackTime: false, requiresReason: true },
      { code: "unreachable", name: "未接通", actor: "sales", category: "unreachable", requiresCallbackTime: false, requiresReason: false },
      { code: "invalid_number", name: "号码错误", actor: "sales", category: "lost", requiresCallbackTime: false, requiresReason: true },
      { code: "clear_reject", name: "明确拒绝", actor: "sales", category: "lost", requiresCallbackTime: false, requiresReason: true },
      { code: "bought_other", name: "已购买其他品牌", actor: "sales", category: "lost", requiresCallbackTime: false, requiresReason: true },
      { code: "trial_yes", name: "已试驾", actor: "sales", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "trial_no", name: "未试驾", actor: "sales", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "visit_yes", name: "已到店", actor: "sales", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "visit_no", name: "未到店", actor: "sales", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "deal_no", name: "暂未成交", actor: "sales", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "deal_yes", name: "已成交", actor: "sales", category: "contact", requiresCallbackTime: false, requiresReason: false }
    ],
    flows: [
      { id: 1, current: "issued", result: "assigned", next: "pending", unreachable: false, reason: false, task: "FIRST_CONTACT", deadline: "+30分钟" },
      { id: 2, current: "pending", result: "timeout", next: "not_followed", unreachable: false, reason: false, task: "FIRST_CONTACT", deadline: "立即处理" },
      { id: 3, current: "pending", result: "first_contact", next: "contacted", unreachable: false, reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 4, current: "not_followed", result: "first_contact", next: "contacted", unreachable: false, reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 5, current: "contacted", result: "interested", next: "interested", setTags: ["valid_lead"], unreachable: false, reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 6, current: "contacted", result: "lost", next: "prospect_lost", setTags: ["valid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 7, current: "contacted", result: "no_intent", next: "no_intent", setTags: ["invalid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 8, current: "contacted", result: "unreachable", next: "contacted", unreachable: true, terminalAt: 3, terminalNext: "unreach_limit", terminalTags: ["invalid_lead"], reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 9, current: "contacted", result: "invalid_number", next: "wrong_number", setTags: ["invalid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 10, current: "interested", result: "convert_prospect", next: "prospect", setTags: ["valid_lead"], unreachable: false, reason: false, task: "CALLBACK", deadline: "+1天" },
      { id: 11, current: "prospect_lost", result: "clear_reject", next: "clear_reject", setTags: ["valid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 12, current: "prospect_lost", result: "bought_other", next: "bought_other", setTags: ["valid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 13, current: "prospect", result: "trial_yes", next: "prospect", setTags: ["valid_lead"], fieldUpdates: { trialStatus: "YES" }, unreachable: false, reason: false, task: "CALLBACK", deadline: "+1天" },
      { id: 14, current: "prospect", result: "trial_no", next: "prospect", setTags: ["valid_lead"], fieldUpdates: { trialStatus: "NO" }, unreachable: false, reason: false, task: "CALLBACK", deadline: "+1天" },
      { id: 15, current: "prospect", result: "visit_yes", next: "prospect", setTags: ["valid_lead"], fieldUpdates: { visitStatus: "YES" }, unreachable: false, reason: false, task: "CALLBACK", deadline: "+1天" },
      { id: 16, current: "prospect", result: "visit_no", next: "prospect", setTags: ["valid_lead"], fieldUpdates: { visitStatus: "NO" }, unreachable: false, reason: false, task: "CALLBACK", deadline: "+1天" },
      { id: 17, current: "prospect", result: "deal_no", next: "prospect", setTags: ["valid_lead"], fieldUpdates: { dealStatus: "NO" }, unreachable: false, reason: false, task: "CALLBACK", deadline: "+1天" },
      { id: 18, current: "prospect", result: "deal_yes", next: "won", setTags: ["valid_lead"], fieldUpdates: { dealStatus: "YES" }, unreachable: false, reason: false, task: null, deadline: "—" },
      { id: 19, current: "pending", result: "interested", next: "interested", setTags: ["valid_lead"], unreachable: false, reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 20, current: "pending", result: "clear_reject", next: "clear_reject", setTags: ["valid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 21, current: "pending", result: "bought_other", next: "bought_other", setTags: ["valid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 22, current: "pending", result: "no_intent", next: "no_intent", setTags: ["invalid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 23, current: "pending", result: "unreachable", next: "contacted", unreachable: true, terminalAt: 3, terminalNext: "unreach_limit", terminalTags: ["invalid_lead"], reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 24, current: "pending", result: "invalid_number", next: "wrong_number", setTags: ["invalid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 25, current: "not_followed", result: "interested", next: "interested", setTags: ["valid_lead"], unreachable: false, reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 26, current: "not_followed", result: "clear_reject", next: "clear_reject", setTags: ["valid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 27, current: "not_followed", result: "bought_other", next: "bought_other", setTags: ["valid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 28, current: "not_followed", result: "no_intent", next: "no_intent", setTags: ["invalid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 29, current: "not_followed", result: "unreachable", next: "contacted", unreachable: true, terminalAt: 3, terminalNext: "unreach_limit", terminalTags: ["invalid_lead"], reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 30, current: "not_followed", result: "invalid_number", next: "wrong_number", setTags: ["invalid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 31, current: "contacted", result: "clear_reject", next: "clear_reject", setTags: ["valid_lead"], unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 32, current: "contacted", result: "bought_other", next: "bought_other", setTags: ["valid_lead"], unreachable: false, reason: true, task: null, deadline: "—" }
    ]
  }
};
