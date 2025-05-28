import SelfInformation from '@/views/selfInformation/index.vue'
import PersonalInformation from '@/views/selfInformation/personalInformation/index.vue'
import ChangeKey from '@/views/selfInformation/changeKey/index.vue'
import ChangeAvatar from '@/views/selfInformation/changeAvatar/index.vue'
import InfDetail from '@/views/selfInformation/infDetail/index.vue'

export default {
path: '/selfInformation',
name: '个人信息中心',
component: SelfInformation,
children: [
    {
    path: 'personalInformation',
    meta: { id: '1', name: '个人信息查询', path: '/selfInformation/personalInformation' },
    component: PersonalInformation
    },
    {
    path: 'changeKey',
    meta: { id: '2', name: '修改密码', path: '/selfInformation/changeKey' },
    component: ChangeKey
    },
    {
    path: 'changeAvatar',
    meta: { id: '3', name: '修改头像', path: '/selfInformation/changeAvatar' },
    component: ChangeAvatar
    },
    {
    path: 'infDetail',
    meta: { id: '4', name: '信息补全', path: '/selfInformation/infDetail' },
    component: InfDetail
    },
]
}