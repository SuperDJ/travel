<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditAirportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('airports', function (Blueprint $table) {
			$table->renameColumn('cities_id', 'city_id');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('airports', function (Blueprint $table) {
			$table->renameColumn('city_id', 'cities_id');
		});
    }
}
