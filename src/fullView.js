import {typesMapping} from "./config";
import store_photo from './images/photos/chapitre-elevation-2.png'
import phone_icon from "./images/icons/phone.svg";
import email_icon from "./images/icons/email.svg";

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

const renderFullViewHeader = (properties) => {
    const address = `${properties.address.lines}, ${properties.address.city}`;
    const capabilities = getCapabilitiesElem(properties.tags)
    return `<div class="section-station-head">
            <h3 class="station-title">${address}</h3>
            <div>${capabilities}</div>
            </div><hr class="separator">`
}

const renderFullViewBody = (properties) => {
    const charging_points = properties.user_properties["charging_points"].map((charging_point, i) => {
        const connectors = renderConnectors(charging_point);
        return `<div>${connectors}</div>`
    }).join("")
    return `<div class="section-station-body">${charging_points}</div>`
}


export const renderPhoto = (properties) => {
    return `<div class="store-photo"><img src="${store_photo}"></div>`
}


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

const getPhone = (properties) => {
    return properties.contact.phone ? `<div class='summary-phone'><div class="icon"><img src="${phone_icon}"></div><a href="tel:${properties.contact.phone}" onClick="event.stopPropagation();">${properties.contact.phone}</a></div>` : "";
};

const getEmail = (properties) => {
    return properties.contact.email ? `<div class='summary-phone'><div class="icon"><img src="${email_icon}"></div><a href="mailto:${properties.contact.email}" onClick="event.stopPropagation();">${properties.contact.email}</a></div>` : "";
};

function getContact(properties) {
    return `<div className='full-contact'><h3 className='summary-title'>Contacts</h3>${getPhone(properties)}${getEmail(properties)}</div>`;
}

function getFullSchedule(properties) {
    const today = new Date().toLocaleString('en-us', {weekday: 'long'});
    const weeklyOpening = properties.weekly_opening;
    let dayLabels = {
        1: "Lundi",
        2: "Mardi",
        3: "Mercredi}",
        4: "Jeudi",
        5: "Vendredi",
        6: "Samedi",
        7: "Dimanche"
    };
    let daysHoursHTMLTable = "";
    if (weeklyOpening) {
        for (var day in dayLabels) {
            var daysHours = "";
            if (weeklyOpening[day].hours.length === 0) {
                daysHours = "Fermé";
            } else {
                weeklyOpening[day].hours.some(function (hour) {
                    if (hour && hour["all-day"]) {
                        daysHours = "24h/24";
                        return true;
                    } else if (daysHours.length > 0) {
                        daysHours += ", ".concat(hour.start, "-").concat(hour.end);
                    } else {
                        daysHours = "".concat(hour.start, "-").concat(hour.end);
                    }
                });
            }
            let currentDay = dayLabels[day] === today ? "current-day" : ""
            daysHoursHTMLTable += `<tr class='${currentDay}'><td style='padding-right:10px'>${dayLabels[day]}</td><td>${daysHours}</td></tr>`;
        }
    }

    return `<table class='hours-table'>${daysHoursHTMLTable}</table>`;

}

function getOpeningHours(properties) {
    if (properties.weekly_opening) {
        return `<div class='full-hours'><h3 class='summary-title'>Horaires d'ouverture</h3>${getFullSchedule(properties)}</div>`;
    }
    return ""
}


const getCTA = () => {
    return `<div class="cta">
        <a href="https://www.kiloutou.fr/" class="cta-button" target="_blank"
           onClick="event.stopPropagation();">
            <span class="title">Consulter la fiche</span></a>
    </div>`
}
export const renderFullView = ({properties}) =>
    `${renderPhoto(properties)}
     <div class="full-content">
     <div class="full-title"><h2>${properties.name.capitalize()}</h2></div>
     <div class="full-text">${properties.address.lines.join(", ").capitalize()}</div>
     ${getTypesIcons(properties)}
     ${getOpeningHours(properties)}
     ${getContact(properties)}
     ${getCTA(properties)}
     </div>`

/*
${getPhone(properties)}

 */