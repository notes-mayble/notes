//LOADER
window.addEventListener('load', function () {
    var loader = document.querySelector('.skeleton');
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

const note = document.querySelector('.note');
//SIDE-BAR
const menuListBtn = document.querySelector('#header__menu-btn');
menuListBtn.addEventListener('click', function () {
    const menu = document.querySelector('.menu');
    menu.classList.remove('menu__close-anim');
    note.classList.remove('note__open-anim');
});

//SCREENSHOT
function screenshotMode() {
    const header = document.querySelector('.header');

    const btn = document.querySelector('.screenshot-btn');

    header.style.display = 'none';
    note.style.height = '800vh';
    btn.style.display = 'initial';
}

//SETTINGS DROP-DOWN
const settingBtn = document.querySelector('#option-btn');
const dropdown = document.querySelector('.settings');
const dropdownMenu = document.querySelector('.settings__menu');
const closeBtn = document.querySelector('.settings__close');
const settingsList = document.querySelector('.settings__menu-list');

var canClose = false;

settingBtn.addEventListener('click', function () {
    dropdown.style.display = 'initial';
});

dropdownMenu.addEventListener('mouseover', function () {
    canClose = false;
});

dropdownMenu.addEventListener('mouseout', function () {
    canClose = true;
});

dropdown.addEventListener('click', function () {
    if (canClose == true) {
        dropdown.style.display = 'none';
    }
});

closeBtn.addEventListener('click', function () {
    dropdown.style.display = 'none';
});

//FONTS

function sansSerifFont() {
    note.style.fontFamily = 'Mulish';
}

function serifFont() {
    note.style.fontFamily = 'Gentium Book Plus';
}

//THEMES
function defaultTheme() {
    document.documentElement.style.setProperty(
        '--sidebarBackground',
        'linear-gradient(0deg, #ab8b89 0%, #1a517e 100%)'
    );
    document.documentElement.style.setProperty('--theme-color', '#FCEC7B');
    document.documentElement.style.setProperty('--accent-text-color', 'black');
    localStorage.setItem('notesTheme', 'default');
}

function seaFoamGreenTheme() {
    document.documentElement.style.setProperty(
        '--sidebarBackground',
        'linear-gradient(0deg, rgba(31,64,55,1) 0%, rgba(153,242,200,1) 100%)'
    );
    document.documentElement.style.setProperty('--theme-color', '#57855e');
    document.documentElement.style.setProperty(
        '--accent-text-color',
        '#e8daa3'
    );
    localStorage.setItem('notesTheme', 'seaFoamGreenTheme');
}

function cyberpunkTheme() {
    document.documentElement.style.setProperty(
        '--sidebarBackground',
        'linear-gradient(180deg, rgba(0,13,28,1) 0%, rgba(3,45,49,1) 50%, rgba(32,40,90,1) 100%)'
    );
    document.documentElement.style.setProperty('--theme-color', '#e43736');
    document.documentElement.style.setProperty('--accent-text-color', 'white');
    localStorage.setItem('notesTheme', 'cyberpunkTheme');
}

function expressionTheme() {
    document.documentElement.style.setProperty(
        '--sidebarBackground',
        'linear-gradient(321deg, rgba(142,45,226,1) 0%, rgba(74,0,224,1) 100%)'
    );
    document.documentElement.style.setProperty('--theme-color', '#00e7b2');
    document.documentElement.style.setProperty(
        '--accent-text-color',
        '#000712'
    );
    localStorage.setItem('notesTheme', 'expressionTheme');
}

function lightTheme() {
    document.documentElement.style.setProperty(
        '--sidebarBackground',
        'linear-gradient(146deg, rgba(198,216,237,1) 0%, rgba(244,236,241,1) 100%)'
    );
    document.documentElement.style.setProperty('--theme-color', '#b0c3de');
    document.documentElement.style.setProperty('--accent-text-color', 'white');
    localStorage.setItem('notesTheme', 'light');
}

function darkTheme() {
    document.documentElement.style.setProperty(
        '--sidebarBackground',
        'linear-gradient(146deg, rgba(7,19,41,1) 0%, rgba(15,37,76,1) 100%)'
    );
    document.documentElement.style.setProperty('--theme-color', '#1760ff');
    document.documentElement.style.setProperty('--accent-text-color', 'white');
    localStorage.setItem('notesTheme', 'dark');
}

function menuItemSilence() {
    const silence = document.querySelectorAll('#canBeSilenced');

    for (const canBeSilenced of silence) {
        canBeSilenced.classList.add('settings__menu-list-unavailable');
    }
}

function menuItemUnsilence() {
    const silence = document.querySelectorAll('#canBeSilenced');

    for (const canBeSilenced of silence) {
        canBeSilenced.classList.remove('settings__menu-list-unavailable');
    }
}

const lightDarkModeSwitch = document.querySelector('#light-dark-mode-switch');
const transparencySwitch = document.querySelector('#transparency-switch');
const temporal = localStorage.getItem('notesLightDarkSwitch');
const body = document.querySelector('.body');

lightDarkModeSwitch.addEventListener('click', function () {
    lightDarkSwitchHandler();
});

if (temporal === 'checked') {
    lightDarkModeSwitch.setAttribute('checked', true);
    menuItemSilence();
    lightDarkMode();
} else if (temporal === 'unchecked') {
    menuItemUnsilence();
    themeCheck();
}

function lightDarkMode() {
    if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
        lightTheme();
    } else if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        darkTheme();
    } else {
        defaultTheme();
    }
}

