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
			$table->string('iso', 2);

            $table->integer('languages_id')->nullable()->unsigned();
            $table->index('languages_id');
            $table->foreign('languages_id')->references('id')->on('languages');

            $table->integer('currencies_id')->nullable()->unsigned();
            $table->index('currencies_id');
            $table->foreign('currencies_id')->references('id')->on('currencies');

            $table->integer('continents_id')->unsigned();
			$table->index('continents_id');
			$table->foreign('continents_id')->references('id')->on('continents')->onDelete('cascade');

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
