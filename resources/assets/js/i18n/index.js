import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './languages/en';

Vue.use( VueI18n );

export const i18n = new VueI18n({
	locale: 'en',
	fallback: 'en',
	messages
});

const loadedLanguages = [ 'en' ]; // our default language that is pre-loaded

function setI18nLanguage( language ) {
	i18n.locale = language;
	document.querySelector( 'html' ).setAttribute( 'language', language );
	return language;
}

export function loadLanguageAsync( language ) {
	if( i18n.locale !== language ) {
		if( !loadedLanguages.includes( language ) ) {
			return import( `./languages/${language}` ).then( message => {
				i18n.setLocaleMessage( language, message.default );
				loadedLanguages.push( language );

				return setI18nLanguage( language );
			})
		}

		return Promise.resolve( setI18nLanguage( language ) );
	}

	return Promise.resolve( language );
}