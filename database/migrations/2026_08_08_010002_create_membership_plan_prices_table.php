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
        Schema::create('membership_plan_prices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('membership_plan_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('replaces_price_id')->nullable()->constrained('membership_plan_prices')->nullOnDelete();
            $table->unsignedInteger('amount_minor');
            $table->string('currency', 3);
            $table->string('region');
            $table->string('interval', 20)->default('year');
            $table->string('status')->default('draft')->index();
            $table->timestamp('published_at')->nullable();
            $table->timestamp('archived_at')->nullable();
            $table->timestamps();

            $table->index(['membership_plan_id', 'region', 'interval'], 'plan_price_market_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membership_plan_prices');
    }
};
