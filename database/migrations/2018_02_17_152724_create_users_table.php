<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('first_name');
            $table->string('last_name');
			$table->string('email')->unique();
			$table->string('password');

            $table->integer('languages_id')->nullable()->unsigned();
            $table->index('languages_id');
            $table->foreign('languages_id')->references('id')->on('languages');

            $table->integer('currencies_id')->nullable()->unsigned();
            $table->index('currencies_id');
            $table->foreign('currencies_id')->references('id')->on('currencies');

            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
