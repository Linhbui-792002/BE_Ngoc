import SoilLayer from "../models/SoilLayer.js";
import Record from '../models/Record.js';
import Pile from "../models/Pile.js";

import { chialop, noiSuy, noiSuyRn } from "../common/lib/caculate.js";
import { getBByNameSand, getBOfPileLenght, getCPTValue } from "../common/lib/getValue.js";


const caculatePptk = async ({ id }) => {

    const record = await Record.findOne({ _id: id })
    const pileData = await Pile.findOne({ record: id })
    const soilData = await SoilLayer.find({ record: id })

    const hm = pileData.hm
    const pileLenght = (hm + pileData.cdtt)
    const a = pileData.a
    const Ap = a * a
    let Bi = 0
    const li = record.li
    let L
    let totalL = 0
    let result = []
    let arrLiCacl = []
    let totalPms = 0
    soilData.map((item, indexLi) => {
        L = indexLi == 0 ? item.L - hm : item.L

        let itemResult = {}
        let B = item.soilType === "Đất sét" ? item.B : getBByNameSand(item.soilName)
        Bi = item.soilType === "Đất set" ? item.B : getBOfPileLenght(item.soilName)

        const Li = chialop(L, li)

        Li.map((itemLi, index) => {
            totalL += itemLi
            const totalLiCheck = Math.round((Math.round(totalL * 100) / 100 - itemLi) * 100) / 100

            if (totalLiCheck < pileLenght) {
                arrLiCacl.push(itemLi)
                const arrTotalLi = arrLiCacl.slice(0, -1)

                const totalLi = arrTotalLi.reduce((accumulator, currentValue) => ((Math.round(accumulator * 100) / 100) + (Math.round(currentValue * 100) / 100)), 0);

                const avgD = arrTotalLi.length == 0 ? (hm + arrLiCacl[0] / 2) : (hm + totalLi + arrLiCacl[arrLiCacl.length - 1] / 2)

                const liResult = noiSuy(B, avgD)
                const liti = (liResult * itemLi)
                const Pms = (1.2 * liti / 1.4)
                if (!isNaN(liti)) {
                    totalPms += parseFloat(Pms);
                }

                itemResult["key"] = indexLi + 1;
                itemResult["landType"] = item.soilName + ", " + item.soilStatus;
                itemResult["li"] = itemLi;
                itemResult["_id"] = item._id
                itemResult["avgDepth"] = parseFloat(avgD).toFixed(3)
                itemResult["tau"] = !isNaN(liResult) ? parseFloat(liResult).toFixed(3) : "_"
                itemResult["liti"] = !isNaN(liti) ? parseFloat(liti).toFixed(3) : "_"
                itemResult["Pms"] = !isNaN(Pms) ? parseFloat(Pms).toFixed(3) : '_'

                result.push({ ...itemResult })

            }
        })


    })

    const Rn = noiSuyRn(Bi, pileLenght, soilData.find(item => item.L == L).soilType)
    const Pmui = ((Rn * Ap) / 1.4).toFixed(3)
    const Pgh = parseFloat(Pmui) + parseFloat(totalPms)
    return { statistical: result, Pmui, Pgh: parseFloat(Pgh).toFixed(3), totalPms: parseFloat(totalPms).toFixed(3) }

}

