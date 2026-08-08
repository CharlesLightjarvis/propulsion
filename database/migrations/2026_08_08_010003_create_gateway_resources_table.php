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
        Schema::create('gateway_resources', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('gateway');
            $table->uuidMorphs('resourceable');
            $table->string('external_id');
            $table->string('sync_status')->default('pending')->index();
            $table->timestamp('synced_at')->nullable();
            $table->text('last_error')->nullable();
            $table->timestamps();

            $table->unique(['gateway', 'resourceable_type', 'resourceable_id'], 'gateway_resource_owner_unique');
            $table->unique(['gateway', 'external_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gateway_resources');
    }
};
