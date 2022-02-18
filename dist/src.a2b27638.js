// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/images/icons/nacelle.svg":[function(require,module,exports) {
module.exports = "/nacelle.a3881b69.svg";
},{}],"src/images/icons/nettoyage-1.svg":[function(require,module,exports) {
module.exports = "/nettoyage-1.c850c6e3.svg";
},{}],"src/images/icons/travaillerHauteur.svg":[function(require,module,exports) {
module.exports = "/travaillerHauteur.d7de40b1.svg";
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)?\/[^/]+(?:\?.*)?$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/styles.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./images/icons/energie&air.svg":[["energie&air.703faa15.svg","src/images/icons/energie&air.svg"],"src/images/icons/energie&air.svg"],"./images/icons/nacelle.svg":[["nacelle.a3881b69.svg","src/images/icons/nacelle.svg"],"src/images/icons/nacelle.svg"],"./images/icons/nettoyage-1.svg":[["nettoyage-1.c850c6e3.svg","src/images/icons/nettoyage-1.svg"],"src/images/icons/nettoyage-1.svg"],"./images/icons/travaillerHauteur.svg":[["travaillerHauteur.d7de40b1.svg","src/images/icons/travaillerHauteur.svg"],"src/images/icons/travaillerHauteur.svg"],"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/images/markers/agency-1.svg":[function(require,module,exports) {
module.exports = "/agency-1.63ce1db3.svg";
},{}],"src/images/markers/marker_selected.svg":[function(require,module,exports) {
module.exports = "/marker_selected.23a77a9a.svg";
},{}],"src/images/icons/gros-oeuvre-beton.svg":[function(require,module,exports) {
module.exports = "/gros-oeuvre-beton.9fd7531c.svg";
},{}],"src/images/icons/isolation-decoration-finitions.svg":[function(require,module,exports) {
module.exports = "/isolation-decoration-finitions.2864d11f.svg";
},{}],"src/images/icons/soudure-plomberie-electricite.svg":[function(require,module,exports) {
module.exports = "/soudure-plomberie-electricite.c1ad0c4a.svg";
},{}],"src/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.woosmapPublicKey = exports.typesMapping = exports.tagsMapping = exports.configLocator = void 0;

var _agency = _interopRequireDefault(require("./images/markers/agency-1.svg"));

var _marker_selected = _interopRequireDefault(require("./images/markers/marker_selected.svg"));

var _nacelle = _interopRequireDefault(require("./images/icons/nacelle.svg"));

var _nettoyage = _interopRequireDefault(require("./images/icons/nettoyage-1.svg"));

var _travaillerHauteur = _interopRequireDefault(require("./images/icons/travaillerHauteur.svg"));

var _grosOeuvreBeton = _interopRequireDefault(require("./images/icons/gros-oeuvre-beton.svg"));

var _isolationDecorationFinitions = _interopRequireDefault(require("./images/icons/isolation-decoration-finitions.svg"));

