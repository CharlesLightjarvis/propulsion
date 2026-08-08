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
        Schema::create('provider_webhook_events', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('gateway');
            $table->string('external_event_id');
            $table->string('event_type')->index();
            $table->json('payload');
            $table->string('status')->default('pending')->index();
            $table->unsignedSmallInteger('attempt_count')->default(0);
            $table->timestamp('received_at');
            $table->timestamp('dispatched_at')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->text('last_error')->nullable();
            $table->timestamps();

            $table->unique(['gateway', 'external_event_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('provider_webhook_events');
    }
};
