import {inflexpPattern, rightwardRepetitionPattern, leftwardRepetitionPattern, syllableRepeatPattern} from "./patterns"
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
                    ? subinflexp.match(rightwardRepetitionPattern)!.groups!
                    : subinflexp.match(leftwardRepetitionPattern)!.groups!
                let placeAfter = subgroups.placeAfter !== undefined && subgroups.placeAfter !== ""
                    ? 1 
                    : subgroups.placeBefore !== undefined && subgroups.placeBefore !== ""
                        ? 0
                        : 1;
                if (subgroups.specialMarkBefore !== "")
                    r[j].premark = "-"
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
                    let subsubgroups = s.match(syllableRepeatPattern)!.groups!;
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
                    if (subsubgroups.duplicator !== "")
                        r.splice(r.length, 0, ...r.map(syll => syll.copy()))
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
                    r[j].postmark = "-"
                if (r.length > 0)
                    word.value.splice(i + placeAfter, 0, ...r)
            })
        }
        else if (groups.baseRepetition !== undefined) {

        }
    }

    static _infix (word: AbstractWord, groups: {[key:string]: string}) {

    }

    static _prefix (word: AbstractWord, groups: {[key:string]: string}) {

    }

    static _suffix (word: AbstractWord, groups: {[key:string]: string}) {

    }

    inflect (inflexp: string) {
        let groups = inflexp.match(inflexpPattern)?.groups!
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

