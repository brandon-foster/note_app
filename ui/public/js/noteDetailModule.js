import createSideNavManager from './createSideNavManager.js';

function setupThreshhold(elem, onEnterThreshhold, onExitThreshhold) {
    let toggleSwitch = false;
    const originalOffsetTop = elem.offsetTop;
    window.addEventListener('scroll', decideToSetFixed);
    decideToSetFixed();
    function decideToSetFixed() {
        if (window.scrollY >= originalOffsetTop - 50) {
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
function setWidthOfTo(srcElem, destElem) {
    destElem.style.width = srcElem.clientWidth + 'px';
}
window.addEventListener('load', function() {
    const detailNav = document.querySelector('#sideNav');
    const wrapper = document.querySelector('.sideNavWrapper');
    setWidthOfTo(wrapper, detailNav);
    const sideNavManager = createSideNavManager({
        detailNav: detailNav,
    });
    setupThreshhold(detailNav, function setFixed(elem) {
        elem.style.position = 'fixed';
        elem.style.top = '50px';
    }, function unsetFixed(elem) {
        elem.style.position = null;
        elem.style.top = null;
    });
    
    const h2List = document.getElementsByTagName('h2');
    [...h2List].forEach(h2 => {
        setupThreshhold(h2, function logEnter(elem) {
            sideNavManager.setActiveViaScroll(elem.id);
        },
        function logExit(elem) {
            sideNavManager.setActiveViaScroll(elem.id);
        });
    });
    detailNav.addEventListener('click', function onDetailNavClick(e) {
        if (e.target.matches('a')) {
            const headingId = e.target.dataset.heading;
            sideNavManager.setActiveViaClick(headingId);
        }
    });
});