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
    tenant_admin: ["查看北汽全部线索", "配置账号与角色", "配置任务规则", "配置跟进节点", "查看操作记录"],
    sales: ["查看本人负责线索", "处理销售任务", "提交跟进结果", "编辑用户当前信息", "添加跟踪记事"]
  },
  taskRules: [
    { id: "RULE-FIRST", type: "首次联系", trigger: "新线索分配", deadline: "30分钟", assignee: "线索负责人", enabled: true },
    { id: "RULE-RETRY", type: "普通回访", trigger: "首次联系未接通", deadline: "+2小时", assignee: "原销售", enabled: true },
    { id: "RULE-CALLBACK", type: "用户约定回访", trigger: "客户要求稍后联系", deadline: "销售手动时间", assignee: "原销售", enabled: true },
    { id: "RULE-DORMANT", type: "沉默回捞", trigger: "暂存线索到期", deadline: "+30天", assignee: "原销售", enabled: true }
  ],
  nodes: [
    { id: "NODE-PENDING", order: 1, main: "待跟进", sub: "—", results: ["未接通（第1次）", "已沟通-有意向", "已沟通-无意向", "要求稍后联系", "号码错误"], nextTask: "首次联系 / 普通回访", enabled: true },
    { id: "NODE-FOLLOWING", order: 2, main: "跟进中", sub: "已联系", results: ["已沟通-有意向", "未接通", "要求稍后联系", "试驾", "放弃购买"], nextTask: "普通回访 / 用户约定回访", enabled: true },
    { id: "NODE-DORMANT-DRIVE", order: 3, main: "暂存", sub: "试驾", results: ["恢复意向", "未接通", "继续暂存", "放弃购买"], nextTask: "沉默回捞", enabled: true },
    { id: "NODE-DORMANT-CASH", order: 4, main: "暂存", sub: "确认全款", results: ["恢复意向", "未接通", "继续暂存", "放弃购买"], nextTask: "沉默回捞", enabled: true },
    { id: "NODE-DORMANT-NO", order: 5, main: "暂存", sub: "无意向购买", results: ["恢复意向", "未接通", "继续暂存", "放弃购买"], nextTask: "沉默回捞", enabled: true },
    { id: "NODE-LOST", order: 6, main: "战败", sub: "终态", results: [], nextTask: "不生成任务", enabled: true },
    { id: "NODE-WON", order: 7, main: "成交", sub: "已放款", results: [], nextTask: "不生成任务", enabled: true }
  ]
};
