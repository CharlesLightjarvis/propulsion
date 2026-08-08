<?php

namespace App\Http\Requests\Admin;

use App\Enums\BillingRegion;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PublishMembershipPlanPriceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() === true;
    }

    /** @return array<string, array<mixed>|string> */
    public function rules(): array
    {
        return [
            'amount' => ['required', 'numeric', 'min:0.01'],
            'region' => ['required', Rule::enum(BillingRegion::class)],
            'interval' => ['required', Rule::in(['month', 'year'])],
        ];
    }
}
