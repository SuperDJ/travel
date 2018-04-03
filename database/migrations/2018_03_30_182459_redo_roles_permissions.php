<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RedoRolesPermissions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

		Schema::table('users', function (Blueprint $table) {
			$table->dropForeign('users_group_id_foreign');
			$table->dropColumn('group_id');
		});

    	// Drop redundant tables
		Schema::dropIfExists('groups');
		Schema::dropIfExists('model_has_permissions');
		Schema::dropIfExists('model_has_roles');
		Schema::dropIfExists('role_has_permissions');

		// Edit existing tables
		Schema::table('permissions', function (Blueprint $table) {
			$table->dropColumn('guard_name');
			$table->text('description')->nullable()->after('name');
		});

		Schema::table('roles', function (Blueprint $table) {
			$table->dropColumn('guard_name');
			$table->text('description')->nullable()->after('name');
		});

		// Create new pivot tables
		Schema::create('role_user', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('role_id')->unsigned();
			$table->integer('user_id')->unsigned();
		});

		Schema::table('role_user', function (Blueprint $table) {
			$table->foreign('role_id')->references('id')->on('roles');
			$table->foreign('user_id')->references('id')->on('users');
		});

		Schema::create('permission_role', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('permission_id')->unsigned();
			$table->integer('role_id')->unsigned();
		});

		Schema::table('role_user', function (Blueprint $table) {
			$table->foreign('role_id')->references('id')->on('roles');
			$table->foreign('permission_id')->references('id')->on('permissions');
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
