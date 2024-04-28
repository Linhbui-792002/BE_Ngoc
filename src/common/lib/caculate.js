import { DATA_RA, DATA_TAU } from "../constan/api-nen-mong.js";
import { getLValues, getRnValue, getValueDataTau } from "./getValue.js";

export const chialop = (L, li) => {
    const numOfClasses = Math.ceil(L / li);
    const result = Array(numOfClasses).fill(li).map((val, index) => index === numOfClasses - 1 ? Math.round((L % li) * 10) / 10 || li : val);
    return result.reverse();
}

export const noiSuy = (B, avgD) => {
    if (B > 1) return 0
    const { L1, L2 } = getLValues(avgD, DATA_TAU)
    const B1 = Math.floor(B * 10) / 10
    const B2 = Math.ceil(B * 10) / 10
    const a = getValueDataTau(L1, B1)
    const b = getValueDataTau(L1, B2)
    const c = getValueDataTau(L2, B1)
    const d = getValueDataTau(L2, B2)

    const Y1 = B2 != B1 ? a + ((B - B1) * (b - a)) / (B2 - B1) : getValueDataTau(L1, B)
    const Y2 = B2 != B1 ? c + ((B - B1) * (d - c)) / (B2 - B1) : getValueDataTau(L2, B)

    return (Y1 + ((avgD - L1) * (Y2 - Y1)) / (L2 - L1)).toFixed(3) || 0
}

export const noiSuyRn = (B, pileLength, soilType) => {
    if (B > 0.6) return 0

    const { L1, L2 } = getLValues(pileLength, DATA_RA)

    const B1 = Math.floor(B * 10) / 10
    const B2 = Math.ceil(B * 10) / 10

    const a = getRnValue(L1, B1, soilType)
    const b = getRnValue(L1, B2, soilType)
    const c = getRnValue(L2, B1, soilType)
    const d = getRnValue(L2, B2, soilType)

    const Y1 = B2 != B1 ? a + ((B - B1) * (b - a)) / (B2 - B1) : getRnValue(L1, B, soilType)
    const Y2 = B2 != B1 ? c + ((B - B1) * (d - c)) / (B2 - B1) : getRnValue(L2, B, soilType)

    return (Y1 + ((pileLength - L1) * (Y2 - Y1)) / (L2 - L1)).toFixed(3) || 0
}