window.onload = themeCheck();
function themeCheck() {
    var currentTheme = localStorage.getItem('notesTheme');

    if (temporal === 'checked' && currentTheme === 'light') {
        lightDarkMode();
    } else if (temporal === 'checked' && currentTheme === 'dark') {
        lightDarkMode();
    } else if (temporal !== 'checked' && currentTheme === 'light') {
        lightTheme();
    } else if (temporal !== 'checked' && currentTheme === 'dark') {
        darkTheme();
    } else if (currentTheme === 'default') {
        defaultTheme();
    } else if (currentTheme === 'seaFoamGreenTheme') {
        seaFoamGreenTheme();
    } else if (currentTheme === 'cyberpunkTheme') {
        cyberpunkTheme();
    } else if (currentTheme === 'expressionTheme') {
        expressionTheme();
    } else {
        defaultTheme();
    }
}

function lightDarkSwitchHandler() {
    if (lightDarkModeSwitch.checked === true) {
        localStorage.setItem('notesLightDarkSwitch', 'checked');
        lightDarkModeSwitch.setAttribute('checked', true);
        menuItemSilence();
        lightDarkMode();
    } else if (
        lightDarkModeSwitch.checked == false ||
        temporal === 'unchecked'
    ) {
        localStorage.setItem('notesLightDarkSwitch', 'unchecked');
        lightDarkModeSwitch.setAttribute('unchecked', false);
        menuItemUnsilence();
        defaultTheme();
    }
}

function transparencyEnable() {
    body.style.background = 'var(--sidebarBackground)';
}

function transparencyDisable() {
    body.style.background = 'black';
}

function transparencyHandler() {
    if (transparencySwitch.checked === true) {
        transparencyEnable();
        localStorage.setItem('notesTransparencySwitch', 'enabled');
    } else if (
        transparencySwitch.checked === false ||
        transparencyInfo === 'disabled'
    ) {
        transparencyDisable();
        localStorage.setItem('notesTransparencySwitch', 'disabled');
    }
}

transparencySwitch.addEventListener('click', function () {
    transparencyHandler();
});

const transparencyInfo = localStorage.getItem('notesTransparencySwitch');

if (transparencyInfo === 'enabled') {
    transparencyEnable();
    transparencySwitch.setAttribute('checked', true);
} else if (transparencyInfo === 'disabled') {
    transparencyDisable();
    transparencySwitch.setAttribute('unchecked', false);
}

const spellCheckSwitch = document.querySelector('#spell-check-switch');

function spellCheck() {
    if (spellCheckSwitch.checked === true) {
        note.setAttribute('spellcheck', 'true');
    } else {
        note.setAttribute('spellcheck', 'false');
    }
}
