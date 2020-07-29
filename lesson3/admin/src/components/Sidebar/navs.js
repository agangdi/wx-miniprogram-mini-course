export default {
  navs: [
    {
      index: '1',
      label: '用户管理',
      icon: 'el-icon-user',
      children: [
        {
          index: '1-1',
          router: '/users',
          label:'用户管理'
        }
      ]
    },
    {
      index: '2',
      label: '活动管理',
      icon: 'el-icon-user',
      children: [
        {
          index: '2-1',
          router: '/activities',
          label:'活动管理'
        }
      ]
    }
  ]//nav append
}