const caculateCPT = async ({ id }) => {

    const record = await Record.findOne({ _id: id })
    const pileData = await Pile.findOne({ record: id })
    const soilData = await SoilLayer.find({ record: id })
    const hm = pileData.hm

    const pileLenght = (hm + pileData.cdtt)
    const a = pileData.a
    const Ap = a * a
    const Uc = a * 4
    const li = record.li
    let L = 0
    let totalL = 0
    let result = []
    let arrLiCacl = []
    let totalPms = 0

    soilData.map((item, indexLi) => {
        L = indexLi == 0 ? item.L - hm : item.L
        let itemResult = {}

        const Li = chialop(L, li)
        Li.map((itemLi, index) => {
            totalL += itemLi
            if (Math.round(totalL * 100) / 100 <= pileLenght || Math.round((Math.round(totalL * 100) / 100 - itemLi) * 100) / 100 < pileLenght) {

                arrLiCacl.push(itemLi)

                const Qc = item.Qc
                const a = getCPTValue(Qc, item.soilType, 'a')
                const ti = getCPTValue(Qc, item.soilType, 'ti')
                let titt = Qc / a

                if (titt > ti) {
                    titt = ti
                }

                const liti = itemLi * titt
                const Pms = (Uc * liti / 2)


                if (!isNaN(liti)) {
                    totalPms += parseFloat(Pms);
                }

                itemResult["key"] = indexLi + 1;
                itemResult["landType"] = item.soilName + ", " + item.soilStatus + ` qc = ${item.Qc} kN/m²`;
                itemResult["li"] = itemLi;
                itemResult["_id"] = item._id
                itemResult["a"] = a
                itemResult["ti"] = !isNaN(ti) ? parseFloat(titt).toFixed(3) : "_"
                itemResult["liti"] = !isNaN(liti) ? parseFloat(liti).toFixed(3) : "_"
                itemResult["Pms"] = !isNaN(Pms) ? parseFloat(Pms).toFixed(3) : '_'

                result.push({ ...itemResult })
            }
        })

    })
    const Qcm = soilData.find(item => item.L == L).Qc
    const soilType = soilData.find(item => item.L == L).soilType
    const k = getCPTValue(Qcm, soilType, 'k')
    const Pmui = ((Qcm * Ap * k) / 2).toFixed(3)
    const Pgh = parseFloat(Pmui) + parseFloat(totalPms)
    return { DataCPT: result, Pmui, Pgh: parseFloat(Pgh).toFixed(3), totalPms: parseFloat(totalPms).toFixed(3) }
}


const caculateSPT = async ({ id }) => {

    const record = await Record.findOne({ _id: id })
    const pileData = await Pile.findOne({ record: id })
    const soilData = await SoilLayer.find({ record: id })
    const hm = pileData.hm
    const pileLenght = (hm + pileData.cdtt)
    const a = pileData.a
    const Ap = a * a

    const li = record.li

    const k2 = 2
    const k1 = 400

    let L
    let totalL = 0
    let result = []
    let arrLiCacl = []
    let totalPms = 0

    soilData.map((item, indexLi) => {
        L = indexLi == 0 ? item.L - hm : item.L
        let itemResult = {}

        const Li = chialop(L, li)
        Li.map((itemLi, index) => {
            totalL += itemLi
            if (Math.round(totalL * 100) / 100 <= pileLenght || Math.round((Math.round(totalL * 100) / 100 - itemLi) * 100) / 100 < pileLenght) {

                arrLiCacl.push(itemLi)

                const liN = itemLi * item.N

                const Pms = (k2 * itemLi * liN / 2.5)

                if (!isNaN(liN)) {
                    totalPms += parseFloat(Pms);
                }

                itemResult["key"] = indexLi + 1;
                itemResult["landType"] = item.soilName + ", " + item.soilStatus + ` N = ${item.N} `;
                itemResult["li"] = itemLi;
                itemResult["_id"] = item._id
                itemResult["liN"] = !isNaN(liN) ? parseFloat(liN).toFixed(3) : '_'
                itemResult["Pms"] = !isNaN(Pms) ? parseFloat(Pms).toFixed(3) : '_'

                result.push({ ...itemResult })
            }
        })

    })

    const Nm = soilData.find(item => item.L == L).N
    const Pmui = ((k1 * Ap * Nm) / 2).toFixed(3)
    const Pgh = parseFloat(Pmui) + parseFloat(totalPms)
    return { DataSPT: result, Pmui, Pgh: parseFloat(Pgh).toFixed(3), totalPms: parseFloat(totalPms).toFixed(3) }
}

export default {
    caculatePptk,
    caculateCPT,
    caculateSPT
}