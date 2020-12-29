import {AbstractWord, AbstractWordProps, Orthography} from "../src/AbstractWord"
import {Syllable} from "../src/Syllable"

const vowels = ["a", "e", "i", "o", "u"],
        vowelsGrave = ["à", "è", "ì", "ò", "ù"],
        vowelsAcute = ["á", "é", "í", "ó", "ú"],
        vowelsBreve = ["ă", "ĕ", "ĭ", "ŏ", "ŭ"],
        vowelsArch = ["ȃ", "ȇ", "ȋ", "ȏ", "ȗ"],
        vowelsMacron = ["ā", "ē", "ī", "ō", "ū"],
        vowelsDotBelow = ["ạ", "ẹ", "ị", "ọ", "ụ"],
        vowelsHook = ["ả", "ẻ", "ỉ", "ỏ", "ủ"],
        vowelsTilde = ["ã", "ẽ", "ĩ", "õ", "ũ"],
        vowelsAll = [vowels, vowelsGrave, vowelsAcute, vowelsBreve, vowelsArch, vowelsMacron, vowelsDotBelow, vowelsHook, 
            vowelsTilde];

function decodeStress (char: string): number {
    if (vowelsGrave.includes(char))
        return 2
    else if (vowelsAcute.includes(char))
        return 4
    else 
        return 0
}

function decodeVowelLength (char: string): number {
    if (vowelsBreve.includes(char))
        return 2
    else if (vowelsArch.includes(char))
        return 4
    else if (vowelsMacron.includes(char))
        return 12
    else 
        return 8
}

function decodeTone (char: string): number {
    if (vowelsDotBelow.includes(char))
        return 1
    else if (vowelsHook.includes(char))
        return 2
    else if (vowelsTilde.includes(char))
        return 3
    else 
        return 0
}

function decodeUnaccented (char: string): string {
    for (let i =0, l = vowelsAll.length; i < l; i++)
        for (let j = 0, m = 5; j < m; j++)
            if (vowelsAll[i][j].includes(char))
                return vowels[j]
    return ""
}

function encodeAccent (syllable: Syllable): string {
    let n = vowels.indexOf(syllable.nucleus[0])
    if (n === -1)
        return ""
    if (syllable.stress === 2)
        return vowelsGrave[n]
    else if (syllable.stress === 4)
        return vowelsAcute[n]
    else if (syllable.vowelLength === 2)
        return vowelsBreve[n]
    else if (syllable.vowelLength === 4)
        return vowelsArch[n]
    else if (syllable.vowelLength === 12)
        return vowelsMacron[n]
    else if (syllable.tone === 1)
        return vowelsDotBelow[n]
    else if (syllable.tone === 2)
        return vowelsHook[n]
    else if (syllable.tone === 3)
        return vowelsTilde[n]
    return vowels[n]
}

export const ortho: Orthography = {
    
    syllabifier: (word: string): Syllable[] => {
        let syll = word.match(/([bcdfghjklmnpqrstvwxyz]*[aeiouàèìòùáéíóúăĕĭŏŭȃȇȋȏȗāēīōūạẹịọụảẻỉỏủãẽĩõũ]*([bcdfghjklmnpqrstvwxyz](?![aeiouàèìòùáéíóúăĕĭŏŭȃȇȋȏȗāēīōūạẹịọụảẻỉỏủãẽĩõũ]))*(·(?<!$))?)/gi)!
        syll.pop()
        let result: Syllable[] = []
        let i = 0
        syll.forEach(s => {
            result.push(new Syllable())
            let onset = (s.match(/^([bcdfghjklmnpqrstvwxyz]+)(?=[aeiouàèìòùáéíóúăĕĭŏŭȃȇȋȏȗāēīōūạẹịọụảẻỉỏủãẽĩõũ]|$)/i) || [""])[0]
            result[i].onset = onset.split("")
            if (onset.length < s.length) {
                let nucleusFirst = ""
                nucleusFirst = s.charAt(onset.length).toLowerCase()
                result[i].stress = decodeStress(nucleusFirst)
                result[i].vowelLength = decodeVowelLength(nucleusFirst)
                result[i].tone = decodeTone(nucleusFirst)
                nucleusFirst = decodeUnaccented(nucleusFirst)
                result[i].nucleus = [nucleusFirst, ...(s.match(/([aeiouàèìòùáéíóúăĕĭŏŭȃȇȋȏȗāēīōūạẹịọụảẻỉỏủãẽĩõũ]+)/i) || [" "])[0].split("").slice(1)]
                result[i].coda = (s.match(/([bcdfghjklmnpqrstvwxyz]+)(?=·|$)/i) || [""])[0].split("")
            }
            i++
        })
        return result
    },

    printer: (value: Syllable[]): string => {
        let result = ""
        value.forEach((s) => {
            result += 
                s.premark
                + s.onset.join("")
                + encodeAccent(s) + s.nucleus.slice(1).join("")
                + s.coda.join("")
                + s.postmark
                + "·"
        })
        return result.slice(0, result.length - 1)
    }
}

export default class TestWord extends AbstractWord {

    copy () {
        return new TestWord({
            base: this.value,
            orthography: ortho
        }) as this
    }

    syllabify (word: string): Syllable[] {
        return this.orthography.syllabifier(word)
    }

    specialMarkPlacer () {
        return "-"
    }

    toString (): string {
        return this.orthography.printer(this.value)
    }
}