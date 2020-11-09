import {inflexpPattern, rightwardRepetitionPattern, syllableRepeatPattern} from "./patterns"
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
        if (groups.rightwardRepetitionFirst !== undefined) {
            let i = -1;
            [...(groups.rightwardRepetitionFirst + groups.rightwardRepetitionRest).split(":")].forEach((subinflexp) => {
                i++
                let j = 0
                let r: Syllable[] = [new Syllable()]
                let subgroups = subinflexp.match(rightwardRepetitionPattern)!.groups!
                let placeAfter = subgroups.placeAfter !== undefined ? 1 : 0
                if (subgroups.specialMarkBefore !== undefined)
                    r[j].premark = "-"
                if (subgroups.magnetBefore !== undefined) {
                    [...subgroups.magnetBefore.split("~")].slice(1).forEach((special) => {
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
                            throw new Error("Inflexp Magnet Error: ~" + special + " (from " + subgroups.magnetBefore + ") failed to take sounds from the previous syllable.")
                        }
                    })
                }
                [...(subgroups.first+subgroups.rest).split(",")].forEach((s) => {
                    if (j > 0)
                        r.push(new Syllable())
                    let subsubgroups = s.match(syllableRepeatPattern)!.groups!;
                    [...(subsubgroups.specialsBefore + subsubgroups.specialsAfter)].forEach((ch, k) => {
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
                    j++
                })
            })
        }
        else if (groups.rightwardRepetitionFirst !== undefined) {

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

