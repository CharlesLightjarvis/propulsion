<?php

namespace App\Actions\Billing;

use App\Models\MembershipPlan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CreatePlan
{
    /** @param list<string> $benefits */
    public function handle(string $code, string $name, ?string $description, array $benefits): MembershipPlan
    {
        return DB::transaction(fn (): MembershipPlan => MembershipPlan::query()->create([
            'code' => Str::lower($code),
            'name' => $name,
            'description' => $description,
            'benefits' => $benefits,
        ]));
    }
}
