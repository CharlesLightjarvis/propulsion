import { Link, usePage } from '@inertiajs/react';
import { BookOpen, CreditCard, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import adminRoutes from '@/routes/admin';
import membershipPlans from '@/routes/admin/membership-plans';
import member from '@/routes/member';
import type { Auth, NavItem } from '@/types';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;

    const isAdmin = auth.permissions.includes('view.admin-dashboard');

    // Declarative: add a nav item here with an optional `permission` —
    // no extra branching needed anywhere else to show/hide it.
    const navItemsConfig: (NavItem & { permission?: string })[] = [
        {
            title: 'Dashboard',
            href: isAdmin ? adminRoutes.dashboard() : member.dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Formules et prix',
            href: membershipPlans.index(),
            icon: CreditCard,
            permission: 'manage.membership-plans',
        },
    ];

    const mainNavItems = navItemsConfig.filter(
        (item) =>
            !item.permission || auth.permissions.includes(item.permission),
    );

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={mainNavItems[0].href} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
