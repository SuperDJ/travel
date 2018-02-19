/**
 * Check if something is empty
 * @return boolean        True or false depending if empty or not
 * @param value
 */
function empty( value ) {
	if( typeof value === 'number' ) {
		return value === ''
	}

	if( value ) {
		return !( value.length > 0 && value !== '' );
	} else {
		return true;
	}
}

/* Appbar */
const appbar = document.getElementsByClassName('appbar')[0];
const themeColor = document.querySelector('meta[name="theme-color"]');
const msApp = document.querySelector('meta[name="msapplication-navbutton-color"]');
const apple = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');

if( appbar ) {
	let appbarColor = getComputedStyle( appbar )['background-color'];
	let appbarTitle = appbar.querySelector('.appbar-title');

	// Add element behind title in appbar to place other elements at the end
	appbarTitle.insertAdjacentHTML('afterend', '<div class="appbar-spacer"></div>');

	// Set theme color automatically
	if( themeColor && themeColor === '' ) {
		themeColor.setAttribute('content', appbarColor);
	}

	if( msApp && msApp === '' ) {
		msApp.setAttribute('content', appbarColor);
	}

	if( apple && apple === '' ) {
		apple.setAttribute('content', appbarColor);
	}

	// Correct padding of main compared to appbar
	['resize', 'load'].forEach( function ( e ) {
		window.addEventListener( e, function () {
			let appbarHeight = getComputedStyle( appbar )['height'];
			let main = document.getElementsByTagName( 'body' )[0].querySelector( 'main' );
			main.style.top = appbarHeight;
		});
	});
}

/* Bottom sheet */
const bottomSheet = document.querySelectorAll('.bottom-sheet, .bottom-sheet-grid');
if( bottomSheet.length > 0 ) {
	for( let i = 0; i < bottomSheet.length; i++ ) {
		bottomSheet[i].insertAdjacentHTML( 'afterend', '<div class="bottom-sheet-background"></div>' );
	}
}

/* Chips */
const chipDelete = document.getElementsByClassName('chip-deletable');
if( chipDelete.length > 0 ) {
	for( let i = 0; i < chipDelete.length; i++ ) {
		let chip = chipDelete[i];
		let button = chip.querySelector('.chip-delete');
		button.addEventListener( 'click', function () {
			chip.remove();
		});
	}
}

/* Dialog */
const dialog = document.getElementsByClassName('dialog');
if( dialog.length > 0 ) {
	for( let i = 0; i < dialog.length; i++) {
		dialog[i].insertAdjacentHTML( 'afterend', '<div class="dialog-background"></div>' );
	}
}

/* Navigation Drawer */
function toggleDropdownItems(items, toggle) {
	for( let i = 0; i < items.length; i++ ) {
		items[i].style.display = toggle;
	}
}

const drawer = document.getElementById('drawer');
if( drawer ) {
	let dropdownButton = drawer.querySelectorAll('.drawer-dropdown'),
		dropdown = drawer.querySelectorAll('.dropdown');

	if( dropdown && dropdownButton && dropdown.length > 0 && dropdownButton.length > 0 ) {
		if(	dropdownButton.length !== dropdown.length ) {
			console.error("There aren't as many dropdowns as dropdown buttons");
		}

		for( let i = 0; i < dropdownButton.length; i++ ) {
			let button = dropdownButton[i];
			let icon = button.querySelector('.material-icons');
			let dropdown = button.nextElementSibling;
			let dropdownItems = dropdown.querySelectorAll('a');
			let height = getComputedStyle(dropdown)['height'];

			toggleDropdownItems(dropdownItems, 'none');

			if( icon && icon.innerText === 'expand_more' ) {
				icon.classList.add('arrow');
			}

			button.addEventListener('click', function() {
				if( button.classList.contains('expanded') && dropdown.classList.contains('expanded')) {
					button.classList.remove('expanded');
					dropdown.classList.remove('expanded');
					dropdown.style.height = '0px';

					toggleDropdownItems(dropdownItems, 'none');
				} else {
					button.classList.add('expanded');
					dropdown.classList.add('expanded');
					dropdown.style.height = height;

					toggleDropdownItems(dropdownItems, 'block');
				}
			});

			if( height.length > 0 && height !== '' ) {
				dropdown.style.height = '0px';
			}
		}

		// Automatically open dropdown
		//drawer.querySelector('.active').parentNode.previousElementSibling.click();
	}
}

