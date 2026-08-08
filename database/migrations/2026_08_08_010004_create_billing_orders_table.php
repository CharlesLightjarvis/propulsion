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
        Schema::create('billing_orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('membership_plan_id')->constrained()->restrictOnDelete();
            $table->foreignUuid('membership_plan_price_id')->constrained()->restrictOnDelete();
            $table->string('purpose');
            $table->string('status')->default('pending')->index();
            $table->string('gateway');
            $table->string('open_key')->nullable()->unique();
            $table->string('plan_code');
            $table->string('plan_name');
            $table->unsignedInteger('amount_minor');
            $table->string('currency', 3);
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billing_orders');
    }
};