var _soudurePlomberieElectricite = _interopRequireDefault(require("./images/icons/soudure-plomberie-electricite.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typesMapping = [{
  key: "agence-terrassement",
  icon: _nacelle.default
}, {
  key: "agence-k",
  icon: _nettoyage.default
}, {
  key: "quai-elevation-terrassement",
  icon: _nacelle.default
}, {
  key: "agence-generaliste",
  icon: _nettoyage.default
}, {
  key: "service-commercial-elevation",
  icon: _nacelle.default
}, {
  key: "generaliste-type-3",
  icon: _travaillerHauteur.default
}, {
  key: "service-commercial-terrassement",
  icon: _travaillerHauteur.default
}, {
  key: "agence-generaliste-terrassement-elevation",
  icon: _nacelle.default
}, {
  key: "generaliste-type-4",
  icon: _nettoyage.default
}, {
  key: "scet-mode-region",
  icon: _travaillerHauteur.default
}];
exports.typesMapping = typesMapping;
var tagsMapping = [{
  key: "tag_1",
  icon: _nacelle.default
}, {
  key: "tag_2",
  icon: _nettoyage.default
}, {
  key: "tag_3",
  icon: _travaillerHauteur.default
}, {
  key: "tag_4",
  icon: _grosOeuvreBeton.default
}, {
  key: "tag_5",
  icon: _isolationDecorationFinitions.default
}, {
  key: "tag_6",
  icon: _soudurePlomberieElectricite.default
}];
exports.tagsMapping = tagsMapping;
var woosmapViewOptions = {
  style: {
    default: {
      icon: {
        url: _agency.default,
        anchor: {
          x: 25,
          y: 25
        }
      },
      selectedIcon: {
        url: _marker_selected.default,
        scaledSize: {
          height: 70,
          width: 70
        },
        anchor: {
          x: 35,
          y: 35
        }
      },
      numberedIcon: {
        url: _agency.default,
        anchor: {
          x: 25,
          y: 25
        }
      }
    }
  },
  tileStyle: {
    color: '#FFC800',
    size: 13,
    minSize: 6
  },
  breakPoint: 10,
  fitBounds: true
};
var mapsProviderOptions = {
  provider: "woosmap",
  localities: {
    types: ["address", "locality", "postal_code", "metro_station", "train_station", "shopping"],
    componentRestrictions: {
      country: "fr"
    }
  }
};
var availableServices = [{
  key: "agence-terrassement",
  fr: "Terrassement"
}, {
  key: "agence-k",
  fr: "TP"
}, {
  key: "quai-elevation-terrassement",
  fr: "Élevation"
}, {
  key: "agence-generaliste",
  fr: "Énergie"
}, {
  key: "service-commercial-elevation",
  fr: "Module"
}, {
  key: "generaliste-type-3",
  fr: "Signalisation"
}, {
  key: "service-commercial-terrassement",
  fr: "Loca-réception"
}];
var configLocator = {
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
    filters: [{
      propertyType: "type",
      title: {
        fr: "Type d'Agence"
      },
      choices: availableServices,
      innerOperator: "or"
    }]
  }
};
exports.configLocator = configLocator;
var woosmapPublicKey = "woos-f5927792-1f12-3c9e-aafb-7014c5a7b4f0";
exports.woosmapPublicKey = woosmapPublicKey;
},{"./images/markers/agency-1.svg":"src/images/markers/agency-1.svg","./images/markers/marker_selected.svg":"src/images/markers/marker_selected.svg","./images/icons/nacelle.svg":"src/images/icons/nacelle.svg","./images/icons/nettoyage-1.svg":"src/images/icons/nettoyage-1.svg","./images/icons/travaillerHauteur.svg":"src/images/icons/travaillerHauteur.svg","./images/icons/gros-oeuvre-beton.svg":"src/images/icons/gros-oeuvre-beton.svg","./images/icons/isolation-decoration-finitions.svg":"src/images/icons/isolation-decoration-finitions.svg","./images/icons/soudure-plomberie-electricite.svg":"src/images/icons/soudure-plomberie-electricite.svg"}],"src/images/icons/phone.svg":[function(require,module,exports) {
module.exports = "/phone.57313101.svg";
},{}],"src/summaryView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSummaryView = void 0;

var _config = require("./config");