/* Expansion panels */
const expansionPanel = document.getElementsByClassName('expansion-panel');
if( expansionPanel.length > 0 ) {
	for( let i = 0; i < expansionPanel.length; i ++ ) {
		let panel = expansionPanel[i];
		let li = panel.querySelectorAll('li');

		for( let j = 0; j < li.length; j++ ) {
			let item = li[j];
			let header = item.querySelector('.expansion-panel-header').innerHTML;

			// Auto add icon
			item.querySelector('.expansion-panel-header').innerHTML = `${header} <span class="expand-icon"><i class="material-icons">expand_more</i></span>`;

			let expand = item.querySelector('.expand-icon');
			expand.addEventListener('click', function() {
				item.classList.contains('expanded') ? item.classList.remove('expanded') : item.classList.add('expanded');
			});
		}
	}
}

/* Menu */
const menus = document.getElementsByClassName('menu');
if( menus.length > 0 ) {
	for( let i = 0; i < menus.length; i++ ) {
		let menu = menus[i];
		let height = getComputedStyle(menu)['height'];
		let width = getComputedStyle(menu)['width'];

		if( !empty(height) && !empty(width) ) {
			menu.style.maxHeight = '0px';
			menu.style.maxwidth = '0px';
		}

		document.addEventListener('expanded', function() {
			if( menu.classList.contains('expanded') ) {
				menu.style.maxHeight = height;
				menu.style.maxwidth = width;
			} else {
				menu.style.maxHeight = '0px';
				menu.style.maxwidth = '0px';
			}
		});

		document.addEventListener('collapsed', function() {
			if( menu.classList.contains('expanded') ) {
				menu.style.maxHeight = height;
				menu.style.maxwidth = width;
			} else {
				menu.style.maxHeight = '0px';
				menu.style.maxwidth = '0px';
			}
		});
	}
}

const selects = document.querySelectorAll('select.select');
if( selects.length > 0 ) {
	let selectId = 0;

	for( let i = 0; i < selects.length; i++ ) {
		selectId++;
		let select = selects[i];
		let options = select.options;
		let html = '';

		// Add options to menu
		for( let j = 0; j < options.length; j++ ) {
			html += `<a href="#">${options[i].text}</a>`;
		}

		select.insertAdjacentHTML('beforebegin',
			`<div class="select">
				<span class="select-current trigger" data-trigger="select-'+selectId+'">
					${options[0].text}
				</span>
				
				<i class="material-icons trigger" data-trigger="select-'+selectId+'">arrow_drop_down</i>
				<nav class="menu" id="select-'+selectId+'">${html}</nav>
			</div>`);
	}

	let selectDivs = document.querySelectorAll('div.select');

	for( let i = 0; i < selectDivs.length; i++ ) {
		let select = selectDivs[i];
		let current = select.querySelector('.select-current');
		let options = select.querySelectorAll('.menu a');
		let active = undefined;

		for( let j = 0; j < options.length; j++ ) {
			let option = options[j];

			option.addEventListener('click', function() {
				let selected = select.nextElementSibling;

				option.classList.add('active');

				if(active !== undefined && option !== active ) {
					active.classList.remove('active');
				}
				active = option;

				// Set text of select-current
				current.textContent = option.textContent;

				// Set value of select.select
				selected.value = selected.options[j].value;

				// Close select
				select.querySelector('.menu').classList.remove('expanded');
			});
		}
	}
}

/* Notifications */
function notification( $title, $options, $click ) {
	// Check browser support
	if( !('Notification' in window) ) {
		alert( 'Your browser doesn\'t support notifications' );
	} else if( Notification.permission === 'granted' ) {
		var $notification = new Notification( $title, $options );
		$notification.onclick = function () {
			window.open( $click, '_blank' );
		}
	} else if( Notification.permission === 'denied' ) { // If the user doesn't allows notifications
		// Ask user again
		Notification.requestPermission( function ( $permission ) {
			if( $permission === 'granted' ) {
				new Notification( 'You can now receive notifications' );
			}
		});
	}
}

const notifications = document.getElementsByClassName('notification');
if( notifications.length > 0 ) {
	for( let i = 0; i < notifications.length; i++ ) {
		let notification = notifications[i];
		let expander = notification.querySelector('.notification-header-expand');

		expander.addEventListener('click', function() {
			notification.classList.contains('expanded') ? notification.classList.remove('expanded') : notification.classList.add('expanded')
		});
	}
}

