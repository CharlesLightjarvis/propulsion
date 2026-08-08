<?php

declare(strict_types=1);

namespace App\Enums;

enum RoleEnum: string
{
    case SuperAdmin = 'super_admin';
    case Admin = 'admin';
    case Member = 'member';

    public function label(): string
    {
        return match ($this) {
            self::SuperAdmin => 'Super administrateur',
            self::Admin => 'Administrateur',
            self::Member => 'Membre',
        };
    }

    /**
     * @return array<int, PermissionEnum>
     */
    public function permissions(): array
    {
        return match ($this) {
            self::SuperAdmin => PermissionEnum::cases(),

            self::Admin => [
                PermissionEnum::ViewAdminDashboard,
                PermissionEnum::ManageMembers,
                PermissionEnum::ManageBillingOrders,
                PermissionEnum::ManageContent,
                PermissionEnum::ManageMembershipPlans,
            ],

            self::Member => [
                PermissionEnum::ViewDirectory,
                PermissionEnum::ManageOwnProfile,
                PermissionEnum::ManageOwnBillingOrders,
                PermissionEnum::ViewMemberContent,
            ],
        };
    }
}
