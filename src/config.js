import marker_agency from './images/markers/agency-1.svg'
import marker_selected from './images/markers/marker_selected.svg'

import icon_service_1 from './images/icons/nacelle.svg'
import icon_service_2 from './images/icons/nettoyage-1.svg'
import icon_service_3 from './images/icons/travaillerHauteur.svg'

import icon_tag_4 from './images/icons/gros-oeuvre-beton.svg'
import icon_tag_5 from './images/icons/isolation-decoration-finitions.svg'
import icon_tag_6 from './images/icons/soudure-plomberie-electricite.svg'

export const typesMapping = [
    {key: "agence-terrassement", icon: icon_service_1},
    {key: "agence-k", icon: icon_service_2},
    {key: "quai-elevation-terrassement", icon: icon_service_1},
    {key: "agence-generaliste", icon: icon_service_2},
    {key: "service-commercial-elevation", icon: icon_service_1},
    {key: "generaliste-type-3", icon: icon_service_3},
    {key: "service-commercial-terrassement", icon: icon_service_3},
    {key: "agence-generaliste-terrassement-elevation", icon: icon_service_1},
    {key: "generaliste-type-4", icon: icon_service_2},
    {key: "scet-mode-region", icon: icon_service_3},
]

export const tagsMapping = [
    {key: "tag_1", icon: icon_service_1},
    {key: "tag_2", icon: icon_service_2},
    {key: "tag_3", icon: icon_service_3},
    {key: "tag_4", icon: icon_tag_4},
    {key: "tag_5", icon: icon_tag_5},
    {key: "tag_6", icon: icon_tag_6}
]
const woosmapViewOptions = {
    style: {
        default: {
            icon: {
                url: marker_agency,
                anchor: {
                    x: 25,
                    y: 25
                }
            },
            selectedIcon: {
                url: marker_selected,
                scaledSize: {height: 70, width: 70},
                anchor: {
                    x: 35,
                    y: 35
                }
            },
            numberedIcon: {
                url: marker_agency,
                anchor: {
                    x: 25,
                    y: 25
                }
            },
        },
    },
    tileStyle: {
        color: '#FFC800',
        size: 13,
        minSize: 6
    },
    breakPoint: 10,
    fitBounds: true
}

const mapsProviderOptions = {
    provider: "woosmap",
    localities: {
        types: [
            "locality",
            "address",
            "postal_code",
            "metro_station",
            "train_station",
            "shopping"
        ],
        componentRestrictions: {country: "fr"}
    }
}

const availableServices = [
    {key: "agence-terrassement", fr: "Terrassement"},
    {key: "agence-k", fr: "TP"},
    {key: "quai-elevation-terrassement", fr: "Élevation"},
    {key: "agence-generaliste", fr: "Énergie"},
    {key: "service-commercial-elevation", fr: "Module"},
    {key: "generaliste-type-3", fr: "Signalisation"},
    {key: "service-commercial-terrassement", fr: "Loca-réception"},
];

export const configLocator = {
    maps: mapsProviderOptions,
    woosmapview: woosmapViewOptions,
    datasource: {
        max_responses: 15,
        max_distance: 0,
        routeProvider: 'google',
        distanceMatrixProvider: 'google'
    },
    internationalization: {
        lang: "fr",
        period: "fr-fr"
    },
    theme: {
        primary_color: "#FFC800"
    },
    filters: {
        filters: [
            {
                propertyType: "type",
                title: {
                    fr: "Type d'Agence"
                },
                choices: availableServices,
                innerOperator: "or"
            }
        ]
    }
}

export const woosmapPublicKey = "woos-f5927792-1f12-3c9e-aafb-7014c5a7b4f0";