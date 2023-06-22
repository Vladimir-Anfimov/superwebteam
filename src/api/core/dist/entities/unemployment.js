"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldValue = void 0;
function getFieldValue(object, field) {
    switch (field) {
        case "total":
            return object.total;
        case "females":
            return object.females;
        case "males":
            return object.males;
        case "paid":
            return object.paid;
        case "unpaid":
            return object.unpaid;
        case "unemployment_rate":
            return object.unemployment_rate;
        case "females_unemployment_rate":
            return object.females_unemployment_rate;
        case "males_unemployment_rate":
            return object.males_unemployment_rate;
        case "no_studies":
            return object.no_studies;
        case "primar":
            return object.primar;
        case "gimnazial":
            return object.gimnazial;
        case "highschool":
            return object.highschool;
        case "post_highschool":
            return object.post_highschool;
        case "professional":
            return object.professional;
        case "universitar":
            return object.universitar;
        case "between25_29":
            return object.between25_29;
        case "between30_39":
            return object.between30_39;
        case "between40_49":
            return object.between40_49;
        case "between50_55":
            return object.between50_55;
        case "over55":
            return object.over55;
        case "urban":
            return object.urban;
        case "rural":
            return object.rural;
        case "females_urban":
            return object.females_urban;
        case "females_rural":
            return object.females_rural;
        case "males_urban":
            return object.males_urban;
        case "males_rural":
            return object.males_rural;
    }
    return 0;
}
exports.getFieldValue = getFieldValue;