var _phone = _interopRequireDefault(require("./images/icons/phone.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTypesIcons = function getTypesIcons(properties) {
  if (properties.tags.length > 0) {
    var types = properties.tags.map(function (type) {
      var typeIcon = _config.tagsMapping.find(function (c) {
        return c.key === type;
      }).icon;

      return typeIcon ? "<div class=\"icon\"><img src=".concat(typeIcon, "></div>") : '';
    });
    return "<div class=\"summary-types\">".concat(types.join(""), "</div>");
  }

  return "";
};

var getOpeningLabel = function getOpeningLabel(properties) {
  var openLabel = "Fermé";
  var openClass = "";

  function _dateIsToday(date) {
    var today = new Date();
    today = today.getUTCFullYear() + "-" + ("0" + (today.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + today.getUTCDate()).slice(-2);
    return today === date;
  }

  try {
    if (properties.open.open_now) {
      openLabel = "Ouvert";
      openClass = "opening-open";
    } else if (properties.open.next_opening) {
      if (_dateIsToday) {
        openLabel = "ouvre bientôt";
        openClass = "opening-soon";
      } else {
        openLabel += "Fermé";
        openClass = "opening-closed";
      }
    }

    if (openLabel !== "") {
      return "<span class='open-label ".concat(openClass, "'>").concat(openLabel, "</span>");
    } else return "";
  } catch (error) {
    return "";
  }
};

var getOpeningHours = function getOpeningHours(properties) {
  if (properties.open && properties.open.open_hours) {
    var hours = properties.open.open_hours.map(function (hoursSlice) {
      return hoursSlice ? "".concat(hoursSlice.start, "-").concat(hoursSlice.end) : '';
    });
    return "<div class='summary-hours'><div class='summary-title'>Horaires d'ouverture</div><div>".concat(hours.join(", "), "</div>").concat(getOpeningLabel(properties), "</div>");
  }

  return "";
};

var getPhone = function getPhone(properties) {
  return properties.contact.phone ? "<div class='summary-phone'><div class=\"icon\"><img src=\"".concat(_phone.default, "\"></div><a href=\"tel:").concat(properties.contact.phone, "\" onClick=\"event.stopPropagation();\">").concat(properties.contact.phone, "</a></div>") : "";
};

var getDistanceAndTime = function getDistanceAndTime(properties) {
  var distanceLabel = properties.distance_text ? "".concat(properties.distance_text) : "";
  return distanceLabel ? "<div class='summary-distance'>".concat(distanceLabel, "</div>") : "";
};

var getCTA = function getCTA(properties) {
  return "<div class=\"cta\">\n        <a href=\"https://www.kiloutou.fr/\" class=\"cta-button\" target=\"_blank\"\n           onClick=\"event.stopPropagation();\">\n            <span class=\"title\">Consulter la fiche</span></a>\n    </div>";
};

var renderSummaryView = function renderSummaryView(_ref) {
  var properties = _ref.properties;
  return "<div class=\"summary-content\">\n      ".concat(getDistanceAndTime(properties), "\n     <div class=\"summary-title\">").concat(properties.name.capitalize(), "</div>\n     <div class=\"summary-text\">").concat(properties.address.lines.join(", ").capitalize(), "</div>\n     ").concat(getTypesIcons(properties), "\n     ").concat(getPhone(properties), "\n     ").concat(getOpeningHours(properties), "\n     ").concat(getCTA(properties), "\n     </div>");
};

exports.renderSummaryView = renderSummaryView;
},{"./config":"src/config.js","./images/icons/phone.svg":"src/images/icons/phone.svg"}],"src/images/photos/1.jpeg":[function(require,module,exports) {
module.exports = "/1.e8d71fd3.jpeg";
},{}],"src/images/photos/2.jpeg":[function(require,module,exports) {
module.exports = "/2.f859ec3f.jpeg";
},{}],"src/images/photos/3.jpeg":[function(require,module,exports) {
module.exports = "/3.eb676f18.jpeg";
},{}],"src/images/photos/4.jpeg":[function(require,module,exports) {
module.exports = "/4.ef1dfbc1.jpeg";
},{}],"src/images/photos/5.jpeg":[function(require,module,exports) {
module.exports = "/5.a188d12c.jpeg";
},{}],"src/images/photos/6.jpeg":[function(require,module,exports) {
module.exports = "/6.db2902a3.jpeg";
},{}],"src/images/photos/7.jpeg":[function(require,module,exports) {
module.exports = "/7.2e7dd2b0.jpeg";
},{}],"src/images/photos/8.jpeg":[function(require,module,exports) {
module.exports = "/8.25f86ca5.jpeg";
},{}],"src/images/icons/email.svg":[function(require,module,exports) {
module.exports = "/email.e729ba67.svg";
},{}],"src/fullView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPhoto = exports.renderFullView = void 0;

var _config = require("./config");

var _ = _interopRequireDefault(require("./images/photos/1.jpeg"));

var _2 = _interopRequireDefault(require("./images/photos/2.jpeg"));

var _3 = _interopRequireDefault(require("./images/photos/3.jpeg"));

var _4 = _interopRequireDefault(require("./images/photos/4.jpeg"));

var _5 = _interopRequireDefault(require("./images/photos/5.jpeg"));

var _6 = _interopRequireDefault(require("./images/photos/6.jpeg"));

var _7 = _interopRequireDefault(require("./images/photos/7.jpeg"));

