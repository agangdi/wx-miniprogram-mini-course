<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableSign extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sign', function (Blueprint $table) {
            $table->id();
            $table->string('openid', 60);
            $table->string('nickName', 60)->default('')->comment('昵称');
            $table->datetime('signed_at')->comment('昵称');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sign');
    }
}
