export const inflexp = new RegExp(
    "("
    + "(?<prefix>(((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*))"
    + "(?<prefixPush>(\\._?!{0,3}((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*!{0,3})*)"
    + "(?<prefixMagnet>(~(\\$|%|@)?)*)"
    + "(?<prefixMark>=?)"
    + "(?<!^)\\-)?"
    + "("
    + "(?<infixPlacement>(\\|){1,2})"
    + "(?<infixFirst>(((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*))"
    + "(?<infixRest>(\\.((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*)*)"
    + "\\|)?"
    + "("
    + "("
    + "(?<rightwardRepetitionFirst>(_?=?(~(\\$|%|@)?)*(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*(,(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*)*\\+*(~(\\$|%|@)?)*=?)?)"
    + "(?<rightwardRepetitionRest>(\\:(_?=?(~(\\$|%|@)?)*(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*(,(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*)*\\+*(~(\\$|%|@)?)*=?)?)*)"
    + "(?<!^|\\-);)"
    + "|"
    + "(;"
    + "(?<leftwardRepetitionFirst>(=?(~(\\$|%|@)?)*(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*(,(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*)*\\+*(~(\\$|%|@)?)*=?_?)?)"
    + "(?<leftwardRepetitionRest>(\\:(=?(~(\\$|%|@)?)*(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*(,(\\$\\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\\$\\$|%%|@@)*)*\\+*(~(\\$|%|@)?)*=?_?)?)*)"
    + ")"
    + "|"
    + "(?<baseRepetition>((#\\+*=?)|(=?#\\+*))*)"
    + ")?"
    + "(\\-"
    + "(?<suffixMark>=?)"
    + "(?<suffixMagnet>(~(\\$|%|@)?)*)"
    + "(?<suffixPush>(!{0,3}((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*!{0,3}_?\\.)*)"
    + "(?<suffix>(((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*))"
    + ")?"
    + "(/"
    + "(?<precedence>(r|i|p|s)*)"
    + ")?"
, "i")

export const charactersAndSpecials = /(?<specialsBefore>((\$|%|@)[0-9]{1,2})*)(?<main>[^ 0-9*\-|.;:,_!~$%@/]*)(?<specialsAfter>((\$|%|@)[0-9]{1,2})*)/i

export const rightwardRepetition = /(?<placeAfter>_?)(?<specialMarkBefore>=?)(?<magnetBefore>(~(\$|%|@)?)*)(?<first>(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)(?<rest>(,(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)*)(?<duplicator>\+*)(?<magnetAfter>(~(\$|%|@)?)*)(?<specialMarksAfter>=?)/i

export const leftwardRepetition = /(?<specialMarkBefore>=?)(?<magnetBefore>(~(\$|%|@)?)*)(?<first>(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)(?<rest>(,(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)*)(?<duplicator>\+*)(?<magnetAfter>(~(\$|%|@)?)*)(?<specialMarkAfter>=?)(?<placeBefore>_?)/i

export const syllableRepeat = /(?<specialsBefore>(\$\$|%%|@@)*)(?<main>([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(?<specialsAfter>(\$\$|%%|@@)*)/i

export const baseRepetition = /(#\+*=?)|(=?#\+*)/g