var _8 = _interopRequireDefault(require("./images/photos/8.jpeg"));

var _phone = _interopRequireDefault(require("./images/icons/phone.svg"));

var _email = _interopRequireDefault(require("./images/icons/email.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store_photos = [_.default, _2.default, _3.default, _4.default, _5.default, _6.default, _7.default, _8.default];

var getTypesIcons = function getTypesIcons(properties) {
  if (properties.tags.length > 0) {
    var types = properties.tags.map(function (type) {
      var typeIcon = _config.tagsMapping.find(function (c) {
        return c.key === type;
      }).icon;

      return typeIcon ? "<div class=\"icon\"><img src=".concat(typeIcon, "></div>") : '';
    });
    return "<div class=\"summary-types\">".concat(types.join(""), "</div>");
  }

  return "";
};

var renderFullViewHeader = function renderFullViewHeader(properties) {
  var address = "".concat(properties.address.lines, ", ").concat(properties.address.city);
  var capabilities = getCapabilitiesElem(properties.tags);
  return "<div class=\"section-station-head\">\n            <h3 class=\"station-title\">".concat(address, "</h3>\n            <div>").concat(capabilities, "</div>\n            </div><hr class=\"separator\">");
};

var renderFullViewBody = function renderFullViewBody(properties) {
  var charging_points = properties.user_properties["charging_points"].map(function (charging_point, i) {
    var connectors = renderConnectors(charging_point);
    return "<div>".concat(connectors, "</div>");
  }).join("");
  return "<div class=\"section-station-body\">".concat(charging_points, "</div>");
};

var renderPhoto = function renderPhoto(properties) {
  var random = Math.floor(Math.random() * store_photos.length);
  return "<div class=\"store-photo\"><img src=\"".concat(store_photos[random], "\"></div>");
};

exports.renderPhoto = renderPhoto;

var getOpeningLabel = function getOpeningLabel(properties) {
  var openLabel = "Fermé";
  var openClass = "";

  function _dateIsToday(date) {
    var today = new Date();
    today = today.getUTCFullYear() + "-" + ("0" + (today.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + today.getUTCDate()).slice(-2);
    return today === date;
  }

  try {
    if (properties.open.open_now) {
      openLabel = "Ouvert";
      openClass = "opening-open";
    } else if (properties.open.next_opening) {
      if (_dateIsToday) {
        openLabel = "ouvre bientôt";
        openClass = "opening-soon";
      } else {
        openLabel += "Fermé";
        openClass = "opening-closed";
      }
    }

    if (openLabel !== "") {
      return "<span class='open-label ".concat(openClass, "'>").concat(openLabel, "</span>");
    } else return "";
  } catch (error) {
    return "";
  }
};

var getPhone = function getPhone(properties) {
  return properties.contact.phone ? "<div class='summary-phone'><div class=\"icon\"><img src=\"".concat(_phone.default, "\"></div><a href=\"tel:").concat(properties.contact.phone, "\" onClick=\"event.stopPropagation();\">").concat(properties.contact.phone, "</a></div>") : "";
};

var getEmail = function getEmail(properties) {
  return properties.contact.email ? "<div class='summary-phone'><div class=\"icon\"><img src=\"".concat(_email.default, "\"></div><a href=\"mailto:").concat(properties.contact.email, "\" onClick=\"event.stopPropagation();\">").concat(properties.contact.email, "</a></div>") : "";
};

function getContact(properties) {
  return "<div className='full-contact'><h3 className='summary-title'>Contacts</h3>".concat(getPhone(properties)).concat(getEmail(properties), "</div>");
}

function getFullSchedule(properties) {
  var today = new Date().toLocaleString('en-us', {
    weekday: 'long'
  });
  var weeklyOpening = properties.weekly_opening;
  var dayLabels = {
    1: "Lundi",
    2: "Mardi",
    3: "Mercredi}",
    4: "Jeudi",
    5: "Vendredi",
    6: "Samedi",
    7: "Dimanche"
  };
  var daysHoursHTMLTable = "";

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

      var currentDay = dayLabels[day] === today ? "current-day" : "";
      daysHoursHTMLTable += "<tr class='".concat(currentDay, "'><td style='padding-right:10px'>").concat(dayLabels[day], "</td><td>").concat(daysHours, "</td></tr>");
    }
  }

  return "<table class='hours-table'>".concat(daysHoursHTMLTable, "</table>");
}

function getOpeningHours(properties) {
  if (properties.weekly_opening) {
    return "<div class='full-hours'><h3 class='summary-title'>Horaires d'ouverture</h3>".concat(getFullSchedule(properties), "</div>");
  }

  return "";
}

var getCTA = function getCTA() {
  return "<div class=\"cta\">\n        <a href=\"https://www.kiloutou.fr/\" class=\"cta-button\" target=\"_blank\"\n           onClick=\"event.stopPropagation();\">\n            <span class=\"title\">Consulter la fiche</span></a>\n    </div>";
};

var renderFullView = function renderFullView(_ref) {
  var properties = _ref.properties;
  return "".concat(renderPhoto(properties), "\n     <div class=\"full-content\">\n     <div class=\"full-title\"><h2>").concat(properties.name.capitalize(), "</h2></div>\n     <div class=\"full-text\">").concat(properties.address.lines.join(", ").capitalize(), "</div>\n     ").concat(getTypesIcons(properties), "\n     ").concat(getOpeningHours(properties), "\n     ").concat(getContact(properties), "\n     ").concat(getCTA(properties), "\n     </div>");
};
/*
${getPhone(properties)}

 */


exports.renderFullView = renderFullView;
},{"./config":"src/config.js","./images/photos/1.jpeg":"src/images/photos/1.jpeg","./images/photos/2.jpeg":"src/images/photos/2.jpeg","./images/photos/3.jpeg":"src/images/photos/3.jpeg","./images/photos/4.jpeg":"src/images/photos/4.jpeg","./images/photos/5.jpeg":"src/images/photos/5.jpeg","./images/photos/6.jpeg":"src/images/photos/6.jpeg","./images/photos/7.jpeg":"src/images/photos/7.jpeg","./images/photos/8.jpeg":"src/images/photos/8.jpeg","./images/icons/phone.svg":"src/images/icons/phone.svg","./images/icons/email.svg":"src/images/icons/email.svg"}],"src/index.js":[function(require,module,exports) {
"use strict";

require("./styles.scss");

var _config = require("./config.js");

var _summaryView = require("./summaryView.js");

var _fullView = require("./fullView.js");

String.prototype.capitalize = function () {
  return this.toLowerCase().replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};

var loadWebApp = function loadWebApp() {
  var webapp = new WebApp("store-locator", _config.woosmapPublicKey);
  webapp.setFilterPanelRenderer(function (title, children) {
    var div = document.createElement("div");
    div.className = "filters";
    div.innerHTML += "<hr class=\"separator\">";
    div.innerHTML += "<div class='filters-group'>".concat(title, "</div>");
    children.forEach(function (item) {
      return div.appendChild(item);
    });
    return div;
  });
  webapp.setFilterRenderer(function (key, label, selected) {
    var div = document.createElement("div");
    var className = key;
    div.className = selected ? "active" : "";
    div.innerHTML = "<label class='filters-button'><input type=\"checkbox\"><span class=\"checkmark\"></span><div class='icon-service icon-".concat(className, "'></div><div style=\"height: 12px;\">").concat(label, "</div></label>");
    return div;
  });
  webapp.setFullStoreRenderer(function (store) {
    var myCustomContent = document.createElement("ul");
    myCustomContent.id = "myCustomContentID";
    myCustomContent.innerHTML = (0, _fullView.renderFullView)(store);
    return myCustomContent;
  });
  webapp.setSummaryStoreRenderer(function (store) {
    var mySummaryContent = document.createElement("div");
    mySummaryContent.className = "store-summary";
    mySummaryContent.innerHTML = (0, _summaryView.renderSummaryView)(store);
    return mySummaryContent;
  });
  webapp.setConf(_config.configLocator);
  var isMobile = document.querySelector("body").clientWidth < 750;
  webapp.render(isMobile);
};

loadWebApp();
},{"./styles.scss":"src/styles.scss","./config.js":"src/config.js","./summaryView.js":"src/summaryView.js","./fullView.js":"src/fullView.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50119" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map