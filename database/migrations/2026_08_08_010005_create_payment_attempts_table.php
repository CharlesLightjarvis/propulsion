<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payment_attempts', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('billing_order_id')->constrained()->cascadeOnDelete();
            $table->string('gateway');
            $table->uuid('idempotency_key')->unique();
            $table->string('external_id')->nullable();
            $table->text('checkout_url')->nullable();
            $table->string('status')->default('pending')->index();
            $table->text('failure_message')->nullable();
            $table->json('gateway_payload')->nullable();
            $table->timestamps();

            $table->unique(['gateway', 'external_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_attempts');
    }
};
