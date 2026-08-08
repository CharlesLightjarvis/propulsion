<?php

namespace App\Http\Requests\Billing;

use App\Enums\Gateway;
use App\Enums\PriceStatus;
use App\Models\MembershipPlanPrice;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StartCheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /** @return array<string, array<mixed>|string> */
    public function rules(): array
    {
        return [
            'price_id' => ['required', 'uuid', Rule::exists(MembershipPlanPrice::class, 'id')->where('status', PriceStatus::Active->value)],
            'gateway' => ['required', Rule::enum(Gateway::class)],
        ];
    }
}
