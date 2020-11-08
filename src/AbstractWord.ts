import {inflexpPattern} from "./patterns"
import Syllable from "./Syllable"


export default abstract class AbstractWord {

    value: Syllable[]
    syllabifier: (word: string) => Syllable[]
    printer: (word: Syllable[]) => string
    
    constructor (word: string | Syllable[], syllabifier: (word: string) => Syllable[], printer: (word: Syllable[]) => string) {
        this.syllabifier = syllabifier
        this.printer = printer
        this.value = typeof word === "string" ? this.syllabifier(word) : (word as Syllable[])
    }

    /**
     * Inhereting classes should implement copy() as follows:
     *     copy () {
     *         return new ChildClass(this.value.map(syll => syll.copy())) as this
     *     }
     */
    protected abstract copy (): this

    static _repeat (word: AbstractWord, inflection: {[key:string]: string}) {

    }

    static _infix (word: AbstractWord, inflection: {[key:string]: string}) {

    }

    static _prefix (word: AbstractWord, inflection: {[key:string]: string}) {

    }

    static _suffix (word: AbstractWord, inflection: {[key:string]: string}) {

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

