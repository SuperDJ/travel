<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('cities', function (Blueprint $table) {
			$table->string('iso', 4)->after('longitude')->nullable();
			$table->string('iata', 3)->after('iso')->nullable();
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
			$table->dropColumn(['iso', 'iata']);
		});
    }
}
