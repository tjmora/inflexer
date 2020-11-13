import AbstractWord from "../src/AbstractWord"
import Syllable from "../src/Syllable"

class TestWord extends AbstractWord {

    copy () {
        return new TestWord(this.value.map(syllable => syllable.copy())) as this
    }

    syllabifier (word: string) {
        let syllStr = word.match(/([bcdfghjklmnpqrstvwxyz]*[aeiou]*([bcdfghjklmnpqrstvwxyz](?![aeiou]))*(·(?<!$))?)/gi)
        syllStr.pop()
        return syllStr.map(syll => {
            return new Syllable(
                syll.match(/^([bcdfghjklmnpqrstvwxyz]+)(?=[aeiou])/i)[0].split(""),
                syll.match(/([aeiou]+)|(^[bcdfghjklmnpqrstvwxyz]+$)/i)[0].split(""),
                syll.match(/([bcdfghjklmnpqrstvwxyz]+)(?=·|$)/i)[0].split(""),
            )
        })
    }

    printer (word: Syllable[]) {
        return word.reduce((str, syllable) => {
            return str
                + syllable.onset.join("")
                + syllable.nucleus.join("")
                + syllable.coda.join("")
        }, "")
    }

}