function delay(ms) {
    return new Promise((res, rej) => {
        setTimeout(function onTimeout() {
            res();
        }, ms);
    });
}
export default function createSideNavManager(conf) {
    let currentActiveItem = null;
    let isScrollingActivationEnabled = true;
    const { detailNav } = conf;
    function enableScrollingActivation(b) {
        isScrollingActivationEnabled = b;
    }
    function activate(id) {
        if (currentActiveItem !== null) {
            currentActiveItem.classList.remove('active');
        }
        const item = detailNav.querySelector(`[data-heading=${id}]`);
        item.classList.add('active');
        currentActiveItem = item;
    }
    function setActiveViaScroll(id) {
        if (isScrollingActivationEnabled) {
            activate(id);
        }
    }
    function setActiveViaClick(id) {
        enableScrollingActivation(false);
        activate(id);
        delay(2000)
        .then(() => enableScrollingActivation(true));
    }
    return {
        setActiveViaClick: setActiveViaClick,
        setActiveViaScroll: setActiveViaScroll,
    };
};