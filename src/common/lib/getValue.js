import { CAT_BUI, CAT_NHO, CAT_TO, CAT_VUA, DATA_CPT, DATA_RA, DATA_TAU, HAT_NHO, HAT_THO, SOI } from "../constan/api-nen-mong.js";
export const getValueDataRa = ({ L, B, type }, data) => {
    let result = data?.[L]?.[B]?.[type] || data?.[L]?.[B];
    return result;
}

export const getValueDataTau = (L, B) => {
    return DATA_TAU?.[L]?.[B]
}

export const getBByNameSand = (value) => {
    if (HAT_THO.includes(value)) {
        return 0.2
    } else if (HAT_NHO.includes(value)) {
        return 0.3
    } else { return 0.4 }
}

export const getBOfPileLenght = (value) => {
    if (SOI.includes(value)) {
        return 0
    } else if (CAT_TO.includes(value)) {
        return 0.1
    } else if (CAT_VUA == value) {
        return 0.3
    } else if (CAT_NHO == value) {
        return 0.4
    } else if (CAT_BUI == value) {
        return 0.5
    }
    return 0
}

export const getLValues = (lenght, Arr) => {
    let L1, L2;
    let keys = Object.keys(Arr);
    for (let i = 0; i < keys.length - 1; i++) {
        let key1 = parseFloat(keys[i]);
        let key2 = parseFloat(keys[i + 1]);

        if (lenght >= key1 && lenght <= key2) {
            L1 = key1;
            L2 = key2;
            break;
        }
    }

    return { L1, L2 };
}

export const getRnValue = (pileLength, B, soilType) => {
    const type = soilType === "Đất sét" ? 0 : 1;
    let result = DATA_RA?.[pileLength]?.[B]?.[type];
    if (result === undefined) {
        result = DATA_RA?.[pileLength]?.[B];
    }
    return result;
}

export const getCPTValue = (Qc, soilType, parameter) => {
    const matchedItem = DATA_CPT.find(item => soilType === item.soilType);

    if (matchedItem) {
        const itemC = matchedItem.c.find(itemC =>
            (itemC.QcFrom === null && Qc > itemC.QcTo) ||
            (Qc >= itemC.QcTo && Qc <= itemC.QcFrom)
        );

        const value = itemC ? itemC.value[parameter][1] : undefined;

        return value
    }
};