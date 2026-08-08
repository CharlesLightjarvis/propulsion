<?php

declare(strict_types=1);

namespace App\Enums;

enum PermissionEnum: string
{
    // Administration
    case ViewAdminDashboard = 'view.admin-dashboard';
    case ManageMembers = 'manage.members';
    case ManageMembershipPlans = 'manage.membership-plans';
    case ManageBillingOrders = 'manage.billing-orders';
    case ManageContent = 'manage.content';

    // Membre
    case ViewDirectory = 'view.directory';
    case ManageOwnProfile = 'manage.own-profile';
    case ManageOwnBillingOrders = 'manage.own-billing-orders';
    case ViewMemberContent = 'view.member-content';
}
