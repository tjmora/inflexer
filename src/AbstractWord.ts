import Syllable from "./Syllable"

const ptrn_affix = "(\\w*)",
    ptrn_specials = "((?:\\$|%|@)[0-9]{1,2})*",
    ptrn_affix_and_specials = ptrn_specials + ptrn_affix + ptrn_specials,
    ptrn_prfxpush = "((?:\\.(_)?" + ptrn_affix_and_specials + ")*)",
    ptrn_sufxpush = "((?:" + ptrn_affix_and_specials + "(_)?\\.)*)",
    ptrn_rightward_magnet = "(~(\\$|%|@)?)*\:)*",
    ptrn_leftward_magnet = "((\\$|%|@)?~)*",
    ptrn_notational_repetition = "(?:[1-3]?[4-6]?[7-9]?)",
    ptrn_asterisk_repetition = "\\*{1,3}",
    ptrn_specials_designation = "(\\$|%|@)",
    ptrn_repetition_combined = "(" + ptrn_specials_designation + "?(" + ptrn_notational_repetition + "|" + ptrn_asterisk_repetition + ")" + ptrn_specials_designation + "?)",
    ptrn_rightward_multi = "((?:_?" + ptrn_repetition_combined + "\,)*)" + "(_)?" + ptrn_repetition_combined,
    ptrn_leftward_multi = ptrn_repetition_combined + "(_)?" + "((?:" + ptrn_repetition_combined + "_?\,)*)",
    ptrn_rightward_repetition = "(?:(" + ptrn_rightward_multi + "?" + ptrn_rightward_magnet + ptrn_rightward_multi + ptrn_rightward_magnet + ";)",
    ptrn_leftward_repetition = "(?:;" + ptrn_leftward_magnet + ptrn_leftward_multi + "(\:" + ptrn_leftward_magnet + "(" + ptrn_leftward_multi + ")?)*)",
    ptrn_prefixation = "(?:(?:" + ptrn_affix_and_specials + ")" + ptrn_prfxpush + "-)",
    ptrn_suffixation = "(?:-" + ptrn_sufxpush + "(?:" + ptrn_affix_and_specials + "))",
    ptrn_repetition = "(?:" + ptrn_rightward_repetition + "|" + ptrn_leftward_repetition + "|(#*))",
    ptrn_all = "^" + ptrn_prefixation + "?" + ptrn_repetition + "?" + ptrn_suffixation + "?$"

export default abstract class AbstractWord {

    value: Syllable[]
    syllabifier: (word: string) => Syllable[]
    printer: (word: Syllable[]) => string
    
    constructor (word: string, syllabifier: (word: string) => Syllable[], printer: (word: Syllable[]) => string) {
        this.syllabifier = syllabifier
        this.printer = printer
        this.value = this.syllabifier(word)
    }

    inflect (inflexp: string) {

    }


}

