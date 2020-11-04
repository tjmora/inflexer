import Syllable from "./Syllable"

const inflexp_pattern 
    = "("
    + "(?<prefix>([^ 0-9-.,:;!~$%@_]*)?)"
    + "(?<prefixSpecials>((\\$|%|@)[0-9]{1,2})*)"
    + "(?<prefixPush>(\\._?[^ 0-9-.,:;!~$%@_]*((\\$|%|@)[0-9]{1,2})*!{0,3})*)"
    + "(?<prefixMagnet>(~(\\$|%|@)?)*)"
    + "(?<prefixMark>=?)"
    + "\\-)?"
    + "("
    + "("
    + "(?<rightwardRepetitionFirst>(_?=?(~(\\$|%|@)?)*(([1-3]?[4-6]?[8-9]?)|\\*{1,3})(\\$|%|@)*(,(([1-3]?[4-6]?[8-9]?)|\\*{1,3})(\\$|%|@)*)*(~(\\$|%|@)?)*=?))"
    + "(?<rightwardRepetitionRest>(\\:_?=?(~(\\$|%|@)?)*(([1-3]?[4-6]?[8-9]?)|\\*{1,3})(\\$|%|@)*(,(([1-3]?[4-6]?[8-9]?)|\\*{1,3})(\\$|%|@)*)*(~(\\$|%|@)?)*=?)*)"
    + "(?<!^|\\-);)"
    + "|"
    + "(;"
    + "(?<leftwardRepetitionFirst>(=?(~(\\$|%|@)?)*(([1-3]?[4-6]?[8-9]?)|\\*{1,3})(\\$|%|@)*(,(([1-3]?[4-6]?[8-9]?)|\\*{1,3})(\\$|%|@)*)*(~(\\$|%|@)?)*_?=?))"
    + "(?<leftwardRepetitionRest>(\\:=?(~(\\$|%|@)?)*(([1-3]?[4-6]?[8-9]?)|\\*{1,3})(\\$|%|@)*(,(([1-3]?[4-6]?[8-9]?)|\\*{1,3})(\\$|%|@)*)*(~(\\$|%|@)?)*_?=?)*)"
    + ")"
    + "|"
    + "(?<baseRepetition>(=?#)*)"
    + ")?"
    + "(\\-"
    + "(?<suffixMark>=?)"
    + "(?<suffixMagnet>(~(\\$|%|@)?)*)"
    + "(?<suffixPush>([^ 0-9-.,:;!~$%@_]*((\\$|%|@)[0-9]{1,2})*!{0,3}_?\\.)*)"
    + "(?<suffix>([^ 0-9-.,:;!~$%@_]*)?)"
    + "(?<suffixSpecials>((\\$|%|@)[0-9]{1,2})*)"
    + ")?"

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

