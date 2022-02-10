import "./styles.scss";
import {configLocator, woosmapPublicKey} from "./config.js";
import {renderSummaryView} from "./summaryView.js";
/*import {renderFullView} from "./fullView.js";*/


String.prototype.capitalize = function () {
    return this.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};

const loadWebApp = () => {
    const webapp = new WebApp("store-locator", woosmapPublicKey);
    webapp.setFilterPanelRenderer((title, children) => {
        let div = document.createElement("div");
        div.className = "filters";
        div.innerHTML += `<hr class="separator">`
        div.innerHTML += `<div class='filters-group'>${title}</div>`;
        children.forEach((item) => div.appendChild(item));
        return div;
    });
    webapp.setFilterRenderer((key, label, selected) => {
        let div = document.createElement("div");
        const className = key;
        div.className = selected ? "active" : "";
        div.innerHTML = `<div class='filters-button'><div class='icon-service icon-${className}'></div><div class='flex-grow'>${label}</div><div class='active-icon-wrapper'></div></div>`;
        return div;
    });
    /*
    webapp.setFullStoreRenderer((store) => {
        const myCustomContent = document.createElement("ul");
        myCustomContent.id = "myCustomContentID";
        myCustomContent.innerHTML = renderFullView(store);
        return myCustomContent;
    });*/

    webapp.setSummaryStoreRenderer((store) => {
        const mySummaryContent = document.createElement("div");
        mySummaryContent.className = "store-summary";
        mySummaryContent.innerHTML = renderSummaryView(store);
        return mySummaryContent;
    });

    webapp.setConf(configLocator);

    const isMobile = document.querySelector("body").clientWidth < 750;
    webapp.render(isMobile);
};

loadWebApp();
