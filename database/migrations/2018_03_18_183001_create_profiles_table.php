<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('image')->nullable();
            $table->date('birthday')->nullable();

            $table->integer('user_id')->unsigned()->nullable();
            $table->index('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->integer('language_id')->unsigned()->nullable();
			$table->index('language_id');
            $table->foreign('language_id')->references('id')->on('languages');

            $table->integer('country_id')->unsigned()->nullable();
			$table->index('country_id');
            $table->foreign('country_id')->references('id')->on('countries');

            $table->integer('currency_id')->unsigned()->nullable();
			$table->index('currency_id');
            $table->foreign('currency_id')->references('id')->on('currencies');

            $table->integer('timezone_id')->unsigned()->nullable();
			$table->index('timezone_id');
            $table->foreign('timezone_id')->references('id')->on('timezones');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profile');
    }
}
