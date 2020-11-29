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
                                if (word.value[i+k].onset.length > 0)
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
                                if (word.value[i+k].nucleus.length > 0)
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
                                if (word.value[i+k].coda.length > 0)
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
        if (groups.rightwardInfix !== undefined) {
            let subgroups = groups.rightwardInfix.match(pattern.rightwardInfix)!.groups!
            let offset = subgroups.offset.length
            let after = parseInt(subgroups.after)
            let p: Syllable[] = []
            subgroups.content.replace(/(~(\$|%|@)?)+/g, "").split(".").forEach((str, i) => {
                if (i > 0 || str !== "")
                    p.push(...word.syllabifier(str))
                else
                    p.push(new Syllable())
            })
            let len = p.length

            switch (subgroups.drop.length) {
                case 0:
                    break
                case 1:
                    if (p[len - 1].hasCoda()) {
                        if (after < 7 && (after !== 5 || word.value[offset].nucleus.length < 2))
                            word.value[offset].coda.shift()
                        else if (after === 8 && word.value[offset].coda.length > 1)
                            word.value[offset].coda.splice(1, 1)
                    }
                    else if (p[len - 1].nucleus.length > 0) {
                        if (after < 4 && (after !== 2 || word.value[offset].onset.length < 2))
                            word.value[offset].nucleus.shift()
                        else if (after === 5 && word.value[offset].nucleus.length > 1)
                            word.value[offset].nucleus.splice(1, 1)
                    }
                    else if (after === 2 && word.value[offset].onset.length > 1) {
                        word.value[offset].onset.splice(1, 1)
                    }
                    break
                case 2:
                    if (p[len - 1].hasCoda()) {
                        if (after < 7 && (after !== 5 || word.value[offset].nucleus.length < 2))
                            word.value[offset].coda = []
                        else if (after === 8 && word.value[offset].coda.length > 1)
                            word.value[offset].coda.splice(1, word.value[offset].coda.length)
                    }
                    else if (p[len - 1].nucleus.length > 0) {
                        if (after < 4 && (after !== 2 || word.value[offset].onset.length < 2))
                            word.value[offset].nucleus = []
                        else if (after === 5 && word.value[offset].nucleus.length > 1)
                            word.value[offset].nucleus.splice(1, word.value[offset].nucleus.length)
                    }
                    else if (after === 2 && word.value[offset].onset.length > 1) {
                        word.value[offset].onset.splice(1, word.value[offset].onset.length)
                    }
                    break
                default:
                    if (len > 1 || (p[0].hasOnset() && after > 3)) {
                        if (p[len - 1].hasCoda()) {
                            if (after < 7 && (after !== 5 || word.value[offset].nucleus.length < 2))
                                word.value[offset].coda = []
                            else if (after === 8 && word.value[offset].coda.length > 1)
                                word.value[offset].coda.splice(1, word.value[offset].coda.length)
                        }
                        else if (p[len - 1].nucleus.length > 0) {
                            word.value[offset].coda = []
                            if (after < 4 && (after !== 2 || word.value[offset].onset.length < 2))
                                word.value[offset].nucleus = []
                            else if (after === 5 && word.value[offset].nucleus.length > 1)
                                word.value[offset].nucleus.splice(1, word.value[offset].nucleus.length)
                        }
                        else if (p[len - 1].onset.length > 0) {
                            word.value[offset].nucleus = []
                            word.value[offset].coda = []
                            if (after === 2 && word.value[offset].onset.length > 1)
                                word.value[offset].onset.splice(1, word.value[offset].onset.length)
                        }
                    }
                    else {
                        word.value[offset].onset = []
                        word.value[offset].nucleus = []
                        word.value[offset].coda = []
                    }
            }

            if (len > 1)
                word.value.splice(offset + 1, 0, ...p.slice(1))

            if (after === 1 || after === 3 || 
                (after === 2 && !word.value[offset].hasMedial())) {

                if (p[0].hasOnset())
                        word.value[offset].onset.push(...p[0].onset)
                if (len < 2) {
                    if (!p[0].hasCoda())
                        word.value[offset].nucleus.unshift(...p[0].nucleus)
                    else {
                        word.value.splice(offset + 1, 0, new Syllable())
                        word.value[offset + 1].nucleus = word.value[offset].nucleus
                        word.value[offset + 1].coda = word.value[offset].coda
                        word.value[offset].nucleus = p[0].nucleus
                        word.value[offset].coda = p[0].coda
                        len++
                    }
                }
                else {
                    if (!p[len - 1].hasCoda()) {
                        word.value[offset + len - 1].nucleus.push(...word.value[offset].nucleus)
                        word.value[offset + len - 1].coda = word.value[offset].coda
                    }
                    else {
                        word.value.splice(offset + len, 0, new Syllable())
                        word.value[offset + len].nucleus = word.value[offset].nucleus
                        word.value[offset + len].coda = word.value[offset].coda
                        len++
                    }
                    word.value[offset].nucleus = p[0].nucleus
                    word.value[offset].coda = p[0].coda
                }
                if (len > 1) {
                    word.value[offset + len - 1].stress = word.value[offset].stress
                    word.value[offset].stress = 0
                    word.value[offset + len - 1].vowelLength= word.value[offset].vowelLength
                    word.value[offset].vowelLength = 8
                    word.value[offset + len - 1].tone = word.value[offset].tone
                    word.value[offset].tone = 0
                }
            }

            else if (after === 2 && word.value[offset].hasMedial()) {
                word.value.splice(offset + len, 0, new Syllable)
                word.value[offset + len].nucleus = word.value[offset].nucleus
                word.value[offset + len].coda = word.value[offset].coda
                word.value[offset].coda = word.value[offset].onset.slice(1)
                if (p[0].onset.length > 0)
                    word.value[offset].onset.splice(1, word.value[offset].onset.length, ...p[0].onset)
                else if (word.value[offset].onset.length > 1)
                    word.value[offset].onset.splice(1, word.value[offset].onset.length)
                word.value[offset].nucleus = p[0].nucleus
                word.value[offset].coda.unshift(...p[0].coda)
                len++
                if (len > 1) {
                    word.value[offset + len - 1].stress = word.value[offset].stress
                    word.value[offset].stress = 0
                    word.value[offset + len - 1].vowelLength= word.value[offset].vowelLength
                    word.value[offset].vowelLength = 8
                    word.value[offset + len - 1].tone = word.value[offset].tone
                    word.value[offset].tone = 0
                }
            }

            else if (after === 4 || after === 6 || 
                (after === 5 && word.value[offset].nucleus.length < 2)) {
            
                if (!p[0].hasOnset()) {
                    word.value[offset].nucleus.push(...p[0].nucleus)
                    if (p[0].hasCoda() && len < 2)
                        word.value[offset].coda.unshift(...p[0].coda)
                    else {
                        word.value[offset + len - 1].coda.push(...word.value[offset].coda)
                        word.value[offset].coda = p[0].coda
                    }
                }
                else {
                    word.value.splice(offset + 1, 0, new Syllable())
                    word.value[offset + len].coda.push(...word.value[offset].coda)
                    word.value[offset].coda = p[0].onset
                    word.value[offset + 1].nucleus = p[0].nucleus
                    if (p[0].hasCoda())
                        word.value[offset + 1].coda.unshift(...p[0].coda)
                    len++
                }
            }

            else if (after === 5 && word.value[offset].nucleus.length > 1) {
                let movedNucleus = word.value[offset].nucleus.slice(1)
                let movedCoda = word.value[offset].coda
                word.value[offset].nucleus.splice(1, word.value[offset].nucleus.length)
                word.value[offset].coda = []
                if (p[0].hasOnset()) {
                    word.value[offset].coda = p[0].onset
                    word.value.splice(offset + 1, 0, new Syllable())
                    word.value[offset + 1].nucleus = p[0].nucleus
                    word.value[offset + 1].coda = p[0].coda
                    len++
                }
                else {
                    word.value[offset].nucleus.push(...p[0].nucleus)
                    word.value[offset].coda = p[0].coda
                }
                if (p[p.length - 1].hasCoda()) {
                    word.value.splice(offset + len, 0, new Syllable())
                    word.value[offset + len].nucleus = movedNucleus
                    word.value[offset + len].coda = movedCoda
                    len++
                }
                else {
                    word.value[offset + len - 1].nucleus.push(...movedNucleus)
                    word.value[offset + len - 1].coda = movedCoda
                }
            }

            else if (after === 7 || after === 9 || 
                (after === 8 && word.value[offset].coda.length < 2)) {

                if (p[0].hasOnset())
                    word.value[offset].coda.push(...p[0].coda)
                word.value.splice(offset + 1, 0, new Syllable())
                word.value[offset + 1].nucleus = p[0].nucleus
                word.value[offset + 1].coda = p[0].coda
                len++
            }

            else if (after === 8 && word.value[offset].coda.length > 1) {
                if (p[0].hasOnset())
                    word.value[offset].coda.push(...p[0].coda)
                word.value.splice(offset + 1, 0, new Syllable())
                len++
                word.value[offset + len - 1].coda.push(...word.value[offset].coda.slice(1))
                word.value[offset].coda.splice(1, word.value[offset].coda.length)
                word.value[offset + 1].nucleus = p[0].nucleus
                if (p[0].coda.length > 0)
                    word.value[offset + 1].coda.unshift(...p[0].coda)
            }

            subgroups.content.split(".").forEach((subinflexp, i) => {
                let j = offset + i
                if (!p[0].hasOnset() && after > 6)
                    j++
                let s = subinflexp.match(pattern.rightwardInfixContent)!.groups!
                if (s.magnetBefore !== "") {
                    s.magnetBefore.split("~").slice(1).forEach((special) => {
                        try {
                            switch (special) {
                                case "":
                                    if (word.value[j - 1].coda.length > 0)
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
                                    if (word.value[j + len - 1].hasOnset())
                                        word.value[j + len - 2].coda.push(word.value[j + len - 1].onset.shift()!)
                                    break
                                case "$":
                                    word.value[j + len - 2].stress = word.value[j + len - 1].stress
                                    word.value[j + len - 1].stress = 0
                                    break
                                case "%":
                                    word.value[j + len - 2].vowelLength = word.value[j + len - 1].vowelLength
                                    word.value[j + len - 1].vowelLength = 8
                                    break
                                case "@":
                                    word.value[j + len - 2].tone = word.value[j + len - 1].tone
                                    word.value[j + len - 1].tone = 0
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
                    else if (p.nucleus.length > 0) {
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
                    if (s.hasOnset() && s.nucleus.length > 0) {
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
                    else if (s.nucleus.length > 0) {
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
                    else if (s.hasOnset() && s.nucleus.length === 0) { // s.onset is actually a coda in this case
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

