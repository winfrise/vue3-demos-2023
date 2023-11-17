import { Layout } from '@/utils/routerHelper'

const files = import.meta.glob('../pages/**/*.vue')
const routesMap = {}

Object.keys(files).forEach(key => {
    const matches = key.match(/^..\/pages\/([\w-]+)\/([\w-]+).vue$/)
    if (!matches) return
    if (!routesMap[matches[1]]) {
      routesMap[matches[1]] = {
        path: `/${matches[1]}`,
        component: Layout,
        children: [],
        meta: {
          title: matches[1],
          icon: '',
        }
      }
    }

    const component = files[key];
    routesMap[matches[1]].children.push({
      path: matches[2],
      component: component.default || component,
      meta: {
        title: matches[2],
        icon: '',
      }
    })
})

export const autoRouterMap : AppRouteRecordRaw[] = Object.values(routesMap)