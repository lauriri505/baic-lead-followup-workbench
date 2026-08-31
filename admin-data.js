window.BAIC_ADMIN_DATA = {
  tenant: { id: "TENANT-BAIC", name: "北汽", brand: "BAIC", scope: "仅北汽品牌数据" },
  currentAccount: { id: "baic_admin_001", name: "北汽管理员", role: "tenant_admin" },
  leads: [
    { id: "BAIC-LD-260831-001", name: "María Flores", phone: "5512789042", source: "北汽品牌官网", type: "金融", series: "BJ40", model: "Plus", status: "待跟进", subStatus: "—", assignee: "北汽销售001", createdAt: "2026-08-31 09:42", task: "首次联系", taskStatus: "待处理" },
    { id: "BAIC-LD-260831-002", name: "Carlos Rivera", phone: "5583017265", source: "金融计算器", type: "金融", series: "X55", model: "Honor", status: "跟进中", subStatus: "已联系", assignee: "北汽销售002", createdAt: "2026-08-31 09:18", task: "普通回访", taskStatus: "处理中" },
    { id: "BAIC-LD-260831-003", name: "Ana Sánchez", phone: "5528901437", source: "试驾活动页", type: "试驾", series: "BJ30", model: "Exclusive", status: "跟进中", subStatus: "已联系", assignee: "北汽销售001", createdAt: "2026-08-31 08:55", task: "用户约定回访", taskStatus: "处理中" },
    { id: "BAIC-LD-260830-016", name: "Jorge Medina", phone: "5541198702", source: "经销商二维码", type: "全款", series: "EU5", model: "Luxury", status: "暂存", subStatus: "确认全款", assignee: "北汽销售003", createdAt: "2026-08-30 16:24", task: "沉默回捞", taskStatus: "待处理" },
    { id: "BAIC-LD-260830-011", name: "Lucía Torres", phone: "5590276148", source: "WhatsApp活动", type: "金融", series: "X7", model: "Premium", status: "暂存", subStatus: "试驾", assignee: "北汽销售002", createdAt: "2026-08-30 14:10", task: "普通回访", taskStatus: "已完成" },
    { id: "BAIC-LD-260829-027", name: "Miguel García", phone: "5567319204", source: "车型详情页", type: "金融", series: "BJ40", model: "Honor", status: "战败", subStatus: "号码错误", assignee: "北汽销售001", createdAt: "2026-08-29 18:32", task: "—", taskStatus: "已结束" },
    { id: "BAIC-LD-260829-019", name: "Sofía Castro", phone: "5536801742", source: "北汽品牌官网", type: "金融", series: "X55", model: "Luxury", status: "成交", subStatus: "已放款", assignee: "北汽销售003", createdAt: "2026-08-29 11:05", task: "—", taskStatus: "已完成" },
    { id: "BAIC-LD-260828-008", name: "Diego Ramírez", phone: "5571449038", source: "内容文章页", type: "试驾", series: "BJ30", model: "Honor", status: "暂存", subStatus: "无意向购买", assignee: "北汽销售002", createdAt: "2026-08-28 10:21", task: "沉默回捞", taskStatus: "待处理" }
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
    { id: "RULE-RETRY", type: "普通回访", trigger: "首次联系未接通", deadline: "+2小时", assignee: "原销售", enabled: true },
    { id: "RULE-CALLBACK", type: "用户约定回访", trigger: "客户要求稍后联系", deadline: "销售手动时间", assignee: "原销售", enabled: true },
    { id: "RULE-DORMANT", type: "沉默回捞", trigger: "暂存线索到期", deadline: "+30天", assignee: "原销售", enabled: true }
  ],
  transitionConfig: {
    brand: { name: "北汽", code: "baic", version: "V1.0", status: "草稿" },
    states: [
      { code: "pending", name: "待跟进", group: "initial", parent: null, level: 1, terminal: false, dormant: false, color: "#345f9f" },
      { code: "overdue", name: "未跟进（超72h）", group: "lost", parent: null, level: 1, terminal: true, dormant: false, color: "#cf4b4b" },
      { code: "contacted", name: "已跟进", group: "processing", parent: null, level: 1, terminal: false, dormant: false, color: "#345f9f" },
      { code: "valid_lead", name: "有效线索", group: "valid", parent: "contacted", level: 2, terminal: false, dormant: false, color: "#28735a" },
      { code: "invalid_lead", name: "无效线索", group: "invalid", parent: "contacted", level: 2, terminal: false, dormant: false, color: "#8590a5" },
      { code: "interested", name: "有意向", group: "processing", parent: "valid_lead", level: 3, terminal: false, dormant: false, color: "#28735a" },
      { code: "prospect_lost", name: "战败", group: "lost", parent: "valid_lead", level: 3, terminal: false, dormant: false, color: "#cf4b4b" },
      { code: "no_intent", name: "无意向", group: "lost", parent: "invalid_lead", level: 3, terminal: true, dormant: false, color: "#cf4b4b" },
      { code: "unreach_limit", name: "3次未接通", group: "lost", parent: "invalid_lead", level: 3, terminal: true, dormant: false, color: "#cf4b4b" },
      { code: "wrong_number", name: "号码错误", group: "lost", parent: "invalid_lead", level: 3, terminal: true, dormant: false, color: "#cf4b4b" },
      { code: "trial", name: "是否试驾", group: "processing", parent: "interested", level: 4, terminal: false, dormant: false, color: "#28735a" },
      { code: "visit", name: "是否到店", group: "processing", parent: "interested", level: 4, terminal: false, dormant: false, color: "#28735a" },
      { code: "deal", name: "是否成交", group: "valid", parent: "interested", level: 4, terminal: true, dormant: false, color: "#f0b429" },
      { code: "clear_reject", name: "明确拒绝", group: "lost", parent: "prospect_lost", level: 4, terminal: true, dormant: false, color: "#cf4b4b" },
      { code: "bought_other", name: "已购买其他品牌", group: "lost", parent: "prospect_lost", level: 4, terminal: true, dormant: false, color: "#cf4b4b" }
    ],
    results: [
      { code: "lead_assigned", name: "线索分配（首次联系）", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "unreachable", name: "未接通", category: "unreachable", requiresCallbackTime: false, requiresReason: false },
      { code: "interested", name: "已沟通-有意向", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "no_intent", name: "已沟通-无意向", category: "dormant", requiresCallbackTime: false, requiresReason: true },
      { code: "callback", name: "要求稍后联系", category: "callback", requiresCallbackTime: true, requiresReason: false },
      { code: "invalid_number", name: "号码错误", category: "lost", requiresCallbackTime: false, requiresReason: true },
      { code: "testdrive", name: "暂定试驾", category: "dormant", requiresCallbackTime: false, requiresReason: false },
      { code: "book_visit", name: "预约到店", category: "contact", requiresCallbackTime: true, requiresReason: false },
      { code: "confirm_deal", name: "确认成交", category: "contact", requiresCallbackTime: false, requiresReason: false },
      { code: "abandon", name: "放弃购买", category: "lost", requiresCallbackTime: false, requiresReason: true },
      { code: "clear_reject", name: "明确拒绝", category: "lost", requiresCallbackTime: false, requiresReason: true },
      { code: "bought_other", name: "已购买其他品牌", category: "lost", requiresCallbackTime: false, requiresReason: true }
    ],
    flows: [
      { id: 21, current: "pending", result: "lead_assigned", next: "pending", unreachable: false, reason: false, task: "FIRST_CONTACT", deadline: "+30分钟" },
      { id: 1, current: "pending", result: "unreachable", next: "contacted", unreachable: true, reason: false, task: "CALLBACK", deadline: "+2小时", retry: true },
      { id: 2, current: "pending", result: "interested", next: "valid_lead", unreachable: false, reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 3, current: "pending", result: "no_intent", next: "invalid_lead", unreachable: false, reason: true, task: "CALLBACK", deadline: "+30天", reactivation: true },
      { id: 4, current: "pending", result: "callback", next: "contacted", unreachable: false, reason: false, task: "CALLBACK", deadline: "手动填写" },
      { id: 5, current: "pending", result: "invalid_number", next: "wrong_number", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 6, current: "contacted", result: "unreachable", next: "contacted", unreachable: true, reason: false, task: "CALLBACK", deadline: "+2小时", retry: true },
      { id: 7, current: "contacted", result: "interested", next: "valid_lead", unreachable: false, reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 8, current: "contacted", result: "no_intent", next: "invalid_lead", unreachable: false, reason: true, task: "CALLBACK", deadline: "+30天", reactivation: true },
      { id: 9, current: "contacted", result: "invalid_number", next: "wrong_number", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 10, current: "valid_lead", result: "interested", next: "interested", unreachable: false, reason: false, task: "CALLBACK", deadline: "+2小时" },
      { id: 11, current: "valid_lead", result: "abandon", next: "prospect_lost", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 12, current: "interested", result: "testdrive", next: "trial", unreachable: false, reason: false, task: "CALLBACK", deadline: "+7天" },
      { id: 13, current: "interested", result: "book_visit", next: "visit", unreachable: false, reason: false, task: "CALLBACK", deadline: "手动填写" },
      { id: 14, current: "interested", result: "confirm_deal", next: "deal", unreachable: false, reason: false, task: null, deadline: "—" },
      { id: 15, current: "interested", result: "abandon", next: "prospect_lost", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 16, current: "prospect_lost", result: "clear_reject", next: "clear_reject", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 17, current: "prospect_lost", result: "bought_other", next: "bought_other", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 18, current: "invalid_lead", result: "no_intent", next: "no_intent", unreachable: false, reason: true, task: null, deadline: "—" },
      { id: 19, current: "invalid_lead", result: "unreachable", next: "unreach_limit", unreachable: true, reason: false, task: null, deadline: "—" },
      { id: 20, current: "invalid_lead", result: "invalid_number", next: "wrong_number", unreachable: false, reason: true, task: null, deadline: "—" }
    ]
  }
};
