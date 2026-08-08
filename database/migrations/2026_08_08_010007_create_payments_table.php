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
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('billing_order_id')->unique()->constrained()->restrictOnDelete();
            $table->string('gateway');
            $table->string('external_payment_id');
            $table->string('status')->default('pending')->index();
            $table->unsignedInteger('amount_minor');
            $table->string('currency', 3);
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('refunded_at')->nullable();
            $table->json('gateway_payload')->nullable();
            $table->timestamps();

            $table->unique(['gateway', 'external_payment_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
