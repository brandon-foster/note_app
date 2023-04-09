import createSideNavManager from './createSideNavManager.js';

const FIXED_TOP = 50;

function getAncestorOf(elem, selector) {
    let parent = elem.parentElement;
    while (parent !== null && !parent.matches(selector)) {
        parent = parent.parentElement;
        if (parent.matches(selector)) {
            return parent;
        }
    }
}

function setupThreshhold(elem, onEnterThreshhold, onExitThreshhold) {
    const row = getAncestorOf(elem, '.row');
    let toggleSwitch = false;
    const originalOffsetTop = row.offsetTop;
    window.addEventListener('scroll', decideToSetFixed);
    decideToSetFixed();
    function decideToSetFixed() {
        if (window.scrollY >= originalOffsetTop - FIXED_TOP) {
            if (toggleSwitch === false) {
                onEnterThreshhold(elem);
                toggleSwitch = true;
            }
        }
        else {
            if (toggleSwitch === true) {
                onExitThreshhold(elem);
                toggleSwitch = false;
            }
        }
    }
}
const breakPointState = (function breakPointState() {
    let isOutsideBound = undefined;
    function onResize() {
        const width = window.innerWidth;
        isOutsideBound = width >= 576;
        if (isOutsideBound) {
            performDisplayOfSideNav();
        }
    }
    return {
        onResize: onResize,
        isOutsideBound: function isOutsideBound() {
            return isOutsideBound;
        },
    };
}());
window.addEventListener('resize', breakPointState.onResize);
window.addEventListener('load', performDisplayOfSideNav);

function performDisplayOfSideNav() {
    const sideNav = document.querySelector('#sideNav');
    const sideNavWrapper = document.querySelector('.sideNavWrapper');
    const sideNavManager = createSideNavManager({
        detailNav: sideNav,
    });
    if (breakPointState.isOutsideBound) {
        sideNav.style.width = sideNavWrapper.clientWidth + 'px';
        setupThreshhold(sideNav, function setFixed(elem) {
            if (sideNavWrapper.offsetHeight < (window.innerHeight - FIXED_TOP)) {
                elem.style.position = 'fixed';
                elem.style.top = FIXED_TOP + 'px';
            }
        }, function unsetFixed(elem) {
            elem.style.position = null;
            elem.style.top = null;
        });
    }
    
    const h2List = document.getElementsByTagName('h2');
    sideNav.addEventListener('click', function onDetailNavClick(e) {
        if (e.target.matches('a')) {
            const headingId = e.target.dataset.heading;
            sideNavManager.setActiveViaClick(headingId);
        }
    });
}