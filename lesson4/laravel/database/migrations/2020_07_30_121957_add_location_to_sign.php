<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLocationToSign extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sign', function (Blueprint $table) {
            //
            $table->double('lng', 16, 13)->default(0)->comment('经度');
            $table->double('lat', 16, 13)->default(0)->comment('纬度');
            $table->string('location', 256)->default('')->comment('位置信息');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sign', function (Blueprint $table) {
            //
        });
    }
}
