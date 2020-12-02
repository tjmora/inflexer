import { off } from "process"
import * as pattern from "./patterns"
import Syllable from "./Syllable"


export default abstract class AbstractWord {

    value: Syllable[]
    
    constructor (word: string | Syllable[]) {
        this.value = typeof word === "string" ? this.syllabifier(word) : (word as Syllable[])
    }

    /**
     * Inhereting classes should implement copy() as follows:
     *     copy () {
     *         return new ChildClass(this.value.map(syllable => syllable.copy())) as this
     *     }
     */
    protected abstract copy (): this

    protected abstract syllabifier (word: string): Syllable[]

    protected abstract toString (): string

    protected abstract specialMarkPlacer (): string

    inflect (inflexp: string) {
        let groups = inflexp.match(pattern.inflexp)?.groups!
        let precedence = [AbstractWord._repeat, AbstractWord._infix, AbstractWord._prefix, AbstractWord._suffix]
        let result = this.copy()
        if (groups.precedence !== undefined) {
            precedence = [];
            [...groups!.precedence].forEach((ch) => {
                switch (ch) {
                    case "r":
                        precedence.push(AbstractWord._repeat)
                        break
                    case "i":
                        precedence.push(AbstractWord._infix)
                        break
                    case "p":
                        precedence.push(AbstractWord._prefix)
                        break
                    case "s":
                        precedence.push(AbstractWord._suffix)
                        break
                    default:
                }
            })
        }
        precedence.forEach(fn => fn(result, groups))
        return result
    }

