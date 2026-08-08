<?php

namespace App\Http\Requests\Admin;

use App\Enums\BillingRegion;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMembershipPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() === true;
    }

    /** @return array<string, array<mixed>|string> */
    public function rules(): array
    {
        return [
            'code' => ['required', 'alpha_dash', 'max:50', Rule::unique('membership_plans')],
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:2000'],
            'benefits' => ['array'],
            'benefits.*' => ['nullable', 'string', 'max:255'],
            'prices' => ['required', 'array', 'min:1'],
            'prices.*.amount' => ['required', 'numeric', 'min:0.01'],
            'prices.*.region' => ['required', Rule::enum(BillingRegion::class)],
            'prices.*.interval' => ['required', Rule::in(['month', 'year'])],
        ];
    }
}
