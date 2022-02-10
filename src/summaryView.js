import {typesMapping} from "./config";
import phone_icon from './images/icons/phone.svg'

const getTypesIcons = (properties) => {
    if (properties.types.length > 0) {
        const types = properties.types.map((type) => {
            const typeIcon = typesMapping.find(c => c.key === type).icon;
            return typeIcon ? `<div class="icon"><img src=${typeIcon}></div>` : ''
        })
        return `<div class="summary-types">${types.join("")}</div>`
    }
    return "";
};

const getOpeningLabel = function (properties) {

    function _dateIsToday(date) {
        var today = new Date();
        today = today.getUTCFullYear() + "-" +
            ("0" + (today.getUTCMonth() + 1)).slice(-2) + "-" +
            ("0" + today.getUTCDate()).slice(-2);
        return today === date;
    }

    var i18n = {
        "fr": {
            "at": "à",
            "opensToday": "Ouvre aujourd'hui",
            "opens": "Ouvre",
            "openUntil": "Ouvert jusqu'à"
        }
    };

    var locale = "fr";
    var openLabel = "";

    try {
        if (properties.open.open_now) {
            openLabel = i18n[locale].openUntil + " " + properties.open.current_slice.end;
        } else if (properties.open.next_opening) {
            if (_dateIsToday) {
                openLabel += i18n[locale].opensToday + " " + i18n[locale].at + " " + properties.open.next_opening.start
            } else {
                openLabel += i18n[locale].opens + " " + convertTime(Date.parse(properties.open.next_opening.day) / 1000) + " " + i18n[locale].at + " " + properties.open.next_opening.start
            }
        }
        if (openLabel !== "") {
            return "<p class='summary-hours'>" + openLabel + "</p>";
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
        return "<div class='summary-hours'><div class='summary-title'>Horaires d'ouverture</div>" + hours.join(", ") + "</div>";
    }
    return ""
};

const getPhone = (properties) => {
    return properties.contact.phone ? `<div class='summary-phone'><div class="icon"><img src="${phone_icon}"></div><a href="tel:${properties.contact.phone}">${properties.contact.phone}</a></div>` : "";
};

const getDistanceAndTime = (properties) => {
    const distanceLabel = properties.distance_text ? `${properties.distance_text}` : "";
    return distanceLabel ? `<div class='summary-distance'>${distanceLabel}</div>` : "";
};

export const renderSummaryView = ({properties}) => `<div class="summary-content">
      ${getDistanceAndTime(properties)}
     <div class="summary-title">${properties.name.capitalize()}</div>
     <div class="summary-text">${properties.address.lines.join(", ").capitalize()}</div>
     ${getTypesIcons(properties)}
     ${getPhone(properties)}
     ${getOpeningHours(properties)}
     </div>`
