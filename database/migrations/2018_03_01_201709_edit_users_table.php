<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('users', function (Blueprint $table) {
			$table->renameColumn('languages_id', 'language_id');
			$table->renameColumn('currencies_id', 'currency_id');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::table('users', function (Blueprint $table) {
			$table->renameColumn('language_id', 'languages_id');
			$table->renameColumn('currency_id', 'currencies_id');
		});
    }
}
