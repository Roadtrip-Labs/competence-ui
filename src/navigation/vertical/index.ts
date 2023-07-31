// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'mdi:people'
    },
    {
      title: 'Vincent',
      path: '/profile/1',
      icon: 'mdi:person'
    },
    {
      title: 'Max',
      path: '/profile/2',
      icon: 'mdi:person'
    }
  ]
}

export default navigation
