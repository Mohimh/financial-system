import Layout from '@/views/main.vue'
import Home from '@/views/home/index.vue'
import Department from '@/views/department/index.vue'
import Stuff from '@/views/stuff/index.vue'
import Salary from '@/views/salary/index.vue'


import AccountSub from '@/views/accounting/accountSub/index.vue'
import Account from '@/views/accounting/account/index.vue'
import FundTransaction from '@/views/accounting/fundTransaction/index.vue'
import VoucherEntry from '@/views/accounting/voucherEntry/index.vue'
import GeneralLedger from '@/views/accounting/generalLedger/index.vue'

import PlanEdit from '@/views/budget/planEdit/index.vue'
import ExecMonitor from '@/views/budget/execMonitor/index.vue'
import AnalysisCompare from '@/views/budget/analysisCompare/index.vue'

import CreateBill from '@/views/reimburse/createBill/index.vue'
import ApprovalFlow from '@/views/reimburse/approvalFlow/index.vue'
import ReimbursementManage from '@/views/reimburse/reimbursementManage/index.vue'
import StatReport from '@/views/reimburse/statReport/index.vue'

import KpiDashboard from '@/views/financeAnalytics/kpiDashboard/index.vue'
import Statements from '@/views/financeAnalytics/statements/index.vue'
import TrendCharts from '@/views/financeAnalytics/trendCharts/index.vue'

import AssetAdd from '@/views/assetManage/assetAdd/index.vue'
import AssetManage from '@/views/assetManage/assetManage/index.vue'
import DepreCalc from '@/views/assetManage/depreCalc/index.vue'
import InventoryCheck from '@/views/assetManage/inventoryCheck/index.vue'

import RegInvoice from '@/views/invoice/regInvoice/index.vue'
import InvoiceStats from '@/views/invoice/invoiceStats/index.vue'

import TaxCalc from '@/views/tax/taxCalc/index.vue'
import DeclareTax from '@/views/tax/declareTax/index.vue'

import UserAuth from '@/views/systemManage/userAuth/index.vue'
import SysConfig from '@/views/systemManage/sysConfig/index.vue'
import OpLogs from '@/views/systemManage/opLogs/index.vue'

