<script type="text/jsx">
    import {mapState} from 'vuex'
    import Logo from './components/Logo'
    import SidebarItem from './components/SidebarItem'
    import variables from '@/assets/styles/variables.scss'

    export default {
        name: 'sidebar',
        components: {SidebarItem, Logo},
        data() {
            return {
                mouseOutside: true
            }
        },
        computed: {
            ...mapState('app', {
                device: state => state.device
            }),
            ...mapState('resource', {
                routes: state => state.sidebarMenus
            }),
            ...mapState('setting', {
                showLogo: state => state.showLogo,
                sidebarCollapse: state => state.sidebarCollapse,
                sidebarUniqueOpen: state => state.sidebarUniqueOpen,
                sidebarShowParent: state => state.sidebarShowParent,
                sidebarAutoHidden: state => state.sidebarAutoHidden
            }),
            //仅在pc端可折叠
            collapse() {
                return this.sidebarCollapse && this.device === 'pc'
            },
            hideSidebar() {
                return this.sidebarAutoHidden && this.mouseOutside
                    || this.sidebarCollapse && this.device === 'mobile'
            },
            sidebarClass() {
                return {
                    'sidebar-container': true,
                    'mobile': this.device === 'mobile',
                    'collapse-sidebar': this.collapse,
                    'hide-sidebar': this.hideSidebar
                }
            }
        },
        watch: {
            //由于elMenu的initOpenedMenu()不会触发select事件，所以手动实现菜单收起
            '$route.path'(nv, ov) {
                //如果是redirect刷新，则跳过
                if (nv === '/redirect' + ov) return

                const menu = this.$refs.menu
                if (!menu) return
                const item = menu.items[nv]
                if (!item) menu.openedMenus = []
                else this.select(item.index, item.indexPath, item, false)
            },
            hideSidebar(v) {
                if (v) document.addEventListener('mousemove', this.moveEvent)
                else document.removeEventListener('mousemove', this.moveEvent)
            }
        },
        methods: {
            moveEvent(e) {
                if (e.clientX <= 15) this.mouseOutside = false
            },
            select(index, indexPath, item, jump = true) {
                //开启手风琴模式时，激活没有子级的菜单时收起其它展开项
                if (this.sidebarUniqueOpen && indexPath.length === 1) {
                    const menu = this.$refs.menu
                    const opened = menu.openedMenus
                    opened.forEach(i => i !== index && menu.closeMenu(i))
                }

                //mobile时激活隐藏侧边栏
                this.device === 'mobile' && this.$store.commit('setting/sidebarCollapse', true)

                if (!jump) return

                if (this.$route.path === index) {
                    this.$store.commit('tagsView/delCachedView', this.$route)
                    this.$nextTick(() => this.$router.replace({path: '/redirect' + this.$route.fullPath}))
                }
                else this.$router.push(index)
            }
        },
        mounted() {
            if (this.sidebarAutoHidden) {
                document.addEventListener('mousemove', this.moveEvent)
            }
        },
        beforeDestroy() {
            document.removeEventListener('mousemove', this.moveEvent)
        },
        render() {
            const menu = (
                <el-menu
                    ref="menu"
                    active-text-color={variables['primary']}
                    background-color={variables['menuBg']}
                    text-color={variables['menuText']}
                    collapse={this.collapse}
                    collapse-transition={false}
                    default-active={this.$route.path}
                    unique-opened={this.sidebarUniqueOpen}
                    mode="vertical"
                    on-select={this.select}
                >
                    {this.routes.map(route => (
                        <sidebar-item
                            key={route.path}
                            show-parent={this.sidebarShowParent}
                            collapse={this.sidebarCollapse}
                            item={route}
                        />
                    ))}
                </el-menu>
            )

            return (
                <aside
                    class={this.sidebarClass}
                    on-mouseenter={() => this.mouseOutside = false}
                    on-mouseleave={() => this.mouseOutside = true}
                >
                    {this.showLogo && <logo collapse={this.collapse}/>}
                    {<el-scrollbar>{menu}</el-scrollbar>}
                </aside>
            )
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/sidebar";
</style>