    static _repeat (word: AbstractWord, groups: {[key:string]: string}) {
        if (groups.rightwardRepetitionFirst !== undefined || groups.leftwardRepetitionFirst !== undefined) {
            let result: Syllable[] = []
            let repetitionInflexp = groups.rightwardRepetitionFirst !== undefined
                ? groups.rightwardRepetitionFirst + groups.rightwardRepetitionRest
                : groups.leftwardRepetitionFirst + groups.leftwardRepetitionRest
            let i = groups.rightwardRepetitionFirst !== undefined 
                ? 0
                : word.value.length - (repetitionInflexp.match(/\:/g) || []).length - 1

            if (i > 0)
                result.push(...word.value.slice(0, i).map(syll => syll.copy()))

            repetitionInflexp.split(":").forEach((subinflexp) => {
                let j = 0
                let k = groups.rightwardRepetitionFirst !== undefined 
                    ? 0
                    : ((subinflexp).match(/,/g) || []).length * -1
                let orig_k = k
                let r: Syllable[] = []
                let placeAfter = 0
                if (subinflexp !== "") {
                    r.push(new Syllable())
                    let subgroups = groups.rightwardRepetitionFirst !== undefined
                        ? subinflexp.match(pattern.rightwardRepetition)!.groups!
                        : subinflexp.match(pattern.leftwardRepetition)!.groups!
                    placeAfter = groups.rightwardRepetitionFirst !== undefined
                        ? subgroups.placeAfter !== undefined && subgroups.placeAfter !== ""
                            ? 1
                            : 0
                        : subgroups.placeBefore !== undefined && subgroups.placeBefore !== ""
                            ? 0
                            : 1;
                    (subgroups.first+subgroups.rest).split(",").forEach((s) => {
                        if (j > 0)
                            r.push(new Syllable())
                        let subsubgroups = s.match(pattern.syllableRepeat)!.groups!;
                        (subsubgroups.specialsBefore + subsubgroups.specialsAfter).split("").forEach((ch, h) => {
                            if (h % 2 === 1)
                                return
                            switch (ch) {
                                case "$":
                                    r[j].stress = word.value[i+k].stress
                                    break
                                case "%":
                                    r[j].vowelLength = word.value[i+k].vowelLength
                                    break
                                case "@":
                                    r[j].tone = word.value[i+k].tone
                                    break
                            }
                        });
                        if (subsubgroups.main !== "") {
                            let temp: string | undefined = ""
                            if (subsubgroups.main.search("1") > -1 || subsubgroups.main === "*" || subsubgroups.main === "***") {
                                r[j].onset = word.value[i+k].onset.map(ch => ch)
                            }
                            else if (subsubgroups.main.search("2") > -1) {
                                if (word.value[i+k].hasOnset())
                                    r[j].onset.push(word.value[i+k].onset[0])
                            }
                            else if (subsubgroups.main.search("3") > -1) {
                                let l = word.value[i+k].onset.length
                                if (l > 0)
                                    r[j].onset.push(word.value[i+k].onset[l - 1])
                            }
                            if (subsubgroups.main.search("4") > -1 || subsubgroups.main.includes("*")) {
                                r[j].nucleus = word.value[i+k].nucleus.map(ch => ch)
                            }
                            else if (subsubgroups.main.search("5") > -1) {
                                if (word.value[i+k].hasNucleus())
                                    r[j].nucleus.push(word.value[i+k].nucleus[0])
                            }
                            else if (subsubgroups.main.search("6") > -1) {
                                let l = word.value[i+k].nucleus.length
                                if (l > 0)
                                    r[j].nucleus.push(word.value[i+k].nucleus[l - 1])
                            }
                            if (subsubgroups.main.search("7") > -1 || subsubgroups.main === "**" || subsubgroups.main === "***") {
                                r[j].coda = word.value[i+k].coda.map(ch => ch)
                            }
                            else if (subsubgroups.main.search("8") > -1) {
                                if (word.value[i+k].hasCoda())
                                    r[j].coda.push(word.value[i+k].coda[0])
                            }
                            else if (subsubgroups.main.search("9") > -1) {
                                let l = word.value[i+k].coda.length
                                if (l > 0)
                                    r[j].coda.push(word.value[i+k].coda[l - 1])
                            }
                        }
                        j++
                        k++
                    })
                    j--
                    if (subgroups.duplicator !== undefined && subgroups.duplicator !== "") {
                        let orig = r.map(syll => syll.copy())
                        let q = subgroups.duplicator.length
                        for (let p = 0; p < q; p++)
                            r.push(...orig.map(syll => syll.copy()))
                        j += q
                    }
                    if (subgroups.specialMarkBefore !== undefined && subgroups.specialMarkBefore !== "")
                        r[0].premark = word.specialMarkPlacer()
                    if (subgroups.magnetBefore !== "") {
                        subgroups.magnetBefore.split("~").slice(1).forEach((special) => {
                            try {
                                switch (special) {
                                    case "":
                                        let popped = placeAfter === 0
                                            ? result[result.length - 1].coda.pop()
                                            : word.value[i].coda.pop()
                                        if (popped !== undefined)
                                            r[0].onset.unshift(popped)
                                        break
                                    case "$":
                                        if (placeAfter === 0) {
                                            r[0].stress = result[result.length - 1].stress
                                            result[result.length - 1].stress = 0
                                        }
                                        else {
                                            r[0].stress = word.value[i].stress
                                            word.value[i].stress = 0
                                        }
                                        break
                                    case "%":
                                        if (placeAfter === 0) {
                                            r[0].vowelLength = result[result.length - 1].vowelLength
                                            result[result.length - 1].vowelLength = 8
                                        }
                                        else {
                                            r[0].vowelLength = word.value[i].vowelLength
                                            word.value[i].vowelLength = 8
                                        }
                                        break
                                    case "@":
                                        if (placeAfter === 0) {
                                            r[0].tone = result[result.length - 1].tone
                                            result[result.length - 1].tone = 0
                                        }
                                        else {
                                            r[0].tone = word.value[i].tone
                                            word.value[i].tone = 0
                                        }
                                        break
                                    default:
                                }
                            }
                            catch (e) {
                                throw new Error("Inflexp Magnet Error: ~" + special + " (from " + subgroups.magnetBefore + ") failed to take sounds from the earlier syllable.")
                            }
                        })
                    }
                    if (subgroups.magnetAfter !== "") {
                        subgroups.magnetAfter.split("~").slice(1).forEach((special) => {
                            try {
                                switch (special) {
                                    case "":
                                        let shifted = word.value[i + placeAfter].onset.shift()
                                        if (shifted !== undefined)
                                            r[j].coda.push(shifted)
                                        break
                                    case "$":
                                        r[j].stress = word.value[i + placeAfter].stress
                                        word.value[i + placeAfter].stress = 0
                                        break
                                    case "%":
                                        r[j].vowelLength = word.value[i + placeAfter].vowelLength
                                        word.value[i + placeAfter].vowelLength = 8
                                        break
                                    case "@":
                                        r[j].tone = word.value[i + placeAfter].tone
                                        word.value[i + placeAfter].tone = 0
                                        break
                                    default:
                                }
                            }
                            catch (e) {
                                throw new Error("Inflexp Magnet Error: ~" + special + " (from " + subgroups.magnetAfter + ") failed to take sounds from the next syllable.")
                            }
                        })
                    }
                    if (subgroups.specialMarkAfter !== undefined && subgroups.specialMarkAfter !== "")
                        r[j].postmark = word.specialMarkPlacer()
                }
                if (r.length > 0 && placeAfter === 0) {
                    result.push(...r)
                    result.push(word.value[i].copy())
                }
                else if (r.length > 0 && placeAfter === 1)
                    result.push(word.value[i].copy(), ...r)
                else
                    result.push(word.value[i].copy())
                i++
            })
            if (i < word.value.length)
                result.push(...word.value.slice(i).map(syll => syll.copy()))
            word.value = result
        }
        else if (groups.baseRepetition !== undefined) {
            let orig = word.value.map(syll => syll.copy())
            groups.baseRepetition.match(pattern.baseRepetition)?.forEach((subinflexp) => {
                let cpy = orig.map(syll => syll.copy())
                let willUnshift = false
                for (let p = 0, q = (groups.baseRepetition!.match(/\+/g) || []).length; p < q; p++)
                    cpy.push(...cpy.map(syll => syll.copy()))
                if (subinflexp.endsWith("=")) {
                    cpy[cpy.length - 1].postmark = word.specialMarkPlacer()
                    willUnshift = true
                }
                if (subinflexp.startsWith("="))
                    cpy[0].premark = word.specialMarkPlacer()
                if (willUnshift)
                    word.value.unshift(...cpy)
                else
                    word.value.push(...cpy)
            })
        }
    }

