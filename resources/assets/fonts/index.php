<?php
$scan = scandir('./Noto');

foreach( $scan as $key => $font ) {
	if( !in_array( $font, array( '.', '..', 'LICENSE_OFL.txt' ) ) ) {
		echo '@font-face {<br>font-family: "Noto";<br>src: url(\'#{$noto-font-path}'.$font.'\');<br>';

		if( strpos( $font, 'Thin' ) ) {
			echo 'font-weight: 100;<br>';
		} else if( strpos( $font, 'Light' ) ) {
			echo 'font-weight: 300;<br>';
		} else if( strpos( $font, 'Medium' ) ) {
			echo 'font-weight: 500;<br>';
		} else if( strpos( $font, 'Bold' ) ) {
			echo 'font-weight: 700;<br>';
		} else if( strpos( $font, 'Black' ) ) {
			echo 'font-weight: 900;<br>';
		} else {
			echo 'font-weight: 400;<br>';
		}

		if( strpos( $font, 'Italic' ) ) {
			echo 'font-style: italic;<br>';
		} else {
			echo 'font-style: normal;<br>';
		}
		echo'}<br><br>';
	}
}