/* Progress */
const circular = document.getElementsByClassName('circular'),
	indeterminate = document.getElementsByClassName('indeterminate');

if( circular.length > 0 ) {
	for( let i = 0; i < circular.length; i++ ) {
		circular[i].innerHTML = '<svg viewBox="25 25 50 50"><circle cx="50" cy="50" r="20" fill="none" stroke-miterlimit="10"/></svg>';
	}
}

if( indeterminate.length > 0 ) {
	for( let i = 0; i < indeterminate.length; i++ ) {
		indeterminate[i].innerHTML = '<div class="progressbar"></div>';
	}
}

/* Selection */
['checkbox', 'radio'].forEach(function(e) {
	const selections = document.getElementsByClassName(e);

	if( selections.length > 0 ) {
		for( let i = 0; i < selections.length; i++ ) {
			let selection = selections[i],
				id = selection.getAttribute('id'),
				lever = selection.querySelector('.switch');

			if( !lever ) {
				selection.insertAdjacentHTML('afterend', `<label for="${id}"></label>`);
			}
		}
	}
});

/* Slider */
const sliders = document.querySelectorAll('input[type="range"].slider');
if( sliders.length > 0 ) {
	for( let i = 0; i < sliders.length; i++ ) {
		let slider = sliders[i],
			html;

		if( slider.classList.contains('slider-discrete') ) {
			html = `<div class="range">
						<div class="slider-bubble"></div>
						${slider.outerHTML}
						<div class="range-track">
							<div class="range-track-before"></div>
							<div class="range-track-after"></div>
						</div>
					</div>`;
		} else {
			html = `<div class="range">
						${slider.outerHTML}
						<div class="range-track">
							<div class="range-track-before"></div>
							<div class="range-track-after"></div>
						</div>
					</div>`;
		}

		slider.outerHTML = html;
	}
}

const ranges = document.querySelectorAll('.range .slider');
if( ranges.length > 0 ) {
	for( let i = 0; i < ranges.length; i++ ) {
		let slider = ranges[i];

		slider.addEventListener('input', function() {
			let minVal = slider.hasAttribute('min') ? slider.getAttribute('min') : 0,
				maxVal = slider.hasAttribute('max') ? slider.getAttribute('max') : 100,
				percentage = (slider.value / (maxVal - minVal)) * 100,
				before = slider.closest('div').querySelector('.range-track-before'),
				after = slider.closest('div').querySelector('.range-track-after');

			before.style.width = percentage+'%';
			after.style.width = (100 - percentage)+'%';

			if( slider.classList.contains('slider-discrete') ) {
				let bubble = slider.parentElement.querySelector('.slider-bubble');

				bubble.textContent = slider.value;
				bubble.style.left = percentage+'%';

				percentage > 0 ? bubble.classList.add('not-null') : bubble.classList.remove('not-null');
			}

			percentage > 0 ? slider.classList.add('not-null') : slider.classList.remove('not-null');

			// If slider is disabled
			if( slider.classList.contains('disabled') || slider.hasAttribute('disabled') ) {
				slider.parentElement.classList.add('disabled');
			}
		});

		let event = new Event('input', {
			'bubbles': false,
			'cancelable': false
		});

		slider.dispatchEvent(event);
	}
}

/*
 *Tabs
 */
['resize', 'load'].forEach(function(e) {
	window.addEventListener(e, function() {
		const tabs = document.querySelectorAll('body > .tabs');

		if( tabs.length > 0 ) {
			for( let i = 0; i < tabs.length; i++ ) {
				let appbarHeight = parseInt( getComputedStyle( document.querySelector( '.appbar' ) )['height'].replace( 'px', '' ) );
				let tabHeight = parseInt( getComputedStyle( document.querySelector( '.tabs' ) )['height'].replace( 'px', '' ) );

				document.getElementsByTagName('main')[0].style.top = (appbarHeight + tabHeight)+'px';
			}
		}
	});
});

/* Text fields */
const inputs = document.querySelectorAll('.input input'),
	textareas = document.querySelectorAll('.textarea textarea');

