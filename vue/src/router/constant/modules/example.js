/*路由表：演示用例*/
import Layout from '@/layout'

const router = {
    path: '/example',
    component: Layout,
    meta: {title: '演示用例', icon: 'show', noCache: true},
    children: [
        {
            path: 'style-page',
            name: 'stylePage',
            component: () => import('@/views/example/stylePage'),
            meta: {title: '样 式'}
        },
        {
            path: 'icons',
            name: 'icons',
            component: () => import('@/views/example/icons'),
            meta: {title: '图 标'}
        },
        {
            path: 'taobao',
            name: 'taobao',
            meta: {title: '淘宝iframe', iframe: 'https://www.taobao.com'}
        },
        {
            path: 'cool',
            component: {render: h => h('router-view')},
            meta: {title: '好玩的东东'},
            children: [
                {
                    path: 'fluid',
                    name: 'fluid',
                    component: () => import('@/views/example/cool/fluid'),
                    meta: {title: '流体动画'}
                },
                {
                    path: 'l2d',
                    name: 'l2d',
                    component: () => import('@/views/example/cool/l2d'),
                    meta: {title: '看板娘'}
                },
            ]
        },
        {
            path: 'components',
            component: {render: h => h('router-view')},
            meta: {title: '组件'},
            children: [
                {
                    path: 'uploadExample',
                    name: 'uploadExample',
                    component: () => import('@/views/example/components/uploadExample'),
                    meta: {title: '上传文件'}
                },
                {
                    path: 'picturePreviewExample',
                    name: 'picturePreviewExample',
                    component: () => import('@/views/example/components/picturePreviewExample'),
                    meta: {title: '图片预览'}
                },
                {
                    path: 'skeletonExample',
                    name: 'skeletonExample',
                    component: () => import('@/views/example/components/skeletonExample'),
                    meta: {title: '骨架屏'}
                },
                {
                    path: 'rippleExample',
                    name: 'rippleExample',
                    component: () => import('@/views/example/components/rippleExample'),
                    meta: {title: '波纹'}
                },
                {
                    path: 'signatureExample',
                    name: 'signatureExample',
                    component: () => import('@/views/example/components/signatureExample'),
                    meta: {title: '手写签名'}
                }
            ]
        },
        {
            path: 'developing-test',
            name: 'developingTest',
            component: () => import('@/views/example/developingTest'),
            meta: {title: '开发测试'}
        }
    ]
}

export default router
