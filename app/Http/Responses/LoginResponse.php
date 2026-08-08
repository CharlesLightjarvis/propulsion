<?php

namespace App\Http\Responses;

use App\Models\User;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $fallback = match (true) {
            $user->isAdmin() => route('admin.dashboard'),
            $user->hasActiveMembership() => route('member.dashboard'),
            default => route('home').'#pricing',
        };

        return redirect()->intended($fallback);
    }
}
