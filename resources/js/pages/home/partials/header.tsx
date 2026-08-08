import { Link, router, usePage } from '@inertiajs/react';
import React from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { login, logout, register } from '@/routes';
import adminRoutes from '@/routes/admin';
import member from '@/routes/member';
import type { Auth, User } from '@/types';
import Logo from './logo';
import { MenuToggleIcon } from './menu-toggle-icon';
import ThemeToggle from './ThemeToggle';
import { useScroll } from './use-scroll';

// null when the user has neither an admin dashboard nor an active
// membership — in that case the header falls back to the avatar menu.
function dashboardHrefFor(auth: Auth): string | null {
    if (auth.permissions.includes('view.admin-dashboard')) {
        return adminRoutes.dashboard();
    }

    if (auth.hasActiveMembership) {
        return member.dashboard();
    }

    return null;
}

function initials(name: string): string {
    return name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/* ------------------------------------------------------------------ */
/* Petit dropdown avatar (desktop)                                     */
/* ------------------------------------------------------------------ */

function UserMenu({ user }: { user: User }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground ring-offset-background transition-colors hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none">
                    {initials(user.name)}
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                    <p className="truncate text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => router.post(logout.url())}
                    className="cursor-pointer text-destructive focus:text-destructive"
                >
                    Se déconnecter
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/* ------------------------------------------------------------------ */
/* Header                                                             */
/* ------------------------------------------------------------------ */

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);
    const { auth, canRegister } = usePage<{
        auth: Auth;
        canRegister?: boolean;
    }>().props;
    const dashboardHref = dashboardHrefFor(auth);

    React.useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b border-transparent',
                {
                    'border-border bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50':
                        scrolled,
                },
            )}
        >
            <nav className="relative flex h-14 w-full items-center px-4 lg:px-6">
                {/* logo — gauche écran */}
                <div className="flex items-center justify-start">
                    <div className="rounded-md p-2 hover:bg-transparent">
                        <Link href="/">
                            <Logo className="h-8 w-auto" />
                        </Link>
                    </div>
                </div>

                {/* CTA — droite écran */}
                <div className="ml-auto hidden items-center justify-end gap-2 lg:flex">
                    {auth.user ? (
                        dashboardHref ? (
                            <Button
                                variant="secondary"
                                className="shrink-0 rounded-full"
                                asChild
                            >
                                <Link href={dashboardHref}>Dashboard</Link>
                            </Button>
                        ) : (
                            <UserMenu user={auth.user} />
                        )
                    ) : (
                        <>
                            <Button
                                variant="secondary"
                                className="shrink-0 rounded-full"
                                asChild
                            >
                                <Link href={login()}>Connexion</Link>
                            </Button>
                            {canRegister !== false && (
                                <Button
                                    className="shrink-0 rounded-full"
                                    asChild
                                >
                                    <Link href={register()}>S'inscrire</Link>
                                </Button>
                            )}
                        </>
                    )}
                    <ThemeToggle />
                </div>

                {/* burger mobile */}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setOpen(!open)}
                    className="ml-auto lg:hidden"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                    aria-label="Toggle menu"
                >
                    <MenuToggleIcon
                        open={open}
                        className="size-5"
                        duration={300}
                    />
                </Button>
            </nav>

            <MobileMenu open={open} auth={auth} canRegister={canRegister} />
        </header>
    );
}

/* ------------------------------------------------------------------ */
/* Menu mobile                                                        */
/* ------------------------------------------------------------------ */

function MobileMenu({
    open,
    auth,
    canRegister,
}: {
    open: boolean;
    auth: Auth;
    canRegister?: boolean;
}) {
    if (!open || typeof window === 'undefined') {
return null;
}

    const dashboardHref = dashboardHrefFor(auth);

    return createPortal(
        <div
            id="mobile-menu"
            className="fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-y border-border/30 bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50 lg:hidden"
        >
            <div
                data-slot={open ? 'open' : 'closed'}
                className="flex size-full flex-col justify-end overflow-y-auto p-4 ease-out data-[slot=open]:animate-in data-[slot=open]:zoom-in-97"
            >
                <div className="flex flex-col gap-3 border-t border-border/30 pt-4">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-xs font-medium text-foreground/40">
                            Apparence
                        </span>
                        <ThemeToggle />
                    </div>

                    {auth.user ? (
                        dashboardHref ? (
                            <Button
                                variant="secondary"
                                className="w-full"
                                asChild
                            >
                                <Link href={dashboardHref}>Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <div className="flex items-center gap-3 rounded-md border border-border/40 px-3 py-2">
                                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                                        {initials(auth.user.name)}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">
                                            {auth.user.name}
                                        </p>
                                        <p className="truncate text-xs text-muted-foreground">
                                            {auth.user.email}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full text-destructive hover:text-destructive"
                                    onClick={() => router.post(logout.url())}
                                >
                                    Se déconnecter
                                </Button>
                            </>
                        )
                    ) : (
                        <>
                            <Button
                                variant="secondary"
                                className="w-full"
                                asChild
                            >
                                <Link href={login()}>Connexion</Link>
                            </Button>
                            {canRegister !== false && (
                                <Button className="w-full" asChild>
                                    <Link href={register()}>S'inscrire</Link>
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    );
}
