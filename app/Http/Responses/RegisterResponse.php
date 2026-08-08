<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;
use Symfony\Component\HttpFoundation\Response;

class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request): Response
    {
        // A freshly registered user never has an active membership yet,
        // so there's nothing to branch on here — go straight to pricing
        // unless an intended URL (e.g. a checkout link) was stashed.
        return redirect()->intended(route('home').'#pricing');
    }
}
