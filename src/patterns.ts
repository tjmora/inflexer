export const inflexp = new RegExp(
    "("
    + "(?<prefix>(((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-=|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*))"
    + "(?<prefixMark>=?)"
    + "(?<prefixPush>(\\.[^ 0-9*\\-=|.;:,_!~$%@/]*(!{1,3})?((\\$|%|@)[0-9]{1,2})*)*=?)"
    + "(?<prefixMagnet>(~(\\$|%|@)?)*)"
    + "(?<!^)\\-)?"
    + "(\\|("
    + "(?<rightwardInfix>\\.*[1-9](((~(\\$|%|@)?)*[^ 0-9*\\-=|.;:,_!~$%@/]*(!{1,3})?(~(\\$|%|@)?)*)(?=\\.|\\|)(\\.?))*)"
    + "|"
    + "(?<leftwardInfix>((\\.?)(?<=\\||\\.)((~(\\$|%|@)?)*(!{1,3})?[^ 0-9*\\-=|.;:,_!~$%@/]*(~(\\$|%|@)?)*))*[0-9]\\.*)"
    + ")\\|)?"
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
    + "(?<suffixMagnet>(~(\\$|%|@)?)*)"
    + "(?<suffixPush>(=?((\\$|%|@)[0-9]{1,2})*(!{1,3})?[^ 0-9*\\-=|.;:,_!~$%@/]*\\.)*)"
    + "(?<suffixMark>=?)"
    + "(?<suffix>(((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-=|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*))"
    + ")?"
    + "(/"
    + "(?<precedence>(r|i|p|s)*)"
    + ")?"
, "i")

export const charactersAndSpecials = /(?<specialsBefore>((\$|%|@)[0-9]{1,2})*)(?<main>[^ 0-9*\-=|.;:,_!~$%@/]*)(?<specialsAfter>((\$|%|@)[0-9]{1,2})*)/i

export const rightwardRepetition = /(?<placeAfter>_?)(?<specialMarkBefore>=?)(?<magnetBefore>(~(\$|%|@)?)*)(?<first>(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)(?<rest>(,(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)*)(?<duplicator>\+*)(?<magnetAfter>(~(\$|%|@)?)*)(?<specialMarkAfter>=?)/i

export const leftwardRepetition = /(?<specialMarkBefore>=?)(?<magnetBefore>(~(\$|%|@)?)*)(?<first>(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)(?<rest>(,(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)*)(?<duplicator>\+*)(?<magnetAfter>(~(\$|%|@)?)*)(?<specialMarkAfter>=?)(?<placeBefore>_?)/i

export const syllableRepeat = /(?<specialsBefore>(\$\$|%%|@@)*)(?<main>([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(?<specialsAfter>(\$\$|%%|@@)*)/i

export const baseRepetition = /(#\+*=?)|(=?#\+*)/g

export const prefixPush = /(?<main>[^ 0-9*\-=|.;:,_!~$%@/]*)(?<drop>(!{1,3})?)(?<specials>((\$|%|@)[0-9]{1,2})*)(?<specialMark>=?)/i

export const suffixPush = /(?<specialMark>=?)(?<specials>((\$|%|@)[0-9]{1,2})*)(?<drop>(!{1,3})?)(?<main>[^ 0-9*\-=|.;:,_!~$%@/]*)/i

export const rightwardInfix = /(?<offset>\.*)(?<after>[1-9])(?<push>(((~(\$|%|@)?)*[^ 0-9*\-=|.;:,_!~$%@/]*(!{1,3})?(~(\$|%|@)?)*)(?=\.|\|)(\.?))*)/i

export const rightwardInfixPush = /(?<magnetBefore>(~(\$|%|@)?)*)(?<main>[^ 0-9*\-=|.;:,_!~$%@/]*)(?<drop>(!{1,3})?)(?<magnetAfter>(~(\$|%|@)?)*)/i

export const leftwardInfix = /(?<push>((\.?)(?<=\||\.)((~(\$|%|@)?)*(!{1,3})?[^ 0-9*\-=|.;:,_!~$%@/]*(~(\$|%|@)?)*))*)(?<before>[0-9])(?<offset>\.*)/i

export const leftwardInfixPush = /(?<magnetBefore>(~(\$|%|@)?)*)(?<drop>(!{1,3})?)(?<main>[^ 0-9*\-=|.;:,_!~$%@/]*)(?<magnetAfter>(~(\$|%|@)?)*)/i