    static _infix (word: AbstractWord, groups: {[key:string]: string}) {
        if (groups.rightwardInfix !== undefined || groups.leftwardInfix !== undefined) {
            let rightward = groups.rightwardInfix !== undefined
            let subgroups = rightward 
                    ? groups.rightwardInfix.match(pattern.rightwardInfix)!.groups!
                    : groups.leftwardInfix.match(pattern.leftwardInfix)!.groups!
            let infx: Syllable[] = []
            let cs = subgroups.content.replace(/(~(\$|%|@)?)+/g, "").split(".")
            cs.forEach((str, i) => {
                if (str !== "" || (rightward && i > 0) || (!rightward && i < (cs.length - 1)))
                    infx.push(...word.syllabifier(str))
                else
                    infx.push(new Syllable())
            })
            let len = infx.length
            let offset = rightward 
                    ? subgroups.offset.length
                    : word.value.length - 1 - subgroups.offset.length
            let digit = rightward 
                    ? parseInt(subgroups.after)
                    : parseInt(subgroups.before)
            let latter = word.value.slice(offset + 1).map(syll => syll.copy())
            word.value.splice(offset + 1, word.value.length)
            if (rightward) {
                switch (digit) {
                    case 1:
                    case 3:
                        latter.unshift(word.value.pop()!)
                        word.value.push(new Syllable(latter[0].onset))
                        len++
                        latter[0].onset = []
                        break
                    case 2:
                        latter.unshift(word.value.pop()!)
                        word.value.push(new Syllable([latter[0].onset.shift()!]))
                        len++
                        break
                    case 4:
                    case 6:
                        latter.unshift(new Syllable([], [], word.value[offset].coda))
                        len++
                        word.value[offset].coda = []
                        break
                    case 5:
                        latter.unshift(new Syllable([], word.value[offset].nucleus, word.value[offset].coda))
                        len++
                        word.value[offset].nucleus = [latter[0].nucleus.shift()!]
                        word.value[offset].coda = []
                        break
                    case 7:
                    case 9:
                        // do nothing
                        break
                    case 8:
                        latter.unshift(new Syllable([], [], word.value[offset].coda.slice(1)))
                        len++
                        word.value[offset].coda.splice(1, word.value[offset].coda.length)
                        break
                    default:
                }
            } else {
                switch (digit) {
                    case 9:
                        latter.unshift(new Syllable([], [], [word.value[offset].coda.pop()!]))
                        len++
                        break
                    case 8:
                    case 7:
                        latter.unshift(new Syllable([], [], word.value[offset].coda))
                        len++
                        word.value[offset].coda = []
                        break
                    case 6:
                        latter.unshift(new Syllable([], [word.value[offset].nucleus.pop()!], word.value[offset].coda))
                        len++
                        word.value[offset].coda = []
                        break
                    case 5:
                    case 4:
                        latter.unshift(word.value.pop()!)
                        word.value.push(new Syllable(latter[0].onset))
                        len++
                        latter[0].onset = []
                        break
                    case 3:
                        latter.unshift(word.value.pop()!)
                        word.value.push(new Syllable(latter[0].onset))
                        latter[0].onset = [word.value[offset].onset.pop()!]
                        len++
                        break
                    case 2:
                    case 1:
                        // do nothing
                        break
                    default:
                }
            }
            word.value.push(...infx)
            if (word.value[offset].hasOnset() && !word.value[offset].hasNucleus()) {
                if (infx[0].hasOnset()) {
                    if (subgroups.drop === "!" && !rightward)
                        word.value[offset].onset.pop()
                    else if ((subgroups.drop === "!!" || subgroups.drop === "!!!") && !rightward)
                        word.value[offset].onset = []
                    word.value[offset].onset.push(...infx[0].onset)
                    word.value[offset + 1].onset = []
                }
                if (infx[0].hasNucleus()) {
                    word.value[offset].nucleus = infx[0].nucleus
                    word.value[offset].stress= infx[0].stress
                    word.value[offset].vowelLength = infx[0].vowelLength
                    word.value[offset].tone = infx[0].tone
                    word.value[offset + 1].nucleus = []
                }
                if (infx[0].hasCoda())
                    word.value[offset].coda = infx[0].coda
            }
            else if (word.value[offset].hasNucleus() && !word.value[offset].hasCoda()) {
                if (infx[0].hasOnset()) {
                    word.value[offset].coda = infx[0].onset
                    word.value[offset + 1].onset = []
                }
                else if (infx[0].hasNucleus()) {
                    if (subgroups.drop === "!" && !rightward)
                        word.value[offset].nucleus.pop()
                    else if (subgroups.drop === "!!" && !rightward)
                        word.value[offset].nucleus = []
                    else if (subgroups.drop === "!!!" && !rightward) {
                        word.value[offset].onset = []
                        word.value[offset].nucleus = []
                    }
                    word.value[offset].nucleus.push(...infx[0].nucleus)
                    word.value[offset + 1].nucleus = []
                    if (infx[0].hasCoda())
                        word.value[offset].coda = infx[0].coda
                }
                else if (infx[0].hasCoda()) {
                    word.value[offset].coda = infx[0].coda
                }
            }
            else if (word.value[offset].hasCoda()) {
                if (infx[0].hasOnset() && rightward) {
                    word.value[offset].coda.push(...infx[0].onset)
                    word.value[offset + 1].onset = []
                }
                else if (!infx[0].hasNucleus() && infx[0].hasCoda()) {
                    if (subgroups.drop === "!" && !rightward)
                        word.value[offset].coda.pop()
                    else if (subgroups.drop === "!!" && !rightward)
                        word.value[offset].coda = []
                    else if (subgroups.drop === "!!!" && !rightward) {
                        word.value[offset].onset = []
                        word.value[offset].nucleus = []
                        word.value[offset].coda = []
                    }
                    word.value[offset].coda.push(...infx[0].coda)
                }
            }
            if (!word.value[offset + 1].hasNucleus()) {
                word.value.splice(offset + 1, 1)
                len--
            }
            let end = word.value.length - 1
            if (word.value[end].hasOnset() && !word.value[end].hasNucleus()) {
                if (latter[0].hasOnset()) {
                    if (subgroups.drop === "" || !rightward)
                        word.value[end].onset.push(...latter[0].onset)
                    else if (subgroups.drop === "!" && rightward)
                        word.value[end].onset.push(...latter[0].onset.slice(1))
                    latter[0].onset = []
                }
                if (latter[0].hasNucleus()) {
                    if (subgroups.drop !== "!!!" || !rightward) {
                        word.value[end].nucleus = latter[0].nucleus
                        word.value[end].stress= latter[0].stress
                        word.value[end].vowelLength = latter[0].vowelLength
                        word.value[end].tone = latter[0].tone
                    }
                    latter[0].nucleus = []
                }
                if (latter[0].hasCoda() && (subgroups.drop !== "!!!" || !rightward))
                    word.value[end].coda = latter[0].coda
            }
            else if (word.value[end].hasNucleus() && !word.value[end].hasCoda()) {
                if (!latter[0].hasOnset() && latter[0].hasNucleus()) {
                    if (subgroups.drop === "" || !rightward)
                        word.value[end].nucleus.push(...latter[0].nucleus)
                    else if (subgroups.drop === "!" && rightward)
                        word.value[end].nucleus.push(...latter[0].nucleus.slice(1))
                    word.value[end].stress= latter[0].stress
                    word.value[end].vowelLength = latter[0].vowelLength
                    word.value[end].tone = latter[0].tone
                    latter[0].nucleus = []
                    if (latter[0].hasCoda() && (subgroups.drop !== "!!!" || !rightward))
                        word.value[end].coda = latter[0].coda
                }
                else if (!latter[0].hasOnset() && latter[0].hasCoda()) {
                    if (subgroups.drop !== "!!!" || !rightward)
                        word.value[end].coda = latter[0].coda
                }
            }
            else if (word.value[end].hasCoda() && !latter[0].hasNucleus() && latter[0].hasCoda()) {
                if (subgroups.drop === "" || !rightward)
                    word.value[end].coda.push(...latter[0].coda)
                else if (subgroups.drop === "!" && rightward)
                    word.value[end].coda.push(...latter[0].coda.slice(1))
            }
            if (!latter[0].hasNucleus()) {
                latter.shift()
                len--
            }
            word.value.push(...latter)
            subgroups.content.split(".").forEach((subinflexp, i) => {
                let j = offset + i
                if (digit > 6 && !infx[0].hasOnset() && infx[0].hasNucleus())
                    j++
                let s = subinflexp.match(pattern.rightwardInfixContent)!.groups!
                if (s.magnetBefore !== "") {
                    s.magnetBefore.split("~").slice(1).forEach((special) => {
                        try {
                            switch (special) {
                                case "":
                                    if (word.value[j - 1].hasCoda())
                                        word.value[j].onset.unshift(word.value[j - 1].coda.pop()!)
                                    break
                                case "$":
                                    word.value[j].stress = word.value[j- 1].stress
                                    word.value[j - 1].stress = 0
                                    break
                                case "%":
                                    word.value[j].vowelLength = word.value[j - 1].vowelLength
                                    word.value[j - 1].vowelLength = 8
                                    break
                                case "@":
                                    word.value[j].tone = word.value[j - 1].tone
                                    word.value[j - 1].tone = 0
                                    break
                                default:
                            }
                        }
                        catch (e) {
                            throw new Error("Inflexp Magnet Error: ~" + special + " (from " + s.magnetBefore + ") failed to take sounds from the earlier syllable.")
                        }
                    })
                }
                if (s.magnetAfter !== "") {
                    s.magnetAfter.split("~").slice(1).forEach((special) => {
                        try {
                            switch (special) {
                                case "":
                                    if (word.value[j + len].hasOnset())
                                        word.value[j + len - 1].coda.push(word.value[j + len].onset.shift()!)
                                    break
                                case "$":
                                    word.value[j + len - 1].stress = word.value[j + len].stress
                                    word.value[j + len].stress = 0
                                    break
                                case "%":
                                    word.value[j + len - 1].vowelLength = word.value[j + len].vowelLength
                                    word.value[j + len].vowelLength = 8
                                    break
                                case "@":
                                    word.value[j + len - 1].tone = word.value[j + len].tone
                                    word.value[j + len].tone = 0
                                    break
                                default:
                            }
                        }
                        catch (e) {
                            throw new Error("Inflexp Magnet Error: ~" + special + " (from " + s.magnetAfter + ") failed to take sounds from the next syllable.")
                        }
                    })
                }
            })
        }
    }

