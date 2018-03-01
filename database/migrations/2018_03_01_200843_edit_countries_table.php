<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('countries', function (Blueprint $table) {
			$table->renameColumn('languages_id', 'language_id');
			$table->renameColumn('currencies_id', 'currency_id');
			$table->renameColumn('continents_id', 'continent_id');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('countries', function (Blueprint $table) {
			$table->renameColumn('language_id', 'languages_id');
			$table->renameColumn('currency_id', 'currencies_id');
			$table->renameColumn('continent_id', 'continents_id');
		});
    }
}