export default {
    path: '/',
    component: Layout,
    name: 'main',
    children: [
        {
            path: 'home',
            meta: { id: '1', name: '首页', icon: 'HomeFilled', path: '/home' },
            component: Home
        },
        {
            path: 'department',
            meta: { id: '2', name: '部门信息', icon: 'Postcard', path: '/department' },
            component: Department
        },
        {
            path: 'stuff',
            meta: { id: '3', name: '员工管理', icon: 'User', path: '/stuff' },
            component: Stuff
        },
        {
            path: 'salary',
            meta: { id: '4', name: '工资管理', icon: 'ScaleToOriginal', path: '/salary' },
            component: Salary
        },
        {
            path: 'accounting',
            meta: { id: '5', name: '会计核算' },
            children: [
                {
                    path: 'accountSub',
                    meta: { id: '1', name: '会计科目管理', path: '/accounting/accountSub' },
                    component: AccountSub
                },
                {
                    path: 'account',
                    meta: { id: '2', name: '账户管理', path: '/accounting/account' },
                    component: Account
                },
                {
                    path: 'fundTransaction',
                    meta: { id: '3', name: '资金流水管理', path: '/accounting/fundTransaction' },
                    component: FundTransaction
                },
                {
                    path: 'voucherEntry',
                    meta: { id: '4', name: '会计凭证管理', path: '/accounting/voucherEntry' },
                    component: VoucherEntry
                },
                {
                    path: 'generalLedger',
                    meta: { id: '5', name: '总账/明细账查询', path: '/accounting/generalLedger' },
                    component: GeneralLedger
                },
            ]
        },
        {
            path: 'budget',
            meta: { id: '6', name: '预算管理' },
            children: [
                {
                    path: 'planEdit',
                    meta: { id: '1', name: '预算编制', path: '/budget/planEdit' },
                    component: PlanEdit
                },
                {
                    path: 'execMonitor',
                    meta: { id: '2', name: '预算执行监控', path: '/budget/execMonitor' },
                    component: ExecMonitor
                },
                {
                    path: 'analysisCompare',
                    meta: { id: '3', name: '预算分析', path: '/budget/analysisCompare' },
                    component: AnalysisCompare
                },
            ]
        },
        {
            path: 'reimburse',
            meta: { id: '7', name: '日常报销' },
            children: [
                {
                    path: 'createBill',
                    meta: { id: '1', name: '报销单创建', path: '/reimburse/createBill' },
                    component: CreateBill
                },
                {
                    path: 'approvalFlow',
                    meta: { id: '2', name: '报销审批流程', path: '/reimburse/approvalFlow' },
                    component: ApprovalFlow
                },
                {
                    path: 'reimbursementManage',
                    meta: { id: '3', name: '报销单管理', path: '/reimburse/reimbursementManage' },
                    component: ReimbursementManage
                },
                {
                    path: 'statReport',
                    meta: { id: '4', name: '报销统计分析', path: '/reimburse/statReport' },
                    component: StatReport
                },
            ]
        },
        {
            path: 'financeAnalysis',
            meta: { id: '8', name: '财务分析' },
            children: [
                {
                    path: 'kpiDashboard',
                    meta: { id: '1', name: '财务指标分析', path: '/financeAnalysis/kpiDashboard' },
                    component: KpiDashboard
                },
                {
                    path: 'statements',
                    meta: { id: '2', name: '财务报表', path: '/financeAnalysis/statements' },
                    component: Statements
                },
                {
                    path: 'trendCharts',
                    meta: { id: '3', name: '财务趋势图标', path: '/financeAnalysis/trendCharts' },
                    component: TrendCharts
                },
            ]
        },
        {
            path: 'assetManage',
            meta: { id: '9', name: '固定资产管理' },
            children: [
                {
                    path: 'assetAdd',
                    meta: { id: '1', name: '资产登记', path: '/assetManage/assetAdd' },
                    component: AssetAdd
                },
                {
                    path: 'assetManage',
                    meta: { id: '2', name: '资产管理', path: '/assetManage/assetManage' },
                    component: AssetManage
                },
                {
                    path: 'depreCalc',
                    meta: { id: '3', name: '资产折旧计算', path: '/assetManage/depreCalc' },
                    component: DepreCalc
                },
                {
                    path: 'inventoryCheck',
                    meta: { id: '4', name: '资产盘点', path: '/assetManage/inventoryCheck' },
                    component: InventoryCheck
                },
            ]
        },
        {
            path: 'invoice',
            meta: { id: '10', name: '发票管理' },
            children: [
                {
                    path: 'regInvoice',
                    meta: { id: '1', name: '发票登记', path: '/invoice/regInvoice' },
                    component: RegInvoice
                },
                {
                    path: 'invoiceStats',
                    meta: { id: '2', name: '发票查询统计', path: '/invoice/invoiceStats' },
                    component: InvoiceStats
                },
            ]
        },
        {
            path: 'tax',
            meta: { id: '11', name: '税务管理' },
            children: [
                {
                    path: 'taxCalc',
                    meta: { id: '1', name: '税务计算', path: '/tax/taxCalc' },
                    component: TaxCalc
                },
                {
                    path: 'declareTax',
                    meta: { id: '2', name: '税务申报准备', path: '/tax/declareTax' },
                    component: DeclareTax
                },
            ]
        },
        {
            path: 'systemManage',
            meta: { id: '12', name: '系统管理' },
            children: [
                {
                    path: 'userAuth',
                    meta: { id: '1', name: '用户权限管理', path: '/systemManage/userAuth' },
                    component: UserAuth
                },
                {
                    path: 'sysConfig',
                    meta: { id: '2', name: '系统配置', path: '/systemManage/sysConfig' },
                    component: SysConfig
                },
                {
                    path: 'opLogs',
                    meta: { id: '3', name: '操作日志查询', path: '/systemManage/opLogs' },
                    component: OpLogs
                },
            ]
        },
    ]
}