    static _prefix (word: AbstractWord, groups: {[key:string]: string}) {
        if (groups.prefix !== undefined) {
            let prefx = word.syllabifier(groups.prefix),
                n = prefx.length;
            if (n > 0)
                word.value.unshift(...prefx)
            let i = n
            if (groups.prefixMark !== "")
                word.value[n - 1].postmark = word.specialMarkPlacer()
            groups.prefixPush.split(".").forEach((subinflexp, j) => {
                if (j === 0)
                    return
                let subgroups = subinflexp.match(pattern.prefixPush)!.groups!

                if (subgroups.main !== "") {
                    let p = word.syllabifier(subgroups.main)[0]
                    if (p.hasCoda()) {
                        word.value[i].onset = p.onset
                        word.value[i].nucleus = p.nucleus
                        switch (subgroups.drop.length) {
                            case 0:
                                word.value[i].coda.unshift(...p.coda)
                                break
                            case 1:
                                word.value[i].coda.shift()
                                word.value[i].coda.unshift(...p.coda)
                                break
                            case 2:
                                word.value[i].coda = p.coda
                                break
                            default:
                                word.value[i] = new Syllable()
                                word.value[i].coda = p.coda
                        }
                    }
                    else if (p.hasNucleus()) {
                        word.value[i].onset = p.onset
                        switch (subgroups.drop.length) {
                            case 0:
                                word.value[i].nucleus.unshift(...p.nucleus)
                                break
                            case 1:
                                word.value[i].nucleus.shift()
                                word.value[i].nucleus.unshift(...p.nucleus)
                                break
                            case 2:
                                word.value[i].nucleus = p.nucleus
                                break
                            default:
                                word.value[i] = new Syllable()
                                word.value[i].nucleus = p.nucleus

                        }
                    }
                    else if (p.hasOnset()) {
                        switch (subgroups.drop.length) {
                            case 0:
                                word.value[i].onset.unshift(...p.onset)
                                break
                            case 1:
                                word.value[i].onset.shift()
                                word.value[i].onset.unshift(...p.onset)
                                break
                            case 2:
                                word.value[i].onset = p.onset
                                break
                            default:
                                word.value[i] = new Syllable
                                word.value[i].onset = p.onset
                        }
                    }
                }
                else {
                    switch (subgroups.drop.length) {
                        case 1:
                            word.value[i].onset.shift()
                            break
                        case 2:
                            word.value[i].onset = []
                            break
                        case 3:
                            word.value[i] = new Syllable()
                            break
                        default:
                    }
                }

                let s = subgroups.specials.match(/\$(?<digits>[0-9]{1,2})/i)?.groups!
                if (s !== undefined && s.digits !== undefined)
                    word.value[i].stress = parseInt(s.digits)
                let vl = subgroups.specials.match(/%(?<digits>[0-9]{1,2})/i)?.groups!
                if (vl !== undefined && vl.digits !== undefined)
                    word.value[i].vowelLength = parseInt(vl.digits)
                let t = subgroups.specials.match(/@(?<digits>[0-9]{1,2})/i)?.groups!
                if (t !== undefined && t.digits !== undefined)
                    word.value[i].tone = parseInt(t.digits) 
                if (subgroups.specialMark !== "")
                    word.value[i].postmark = word.specialMarkPlacer()
                i++
            })
            if (groups.prefixMagnet !== "") {
                groups.prefixMagnet.split("~").slice(1).forEach((special) => {
                    try {
                        switch (special) {
                            case "":
                                let popped = word.value[n].onset.pop()
                                if (popped !== undefined)
                                    word.value[n - 1].coda.push(popped)
                                break
                            case "$":
                                word.value[n - 1].stress = word.value[n].stress
                                word.value[n].stress = 0
                                break
                            case "%":
                                word.value[n - 1].vowelLength = word.value[n].vowelLength
                                word.value[n].vowelLength = 8
                                break
                            case "@":
                                word.value[n - 1].tone = word.value[n].tone
                                word.value[n].tone = 0
                                break
                            default:
                        }
                    }
                    catch (e) {
                        throw new Error("Inflexp Magnet Error: ~" + special + " (from " + groups.prefixMagnet + ") failed to take sounds from the next syllable.")
                    }
                })
            }
        }
    }

