"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infixContent = exports.leftwardInfix = exports.rightwardInfix = exports.suffixPush = exports.prefixPush = exports.baseRepetition = exports.syllableRepeat = exports.leftwardRepetition = exports.rightwardRepetition = exports.charactersAndSpecials = exports.inflexp = void 0;
exports.inflexp = new RegExp("("
    + "(?<prefix>(((\\$|%|@)[0-9]{1,2})*[^ 0-9*\\-=|.;:,_!~$%@/]*((\\$|%|@)[0-9]{1,2})*))"
    + "(?<prefixMark>=?)"
    + "(?<prefixPush>(\\.[^ 0-9*\\-=|.;:,_!~$%@/]*(!{1,3})?((\\$|%|@)[0-9]{1,2})*)*=?)"
    + "(?<prefixMagnet>(~(\\$|%|@)?)*)"
    + "(?<!^)\\-)?"
    + "(\\|("
    + "(?<rightwardInfix>\\.*[1-9](((~(\\$|%|@)?)*[^ 0-9*\\-=|.;:,_!~$%@/]*(~(\\$|%|@)?)*)(?=\\.|\\!|\\|)(\\.?))*(!{1,3})?)"
    + "|"
    + "(?<leftwardInfix>(!{1,3})?((\\.?)(?<=\\||\\!|\\.)((~(\\$|%|@)?)*[^ 0-9*\\-=|.;:,_!~$%@/]*(~(\\$|%|@)?)*))*[0-9]\\.*)"
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
    + ")?", "i");
exports.charactersAndSpecials = /(?<specialsBefore>((\$|%|@)[0-9]{1,2})*)(?<main>[^ 0-9*\-=|.;:,_!~$%@/]*)(?<specialsAfter>((\$|%|@)[0-9]{1,2})*)/i;
exports.rightwardRepetition = /(?<placeAfter>_?)(?<specialMarkBefore>=?)(?<magnetBefore>(~(\$|%|@)?)*)(?<first>(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)(?<rest>(,(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)*)(?<duplicator>\+*)(?<magnetAfter>(~(\$|%|@)?)*)(?<specialMarkAfter>=?)/i;
exports.leftwardRepetition = /(?<specialMarkBefore>=?)(?<magnetBefore>(~(\$|%|@)?)*)(?<first>(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)(?<rest>(,(\$\$|%%|@@)*(([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(\$\$|%%|@@)*)*)(?<duplicator>\+*)(?<magnetAfter>(~(\$|%|@)?)*)(?<specialMarkAfter>=?)(?<placeBefore>_?)/i;
exports.syllableRepeat = /(?<specialsBefore>(\$\$|%%|@@)*)(?<main>([1-3]|[4-6]|[7-9]){1,3}|[*]{1,3})(?<specialsAfter>(\$\$|%%|@@)*)/i;
exports.baseRepetition = /(#\+*=?)|(=?#\+*)/g;
exports.prefixPush = /(?<main>[^ 0-9*\-=|.;:,_!~$%@/]*)(?<drop>(!{1,3})?)(?<specials>((\$|%|@)[0-9]{1,2})*)(?<specialMark>=?)/i;
exports.suffixPush = /(?<specialMark>=?)(?<specials>((\$|%|@)[0-9]{1,2})*)(?<drop>(!{1,3})?)(?<main>[^ 0-9*\-=|.;:,_!~$%@/]*)/i;
exports.rightwardInfix = /(?<offset>\.*)(?<after>[1-9])(?<content>(((~(\$|%|@)?)*[^ 0-9*\-=|.;:,_!~$%@/]*(~(\$|%|@)?)*)(?=\.|\!|$)(\.?))*)(?<drop>(!{1,3})?)/i;
exports.leftwardInfix = /(?<drop>(!{1,3})?)(?<content>((\.?)(?<=^|\!|\.)((~(\$|%|@)?)*[^ 0-9*\-=|.;:,_!~$%@/]*(~(\$|%|@)?)*))*)(?<before>[0-9])(?<offset>\.*)/i;
exports.infixContent = /(?<magnetBefore>(~(\$|%|@)?)*)(?<main>[^ 0-9*\-=|.;:,_!~$%@/]*)(?<magnetAfter>(~(\$|%|@)?)*)/i;
//# sourceMappingURL=patterns.js.map