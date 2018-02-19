<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
			$table->string('iso_code');

            $table->integer('languages_id')->nullable()->unsigned();
            $table->index('languages_id');
            $table->foreign('languages_id')->references('id')->on('languages');

            $table->integer('continents_id')->unsigned();
			$table->index('continents_id');
			$table->foreign('continents_id')->references('id')->on('continents');

            $table->integer('timeszones_id')->nullable()->unsigned();
			$table->index('timeszones_id');
			$table->foreign('timeszones_id')->references('id')->on('timezones');

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
        Schema::dropIfExists('countries');
    }
}