    static _suffix (word: AbstractWord, groups: {[key:string]: string}) {
        if (groups.suffix !== undefined) {
            let l = word.value.length,
                sufx = word.syllabifier(groups.suffix),
                n = sufx.length;
            if (n > 0)
                word.value.push(...sufx)
            if (groups.suffixMark !== "")
                word.value[l].premark = word.specialMarkPlacer()
            let i = l - 1
            groups.suffixPush.split(".").reverse().forEach((subinflexp, j) => {
                if (j === 0)
                    return
                let subgroups = subinflexp.match(pattern.suffixPush)!.groups!
                if (subgroups.main !== "") {
                    let s = word.syllabifier(subgroups.main)[0]
                    if (s.hasOnset() && s.hasNucleus()) {
                        word.value[i].coda = s.coda
                        word.value[i].nucleus = s.nucleus
                        switch (subgroups.drop.length) {
                            case 0:
                                word.value[i].onset.push(...s.onset)
                                break
                            case 1:
                                word.value[i].onset.pop()
                                word.value[i].onset.push(...s.onset)
                                break
                            case 2:
                                word.value[i].onset = s.onset
                                break
                            default:
                                word.value[i] = new Syllable()
                                word.value[i].onset = s.onset
                        }
                    }
                    else if (s.hasNucleus()) {
                        word.value[i].coda = s.coda
                        switch (subgroups.drop.length) {
                            case 0:
                                word.value[i].nucleus.push(...s.nucleus)
                                break
                            case 1:
                                word.value[i].nucleus.pop()
                                word.value[i].nucleus.push(...s.nucleus)
                                break
                            case 2:
                                word.value[i].nucleus = s.nucleus
                                break
                            default:
                                word.value[i] = new Syllable()
                                word.value[i].nucleus = s.nucleus
                        }
                    }
                    else if (s.hasOnset() && !s.hasNucleus()) { // s.onset is actually a coda in this case
                        switch (subgroups.drop.length) {
                            case 0:
                                word.value[i].coda.push(...s.onset)
                                break
                            case 1:
                                word.value[i].coda.pop()
                                word.value[i].coda.push(...s.onset)
                                break
                            case 2:
                                word.value[i].coda = s.onset
                                break
                            default:
                                word.value[i] = new Syllable()
                                word.value[i].coda = s.onset
                        }
                    }
                }
                else {
                    switch (subgroups.drop.length) {
                        case 1:
                            word.value[i].coda.pop()
                            break
                        case 2:
                            word.value[i].coda = []
                            break
                        case 3:
                            word.value[i] = new Syllable()
                            break
                        default:
                    }
                }

                let s = subgroups.specials.match(/\$(?<digits>[0-9]{1,2})/i)?.groups!
                if (s !== undefined && s.digits !== undefined)
                    word.value[i].stress = parseInt(s.digits)
                let vl = subgroups.specials.match(/%(?<digits>[0-9]{1,2})/i)?.groups!
                if (vl !== undefined && vl.digits !== undefined)
                    word.value[i].vowelLength = parseInt(vl.digits)
                let t = subgroups.specials.match(/@(?<digits>[0-9]{1,2})/i)?.groups!
                if (t !== undefined && t.digits !== undefined)
                    word.value[i].tone = parseInt(t.digits) 
                if (subgroups.specialMark !== "")
                    word.value[i].premark = word.specialMarkPlacer()
                i--
            })
            if (groups.suffixMagnet !== "") {
                groups.suffixMagnet.split("~").slice(1).forEach((special) => {
                    try {
                        switch (special) {
                            case "":
                                let popped = word.value[l - 1].coda.pop()
                                if (popped !== undefined)
                                    word.value[l].onset.push(popped)
                                break
                            case "$":
                                word.value[l].stress = word.value[l - 1].stress
                                word.value[l - 1].stress = 0
                                break
                            case "%":
                                word.value[l].vowelLength = word.value[l - 1].vowelLength
                                word.value[l - 1].vowelLength = 8
                                break
                            case "@":
                                word.value[l].tone = word.value[l - 1].tone
                                word.value[l - 1].tone = 0
                                break
                            default:
                        }
                    }
                    catch (e) {
                        throw new Error("Inflexp Magnet Error: ~" + special + " (from " + groups.suffixMagnet + ") failed to take sounds from the next syllable.")
                    }
                })
            }
        }
    }

}