if( inputs.length > 0 ) {
	for( let i = 0; i < inputs.length; i++ ) {
		let input = inputs[i],
			value = input.value,
			label = input.parentElement.querySelector('label');

		if( value !== '' && value.length > 0 ) {
			label.classList.add('active');
		} else {
			label.classList.remove('active');
		}

		input.addEventListener('change',function() {
			if( value !== '' && value.length > 0 ) {
				label.classList.add('active');
			} else {
				label.classList.remove('active');
			}
		});

		// Add expander
		input.insertAdjacentHTML('afterend', '<div class="expander"></div>');
	}
}

if( textareas.length > 0 ) {
	for( let i = 0; i < textareas.length; i++ ) {
		let textarea = textareas[i],
			parent = textarea.parentElement;

		textarea.addEventListener('mouseover', function() {
			parent.classList.add('hover');
		});

		textarea.addEventListener('mouseout', function() {
			parent.classList.remove('hover');
		});

		textarea.addEventListener('click', function() {
			parent.classList.add('active');
		});

		textarea.addEventListener('blur', function() {
			parent.classList.remove('active');
		});
	}
}

let createErrors = function(form) {

	let messages = function() {
		let invalidFields = form.querySelectorAll(':invalid');

		// check if there are invalid fields
		if( invalidFields.length > 0 ) {
			for( let i = 0; i < invalidFields.length; i++ ) {
				let invalidField = invalidFields[i],
					parent = invalidField.parentElement,
					helper = parent.querySelector('.helper-text'),
					message = invalidField.validationMessage || 'Invalid value.';

				parent.classList.add('invalid');

				// Check if there isn't a .helper-text div already
				if( helper ) {
					helper.innerHTML = '';
					helper.innerHTML = '<i class="material-icons">error_outline</i> ' + message;
				} else {
					invalidField.insertAdjacentHTML('afterend', `<div class="helper-text"><i class="material-icons">error_outline</i>${message}</div>`);
				}
			}
		}
	};

	// Support Safari
	form.addEventListener('submit', function(e) {
		if( this.checkValidity && !this.checkValidity() ) {
			e.preventDefault();
			form.querySelectorAll(':invalid')[0].focus();
		}
	});

	['input[type="submit"]', 'button:not([type="button"])'].forEach(function(e) {
		let submit = form.querySelector(e);

		if(submit) {
			submit.addEventListener( 'click', messages );
		}
	});

	['input', 'textarea'].forEach(function(e) {
		let fields = form.querySelectorAll(e);

		for( let i = 0; i < fields.length; i++ ) {
			let field = fields[i],
				type = field.getAttribute('type');

			field.addEventListener('keypress', function(e) {
				if ( /date|email|month|number|search|tel|text|time|url|week/.test( type ) && e.keyCode === 13 ) {
					messages();
				}
			});
		}
	});
};

const forms = document.getElementsByTagName('form');

if( forms.length > 0 ) {
	for( let i = 0; i < forms.length; i++ ) {
		createErrors(forms[i]);
	}
}

/* Trigger */
const triggers = document.getElementsByClassName('trigger'),
	triggered = [];

if( triggers.length > 0 ) {
	let collapse = new Event('collapsed', {'bubbles': true, 'cancelable': false});
	let expand = new Event('expanded', {'bubbles': true, 'cancelable': false});

	for( let i = 0; i < triggers.length; i++ ) {
		let trigger = triggers[i];

		trigger.addEventListener('click', function(e) {
			console.log(e.pageX, e.pageY);
			let element = document.querySelector('#'+trigger.dataset.trigger);

			// Set the currently triggered element(s) in array
			triggered.indexOf(element) < 0 ? triggered.push(element) : '';

			if( element.classList.contains('expanded') ) {
				element.classList.remove('expanded');
				document.dispatchEvent(collapse);
			} else {
				element.classList.add('expanded');
				document.dispatchEvent(expand);

				// Open menu on clicked position
				if( element.classList.contains('menu') ) {
					let top = e.pageY,
						left = e.pageX;

					element.style.top = top+'px';
					element.style.left = left+'px';
				}
			}
		});
	}

	document.addEventListener('mouseup', function(e) {
		for(let i = 0; i < triggered.length; i++) {
			let trigger = triggered[i];

			if( trigger === e.target || trigger !== e.target && !trigger.contains( e.target ) ) {
				trigger.classList.remove('expanded');
				document.dispatchEvent(collapse);

				// Remove element from array
				i === 0 ? triggered.shift() : triggered.slice(i, 1);
			}
		}
	});
}