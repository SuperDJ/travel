<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditCitiesTableRename extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('cities', function (Blueprint $table) {
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
		Schema::table('cities', function (Blueprint $table) {
			$table->renameColumn('country_id', 'countries_id');
		});
    }
}
