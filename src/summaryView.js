import {tagsMapping} from "./config";
import phone_icon from './images/icons/phone.svg'

const getTypesIcons = (properties) => {
    if (properties.tags.length > 0) {
        const types = properties.tags.map((type) => {
            const typeIcon = tagsMapping.find(c => c.key === type).icon;
            return typeIcon ? `<div class="icon"><img src=${typeIcon}></div>` : ''
        })
        return `<div class="summary-types">${types.join("")}</div>`
    }
    return "";
};

const getOpeningLabel = function (properties) {
    let openLabel = "Fermé";
    let openClass = ""

    function _dateIsToday(date) {
        let today = new Date();
        today = today.getUTCFullYear() + "-" +
            ("0" + (today.getUTCMonth() + 1)).slice(-2) + "-" +
            ("0" + today.getUTCDate()).slice(-2);
        return today === date;
    }

    try {
        if (properties.open.open_now) {
            openLabel = "Ouvert";
            openClass = "opening-open"
        } else if (properties.open.next_opening) {
            if (_dateIsToday) {
                openLabel = "ouvre bientôt"
                openClass = "opening-soon"
            } else {
                openLabel += "Fermé"
                openClass = "opening-closed"
            }
        }
        if (openLabel !== "") {
            return `<span class='open-label ${openClass}'>${openLabel}</span>`;
        } else return ""
    } catch (error) {
        return "";
    }
};

const getOpeningHours = (properties) => {
    if (properties.open && properties.open.open_hours) {
        const hours = properties.open.open_hours.map((hoursSlice) => {
            return hoursSlice ? `${hoursSlice.start}-${hoursSlice.end}` : ''
        })

        return `<div class='summary-hours'><div class='summary-title'>Horaires d'ouverture</div><div>${hours.join(", ")}</div>${getOpeningLabel(properties)}</div>`;
    }
    return ""
};

const getPhone = (properties) => {
    return properties.contact.phone ? `<div class='summary-phone'><div class="icon"><img src="${phone_icon}"></div><a href="tel:${properties.contact.phone}" onClick="event.stopPropagation();">${properties.contact.phone}</a></div>` : "";
};

const getDistanceAndTime = (properties) => {
    const distanceLabel = properties.distance_text ? `${properties.distance_text}` : "";
    return distanceLabel ? `<div class='summary-distance'>${distanceLabel}</div>` : "";
};

const getCTA = (properties) => {
    return `<div class="cta">
        <a href="https://www.kiloutou.fr/" class="cta-button" target="_blank"
           onClick="event.stopPropagation();">
            <span class="title">Consulter la fiche</span></a>
    </div>`
}

export const renderSummaryView = ({properties}) => `<div class="summary-content">
      ${getDistanceAndTime(properties)}
     <div class="summary-title">${properties.name.capitalize()}</div>
     <div class="summary-text">${properties.address.lines.join(", ").capitalize()}</div>
     ${getTypesIcons(properties)}
     ${getPhone(properties)}
     ${getOpeningHours(properties)}
     ${getCTA(properties)}
     </div>`
