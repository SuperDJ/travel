<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditUsersTableMinimize extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
		Schema::table('users', function (Blueprint $table) {
			$table->dropForeign('users_languages_id_foreign');
			$table->dropForeign('users_country_id_foreign');
			$table->dropForeign('users_currencies_id_foreign');

			$table->dropIndex('users_languages_id_index');
			$table->dropIndex('users_country_id_index');
			$table->dropIndex('users_currencies_id_index');

			$table->dropColumn('language_id');
			$table->dropColumn('country_id');
			$table->dropColumn('currency_id');
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
