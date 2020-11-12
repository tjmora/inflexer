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

    protected abstract printer (word: Syllable[]): string

    protected abstract specialMarkPlacer (): string

    static _repeat (word: AbstractWord, groups: {[key:string]: string}) {
        if (groups.rightwardRepetitionFirst !== undefined || groups.leftwardRepetitionFirst !== undefined) {
            let repetitionInflexp = groups.rightwardRepetitionFirst !== undefined
                ? groups.rightwardRepetitionFirst + groups.rightwardRepetitionRest
                : groups.leftwardRepetitionFirst + groups.leftwardRepetitionRest
            let i = groups.rightwardRepetitionFirst !== undefined 
                ? -1
                : word.value.length - (repetitionInflexp.match(/\:/g) || []).length - 1

            repetitionInflexp.split(":").forEach((subinflexp) => {
                i++
                let j = 0
                let r: Syllable[] = [new Syllable()]
                let subgroups = groups.rightwardRepetitionFirst !== undefined
                    ? subinflexp.match(pattern.rightwardRepetition)!.groups!
                    : subinflexp.match(pattern.leftwardRepetition)!.groups!
                let placeAfter = subgroups.placeAfter !== undefined && subgroups.placeAfter !== ""
                    ? 1 
                    : subgroups.placeBefore !== undefined && subgroups.placeBefore !== ""
                        ? 0
                        : 1;
                if (subgroups.specialMarkBefore !== "")
                    r[j].premark = word.specialMarkPlacer()
                if (subgroups.magnetBefore !== "") {
                    subgroups.magnetBefore.split("~").slice(1).forEach((special) => {
                        try {
                            switch (special) {
                                case "":
                                    let popped = word.value[i - 1 + placeAfter].coda.pop()
                                    if (popped !== undefined)
                                        r[j].onset.push(popped)
                                    break
                                case "$":
                                    r[j].stress = word.value[i - 1 + placeAfter].stress
                                    word.value[i - 1 + placeAfter].stress = 0
                                    break
                                case "%":
                                    r[j].vowelLength = word.value[i - 1 + placeAfter].vowelLength
                                    word.value[i - 1 + placeAfter].vowelLength = 8
                                    break
                                case "@":
                                    r[j].tone = word.value[i - 1 + placeAfter].tone
                                    word.value[i - 1 + placeAfter].tone = 0
                                    break
                                default:
                            }
                        }
                        catch (e) {
                            throw new Error("Inflexp Magnet Error: ~" + special + " (from " + subgroups.magnetBefore + ") failed to take sounds from the earlier syllable.")
                        }
                    })
                }
                (subgroups.first+subgroups.rest).split(",").forEach((s) => {
                    if (j > 0)
                        r.push(new Syllable())
                    let subsubgroups = s.match(pattern.syllableRepeat)!.groups!;
                    (subsubgroups.specialsBefore + subsubgroups.specialsAfter).split("").forEach((ch, k) => {
                        if (k % 2 === 1)
                            return
                        switch (ch) {
                            case "$":
                                r[j].stress = word.value[i+j].stress
                                break
                            case "$":
                                r[j].vowelLength = word.value[i+j].vowelLength
                                break
                            case "@":
                                r[j].tone = word.value[i+j].tone
                                break
                        }
                    })
                    if (subsubgroups.main !== "") {
                        let temp: string | undefined = ""
                        if (subsubgroups.main.search("1") > -1 || subsubgroups.main === "*" || subsubgroups.main === "**") {
                            r[j].onset = word.value[i+j].onset.map(ch => ch)
                        }
                        else if (subsubgroups.main.search("2") > -1) {
                            temp = word.value[i+j].onset.shift()
                            if (temp !== undefined)
                                r[j].onset.push(temp)
                        }
                        else if (subsubgroups.main.search("3") > -1) {
                            temp = word.value[i+j].onset.pop()
                            if (temp !== undefined)
                                r[j].onset.push(temp)
                        }
                        if (subsubgroups.main.search("4") > -1 || subsubgroups.main.includes("*")) {
                            r[j].nucleus = word.value[i+j].nucleus.map(ch => ch)
                        }
                        else if (subsubgroups.main.search("5") > -1) {
                            temp = word.value[i+j].nucleus.shift()
                            if (temp !== undefined)
                                r[j].onset.push(temp)
                        }
                        else if (subsubgroups.main.search("6") > -1) {
                            temp = word.value[i+j].nucleus.pop()
                            if (temp !== undefined)
                                r[j].onset.push(temp)
                        }
                        if (subsubgroups.main.search("7") > -1 || subsubgroups.main === "**" || subsubgroups.main === "***") {
                            r[j].coda = word.value[i+j].coda.map(ch => ch)
                        }
                        else if (subsubgroups.main.search("8") > -1) {
                            temp = word.value[i+j].coda.shift()
                            if (temp !== undefined)
                                r[j].onset.push(temp)
                        }
                        else if (subsubgroups.main.search("9") > -1) {
                            temp = word.value[i+j].coda.pop()
                            if (temp !== undefined)
                                r[j].onset.push(temp)
                        }
                    }
                    if (subsubgroups.duplicator !== "") {
                        for (let p = 0, q = subsubgroups.duplicator.length; p < q; p++)
                            r.splice(r.length, 0, ...r.map(syll => syll.copy()))
                    }
                    j++
                })
                if (subgroups.magnetAfter !== "") {
                    subgroups.magnetAfter.split("~").slice(1).forEach((special) => {
                        try {
                            switch (special) {
                                case "":
                                    let popped = word.value[i + placeAfter].coda.pop()
                                    if (popped !== undefined)
                                        r[j].onset.push(popped)
                                    break
                                case "$":
                                    r[j].stress = word.value[i + placeAfter].stress
                                    word.value[i - 1 + placeAfter].stress = 0
                                    break
                                case "%":
                                    r[j].vowelLength = word.value[i + placeAfter].vowelLength
                                    word.value[i - 1 + placeAfter].vowelLength = 8
                                    break
                                case "@":
                                    r[j].tone = word.value[i + placeAfter].tone
                                    word.value[i - 1 + placeAfter].tone = 0
                                    break
                                default:
                            }
                        }
                        catch (e) {
                            throw new Error("Inflexp Magnet Error: ~" + special + " (from " + subgroups.magnetAfter + ") failed to take sounds from the next syllable.")
                        }
                    })
                }
                if (subgroups.specialMarkAfter !== "")
                    r[j].postmark = word.specialMarkPlacer()
                if (r.length > 0)
                    word.value.splice(i + placeAfter, 0, ...r)
            })
        }
        else if (groups.baseRepetition !== undefined) {
            groups.baseRepetition.match(pattern.baseRepetition)?.forEach((subinflexp) => {
                let cpy = word.value.map(syll => syll.copy())
                let willUnshift = false
                for (let p = 0, q = (groups.baseRepetition!.match(/\+/g) || []).length; p < q; q++)
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
        if (groups.infixPlacement !== undefined) {
            let a = (groups.infixRest.match(/\./g) || []),
                n = a.length;
            if (n > 0)
                word.value.unshift(new Syllable(), ...a.map(p => new Syllable()))
            else
                word.value.unshift(new Syllable())
            if (groups.infixPlacement === "|" && word.value[n + 1].onset.length > 1)
                word.value[0].onset.push(word.value[n + 1].onset.shift()!)
            else if (groups.infixPlacement === "||") {
                word.value[0].onset = word.value[n + 1].onset
                word.value[n + 1].onset = []
            }
            let i = -1;
            (groups.infixFirst + groups.infixRest).split(".").forEach((subinflexp) => {
                i++
                let subgroups = subinflexp.match(pattern.charactersAndSpecials)!.groups!
                if (subgroups.main !== "") {
                    let m = word.syllabifier(subgroups.main)
                    if (m[0].onset.length > 0)
                        word.value[i].onset.push(...m[0].onset)
                    if (m[0].nucleus.length > 0)
                        word.value[i].nucleus = m[0].nucleus
                    if (m[0].coda.length > 0)
                        word.value[i].coda.unshift(...m[0].coda)
                }
                let specials = subgroups.specialsBefore + subgroups.specialsAfter
                let s = specials.match(/\$(?<digits>[0-9]{1-2})/i)!.groups!
                if (s.digits !== undefined)
                    word.value[i].stress = parseInt(s.digits)
                let vl = specials.match(/%(?<digits>[0-9]{1-2})/i)!.groups!
                if (vl.digits !== undefined)
                    word.value[i].vowelLength = parseInt(vl.digits)
                let t = specials.match(/%(?<digits>[0-9]{1-2})/i)!.groups!
                if (t.digits !== undefined)
                        word.value[i].tone = parseInt(t.digits)
            })
        }
    }

    static _prefix (word: AbstractWord, groups: {[key:string]: string}) {

    }

    static _suffix (word: AbstractWord, groups: {[key:string]: string}) {

    }

    inflect (inflexp: string) {
        let groups = inflexp.match(inflexp)?.groups!
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

}

