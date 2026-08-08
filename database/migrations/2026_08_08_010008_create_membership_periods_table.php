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
        Schema::create('membership_periods', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('user_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('membership_plan_id')->constrained()->restrictOnDelete();
            $table->foreignUuid('source_payment_id')->nullable()->unique()->constrained('payments')->restrictOnDelete();
            $table->string('plan_code');
            $table->string('plan_name');
            $table->string('status')->index();
            $table->timestamp('starts_at')->index();
            $table->timestamp('ends_at')->index();
            $table->timestamp('revoked_at')->nullable();
            $table->text('revocation_reason')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'status', 'starts_at', 'ends_at'], 'membership_period_effective_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_periods');
    }
};
