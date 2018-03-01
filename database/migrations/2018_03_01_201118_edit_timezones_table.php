<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditTimezonesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('timezones', function (Blueprint $table) {
			$table->renameColumn('countries_id', 'country_id');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('timezones', function (Blueprint $table) {
			$table->renameColumn('country_id', 'countries_id');
		});
    }
}
