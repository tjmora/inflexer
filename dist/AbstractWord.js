"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractWord = void 0;
var pattern = require("./patterns");
var Syllable_1 = require("./Syllable");
var AbstractWord = /** @class */ (function () {
    function AbstractWord(word) {
        this.value = typeof word === "string" ? this.syllabifier(word) : word;
    }
    AbstractWord.prototype.inflect = function (inflexp) {
        var _this = this;
        var _a;
        var groups = (_a = inflexp.match(pattern.inflexp)) === null || _a === void 0 ? void 0 : _a.groups;
        var precedence = [AbstractWord._repeat, AbstractWord._infix, AbstractWord._prefix, AbstractWord._suffix];
        if (groups.precedence !== undefined) {
            precedence = [];
            __spread(groups.precedence).forEach(function (ch) {
                switch (ch) {
                    case "r":
                        precedence.push(AbstractWord._repeat);
                        break;
                    case "i":
                        precedence.push(AbstractWord._infix);
                        break;
                    case "p":
                        precedence.push(AbstractWord._prefix);
                        break;
                    case "s":
                        precedence.push(AbstractWord._suffix);
                        break;
                    default:
                }
            });
        }
        precedence.forEach(function (fn) { return fn(_this, groups); });
    };
    AbstractWord._repeat = function (word, groups) {
        var _a;
        if (groups.rightwardRepetitionFirst !== undefined || groups.leftwardRepetitionFirst !== undefined) {
            var result_1 = [];
            var repetitionInflexp = groups.rightwardRepetitionFirst !== undefined
                ? groups.rightwardRepetitionFirst + groups.rightwardRepetitionRest
                : groups.leftwardRepetitionFirst + groups.leftwardRepetitionRest;
            var i_1 = groups.rightwardRepetitionFirst !== undefined
                ? 0
                : word.value.length - (repetitionInflexp.match(/\:/g) || []).length - 1;
            if (i_1 > 0)
                result_1.push.apply(result_1, __spread(word.value.slice(0, i_1).map(function (syll) { return syll.copy(); })));
            repetitionInflexp.split(":").forEach(function (subinflexp) {
                var j = 0;
                var k = groups.rightwardRepetitionFirst !== undefined
                    ? 0
                    : ((subinflexp).match(/,/g) || []).length * -1;
                var orig_k = k;
                var r = [];
                var placeAfter = 0;
                if (subinflexp !== "") {
                    r.push(new Syllable_1.Syllable());
                    var subgroups_1 = groups.rightwardRepetitionFirst !== undefined
                        ? subinflexp.match(pattern.rightwardRepetition).groups
                        : subinflexp.match(pattern.leftwardRepetition).groups;
                    placeAfter = groups.rightwardRepetitionFirst !== undefined
                        ? subgroups_1.placeAfter !== undefined && subgroups_1.placeAfter !== ""
                            ? 1
                            : 0
                        : subgroups_1.placeBefore !== undefined && subgroups_1.placeBefore !== ""
                            ? 0
                            : 1;
                    (subgroups_1.first + subgroups_1.rest).split(",").forEach(function (s) {
                        if (j > 0)
                            r.push(new Syllable_1.Syllable());
                        var subsubgroups = s.match(pattern.syllableRepeat).groups;
                        (subsubgroups.specialsBefore + subsubgroups.specialsAfter).split("").forEach(function (ch, h) {
                            if (h % 2 === 1)
                                return;
                            switch (ch) {
                                case "$":
                                    r[j].stress = word.value[i_1 + k].stress;
                                    break;
                                case "%":
                                    r[j].vowelLength = word.value[i_1 + k].vowelLength;
                                    break;
                                case "@":
                                    r[j].tone = word.value[i_1 + k].tone;
                                    break;
                            }
                        });
                        if (subsubgroups.main !== "") {
                            var temp = "";
                            if (subsubgroups.main.search("1") > -1 || subsubgroups.main === "*" || subsubgroups.main === "***") {
                                r[j].onset = word.value[i_1 + k].onset.map(function (ch) { return ch; });
                            }
                            else if (subsubgroups.main.search("2") > -1) {
                                if (word.value[i_1 + k].hasOnset())
                                    r[j].onset.push(word.value[i_1 + k].onset[0]);
                            }
                            else if (subsubgroups.main.search("3") > -1) {
                                var l = word.value[i_1 + k].onset.length;
                                if (l > 0)
                                    r[j].onset.push(word.value[i_1 + k].onset[l - 1]);
                            }
                            if (subsubgroups.main.search("4") > -1 || subsubgroups.main.includes("*")) {
                                r[j].nucleus = word.value[i_1 + k].nucleus.map(function (ch) { return ch; });
                            }
                            else if (subsubgroups.main.search("5") > -1) {
                                if (word.value[i_1 + k].hasNucleus())
                                    r[j].nucleus.push(word.value[i_1 + k].nucleus[0]);
                            }
                            else if (subsubgroups.main.search("6") > -1) {
                                var l = word.value[i_1 + k].nucleus.length;
                                if (l > 0)
                                    r[j].nucleus.push(word.value[i_1 + k].nucleus[l - 1]);
                            }
                            if (subsubgroups.main.search("7") > -1 || subsubgroups.main === "**" || subsubgroups.main === "***") {
                                r[j].coda = word.value[i_1 + k].coda.map(function (ch) { return ch; });
                            }
                            else if (subsubgroups.main.search("8") > -1) {
                                if (word.value[i_1 + k].hasCoda())
                                    r[j].coda.push(word.value[i_1 + k].coda[0]);
                            }
                            else if (subsubgroups.main.search("9") > -1) {
                                var l = word.value[i_1 + k].coda.length;
                                if (l > 0)
                                    r[j].coda.push(word.value[i_1 + k].coda[l - 1]);
                            }
                        }
                        j++;
                        k++;
                    });
                    j--;
                    if (subgroups_1.duplicator !== undefined && subgroups_1.duplicator !== "") {
                        var orig = r.map(function (syll) { return syll.copy(); });
                        var q = subgroups_1.duplicator.length;
                        for (var p = 0; p < q; p++)
                            r.push.apply(r, __spread(orig.map(function (syll) { return syll.copy(); })));
                        j += q;
                    }
                    if (subgroups_1.specialMarkBefore !== undefined && subgroups_1.specialMarkBefore !== "")
                        r[0].premark = word.specialMarkPlacer();
                    if (subgroups_1.magnetBefore !== "") {
                        subgroups_1.magnetBefore.split("~").slice(1).forEach(function (special) {
                            try {
                                switch (special) {
                                    case "":
                                        var popped = placeAfter === 0
                                            ? result_1[result_1.length - 1].coda.pop()
                                            : word.value[i_1].coda.pop();
                                        if (popped !== undefined)
                                            r[0].onset.unshift(popped);
                                        break;
                                    case "$":
                                        if (placeAfter === 0) {
                                            r[0].stress = result_1[result_1.length - 1].stress;
                                            result_1[result_1.length - 1].stress = 0;
                                        }
                                        else {
                                            r[0].stress = word.value[i_1].stress;
                                            word.value[i_1].stress = 0;
                                        }
                                        break;
                                    case "%":
                                        if (placeAfter === 0) {
                                            r[0].vowelLength = result_1[result_1.length - 1].vowelLength;
                                            result_1[result_1.length - 1].vowelLength = 8;
                                        }
                                        else {
                                            r[0].vowelLength = word.value[i_1].vowelLength;
                                            word.value[i_1].vowelLength = 8;
                                        }
                                        break;
                                    case "@":
                                        if (placeAfter === 0) {
                                            r[0].tone = result_1[result_1.length - 1].tone;
                                            result_1[result_1.length - 1].tone = 0;
                                        }
                                        else {
                                            r[0].tone = word.value[i_1].tone;
                                            word.value[i_1].tone = 0;
                                        }
                                        break;
                                    default:
                                }
                            }
                            catch (e) {
                                throw new Error("Inflexp Magnet Error: ~" + special + " (from " + subgroups_1.magnetBefore + ") failed to take sounds from the earlier syllable.");
                            }
                        });
                    }
                    if (subgroups_1.magnetAfter !== "") {
                        subgroups_1.magnetAfter.split("~").slice(1).forEach(function (special) {
                            try {
                                switch (special) {
                                    case "":
                                        var shifted = word.value[i_1 + placeAfter].onset.shift();
                                        if (shifted !== undefined)
                                            r[j].coda.push(shifted);
                                        break;
                                    case "$":
                                        r[j].stress = word.value[i_1 + placeAfter].stress;
                                        word.value[i_1 + placeAfter].stress = 0;
                                        break;
                                    case "%":
                                        r[j].vowelLength = word.value[i_1 + placeAfter].vowelLength;
                                        word.value[i_1 + placeAfter].vowelLength = 8;
                                        break;
                                    case "@":
                                        r[j].tone = word.value[i_1 + placeAfter].tone;
                                        word.value[i_1 + placeAfter].tone = 0;
                                        break;
                                    default:
                                }
                            }
                            catch (e) {
                                throw new Error("Inflexp Magnet Error: ~" + special + " (from " + subgroups_1.magnetAfter + ") failed to take sounds from the next syllable.");
                            }
                        });
                    }
                    if (subgroups_1.specialMarkAfter !== undefined && subgroups_1.specialMarkAfter !== "")
                        r[j].postmark = word.specialMarkPlacer();
                }
                if (r.length > 0 && placeAfter === 0) {
                    result_1.push.apply(result_1, __spread(r));
                    result_1.push(word.value[i_1].copy());
                }
                else if (r.length > 0 && placeAfter === 1)
                    result_1.push.apply(result_1, __spread([word.value[i_1].copy()], r));
                else
                    result_1.push(word.value[i_1].copy());
                i_1++;
            });
            if (i_1 < word.value.length)
                result_1.push.apply(result_1, __spread(word.value.slice(i_1).map(function (syll) { return syll.copy(); })));
            word.value = result_1;
        }
        else if (groups.baseRepetition !== undefined) {
            var orig_1 = word.value.map(function (syll) { return syll.copy(); });
            (_a = groups.baseRepetition.match(pattern.baseRepetition)) === null || _a === void 0 ? void 0 : _a.forEach(function (subinflexp) {
                var _a, _b;
                var cpy = orig_1.map(function (syll) { return syll.copy(); });
                var willUnshift = false;
                for (var p = 0, q = (groups.baseRepetition.match(/\+/g) || []).length; p < q; p++)
                    cpy.push.apply(cpy, __spread(cpy.map(function (syll) { return syll.copy(); })));
                if (subinflexp.endsWith("=")) {
                    cpy[cpy.length - 1].postmark = word.specialMarkPlacer();
                    willUnshift = true;
                }
                if (subinflexp.startsWith("="))
                    cpy[0].premark = word.specialMarkPlacer();
                if (willUnshift)
                    (_a = word.value).unshift.apply(_a, __spread(cpy));
                else
                    (_b = word.value).push.apply(_b, __spread(cpy));
            });
        }
    };
    AbstractWord._infix = function (word, groups) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (groups.rightwardInfix !== undefined) {
            var subgroups = groups.rightwardInfix.match(pattern.rightwardInfix).groups, offset_1 = subgroups.offset.length, after = parseInt(subgroups.after), infx_1 = [];
            subgroups.content.replace(/(~(\$|%|@)?)*/gi, "").split(".").forEach(function (s) {
                if (s !== "")
                    infx_1.push.apply(infx_1, __spread(word.syllabifier(s)));
            });
            var n = infx_1.length;
            switch (after) {
                case 1:
                case 3:
                    word.value.splice(offset_1, 0, new Syllable_1.Syllable());
                    word.value[offset_1].onset = word.value[offset_1 + 1].onset;
                    word.value[offset_1 + 1].onset = [];
                    break;
                case 2:
                    word.value.splice(offset_1, 0, new Syllable_1.Syllable());
                    word.value[offset_1].onset = [word.value[offset_1 + 1].onset.shift()];
                    if (word.value[offset_1].onset[0] === undefined)
                        word.value[offset_1].onset = [];
                    break;
                case 4:
                case 6:
                    word.value.splice(offset_1 + 1, 0, new Syllable_1.Syllable());
                    word.value[offset_1 + 1].coda = word.value[offset_1].coda;
                    word.value[offset_1].coda = [];
                    break;
                case 5:
                    word.value.splice(offset_1 + 1, 0, new Syllable_1.Syllable());
                    if (word.value[offset_1].hasMultiphthong()) {
                        word.value[offset_1 + 1].nucleus = word.value[offset_1].nucleus.slice(1);
                        word.value[offset_1].nucleus.splice(1, word.value[offset_1].nucleus.length);
                    }
                    word.value[offset_1 + 1].coda = word.value[offset_1].coda;
                    word.value[offset_1].coda = [];
                    break;
                case 7:
                case 9:
                    break;
                case 8:
                    if (word.value[offset_1].hasCodaCluster()) {
                        word.value.splice(offset_1 + 1, 0, new Syllable_1.Syllable());
                        word.value[offset_1 + 1].coda = word.value[offset_1].coda.slice(1);
                        word.value[offset_1].coda.splice(1, word.value[offset_1].coda.length);
                    }
                    break;
                default:
            }
            (_a = word.value).splice.apply(_a, __spread([offset_1 + 1, 0], infx_1));
            var magnetOffset_1 = 0;
            if (word.value[offset_1 + 1].hasOnset()) {
                if (word.value[offset_1].hasOnset() && !word.value[offset_1].hasNucleus()) {
                    (_b = word.value[offset_1 + 1].onset).unshift.apply(_b, __spread(word.value[offset_1].onset));
                    word.value.splice(offset_1, 1);
                    n--;
                }
                else
                    magnetOffset_1 = 1;
            }
            else if (word.value[offset_1 + 1].hasNucleus()) {
                if (word.value[offset_1].hasOnset() && !word.value[offset_1].hasNucleus()) {
                    word.value[offset_1 + 1].onset = word.value[offset_1].onset;
                    word.value.splice(offset_1, 1);
                    n--;
                }
                else if (word.value[offset_1].hasNucleus() && !word.value[offset_1].hasCoda()) {
                    (_c = word.value[offset_1].nucleus).push.apply(_c, __spread(word.value[offset_1 + 1].nucleus));
                    word.value[offset_1].coda = word.value[offset_1 + 1].coda;
                    word.value.splice(offset_1 + 1, 1);
                    n--;
                }
                else
                    magnetOffset_1 = 1;
            }
            if ((offset_1 + n) < word.value.length) {
                if (word.value[offset_1 + n].hasOnset() && !word.value[offset_1 + n].hasNucleus()) {
                    if (subgroups.drop === "!")
                        word.value[offset_1 + n + 1].onset.shift();
                    else if (subgroups.drop === "!!" || subgroups.drop === "!!!")
                        word.value[offset_1 + n + 1].onset = [];
                    if (subgroups.drop === "!!!") {
                        word.value[offset_1 + n + 1].nucleus = [];
                        word.value[offset_1 + n + 1].coda = [];
                    }
                    (_d = word.value[offset_1 + n + 1].onset).unshift.apply(_d, __spread(word.value[offset_1 + n].onset));
                    word.value.splice(offset_1 + n, 1);
                }
                else if (word.value[offset_1 + n].hasNucleus() && !word.value[offset_1 + n].hasCoda()) {
                    if (!word.value[offset_1 + n + 1].hasOnset()) {
                        if (subgroups.drop === "!")
                            word.value[offset_1 + n + 1].nucleus.shift();
                        else if (subgroups.drop === "!!" || subgroups.drop === "!!!")
                            word.value[offset_1 + n + 1].nucleus = [];
                        if (subgroups.drop === "!!!")
                            word.value[offset_1 + n + 1].coda = [];
                        word.value[offset_1 + n + 1].onset = word.value[offset_1 + n].onset;
                        (_e = word.value[offset_1 + n + 1].nucleus).unshift.apply(_e, __spread(word.value[offset_1 + n].nucleus));
                        word.value.splice(offset_1 + n, 1);
                    }
                }
                else if (word.value[offset_1 + n].hasCoda()) {
                    if (!word.value[offset_1 + n + 1].hasOnset() && !word.value[offset_1 + n + 1].hasNucleus()
                        && word.value[offset_1 + n + 1].hasCoda()) {
                        if (subgroups.drop === "!")
                            word.value[offset_1 + n + 1].coda.shift();
                        else if (subgroups.drop === "!!" || subgroups.drop === "!!!")
                            word.value[offset_1 + n + 1].coda = [];
                        (_f = word.value[offset_1 + n].coda).push.apply(_f, __spread(word.value[offset_1 + n + 1].coda));
                        word.value.splice(offset_1 + n + 1, 1);
                    }
                }
            }
            subgroups.content.split(".").forEach(function (subiflexp, i) {
                var s = subiflexp.match(pattern.infixContent).groups;
                if (i === 0 && s.magnetBefore !== "" && s.main === "") {
                    s.magnetAfter = s.magnetBefore;
                    s.magnetBefore = "";
                    magnetOffset_1 = 0;
                }
                var j = offset_1 + i + magnetOffset_1;
                if (s.magnetBefore !== "") {
                    s.magnetBefore.split("~").slice(1).forEach(function (special) {
                        try {
                            switch (special) {
                                case "":
                                    if (word.value[j - 1].hasCoda())
                                        word.value[j].onset.unshift(word.value[j - 1].coda.pop());
                                    break;
                                case "$":
                                    word.value[j].stress = word.value[j - 1].stress;
                                    word.value[j - 1].stress = 0;
                                    break;
                                case "%":
                                    word.value[j].vowelLength = word.value[j - 1].vowelLength;
                                    word.value[j - 1].vowelLength = 8;
                                    break;
                                case "@":
                                    word.value[j].tone = word.value[j - 1].tone;
                                    word.value[j - 1].tone = 0;
                                    break;
                                default:
                            }
                        }
                        catch (e) {
                            throw new Error("Inflexp Magnet Error: ~" + special + " failed to take sounds from the earlier syllable.");
                        }
                    });
                }
                if (s.magnetAfter !== "") {
                    s.magnetAfter.split("~").slice(1).forEach(function (special) {
                        try {
                            switch (special) {
                                case "":
                                    if (word.value[j + 1].hasOnset())
                                        word.value[j].coda.push(word.value[j + 1].onset.shift());
                                    break;
                                case "$":
                                    word.value[j].stress = word.value[j + 1].stress;
                                    word.value[j + 1].stress = 0;
                                    break;
                                case "%":
                                    word.value[j].vowelLength = word.value[j + 1].vowelLength;
                                    word.value[j + 1].vowelLength = 8;
                                    break;
                                case "@":
                                    word.value[j].tone = word.value[j + 1].tone;
                                    word.value[j + 1].tone = 0;
                                    break;
                                default:
                            }
                        }
                        catch (e) {
                            throw new Error("Inflexp Magnet Error: ~" + special + " failed to take sounds from the next syllable.");
                        }
                    });
                }
            });
        }
        else if (groups.leftwardInfix !== undefined) {
            var subgroups = groups.leftwardInfix.match(pattern.leftwardInfix).groups, offset_2 = word.value.length - 1 - subgroups.offset.length, before = parseInt(subgroups.before), infx_2 = [];
            subgroups.content.replace(/(~(\$|%|@)?)*/gi, "").split(".").forEach(function (s) {
                if (s !== "")
                    infx_2.push.apply(infx_2, __spread(word.syllabifier(s)));
            });
            var n_1 = infx_2.length;
            switch (before) {
                case 1:
                case 2:
                    word.value.splice(offset_2, 0, new Syllable_1.Syllable());
                    break;
                case 3:
                    if (word.value[offset_2].hasMedial()) {
                        word.value.splice(offset_2, 0, new Syllable_1.Syllable());
                        word.value[offset_2].onset = word.value[offset_2 + 1].onset;
                        word.value[offset_2 + 1].onset = [word.value[offset_2].onset.pop()];
                    }
                    break;
                case 4:
                case 5:
                    word.value.splice(offset_2, 0, new Syllable_1.Syllable());
                    word.value[offset_2].onset = word.value[offset_2 + 1].onset;
                    word.value[offset_2 + 1].onset = [];
                    break;
                case 6:
                    word.value.splice(offset_2 + 1, 0, new Syllable_1.Syllable());
                    if (word.value[offset_2].hasMultiphthong())
                        word.value[offset_2 + 1].nucleus = [word.value[offset_2].nucleus.pop()];
                    word.value[offset_2 + 1].coda = word.value[offset_2].coda;
                    word.value[offset_2].coda = [];
                    break;
                case 7:
                case 8:
                    word.value.splice(offset_2 + 1, 0, new Syllable_1.Syllable());
                    word.value[offset_2 + 1].coda = word.value[offset_2].coda;
                    word.value[offset_2].coda = [];
                    break;
                case 9:
                    word.value.splice(offset_2 + 1, 0, new Syllable_1.Syllable());
                    word.value[offset_2 + 1].coda = [word.value[offset_2].coda.pop()];
                    if (word.value[offset_2 + 1].coda[0] === undefined)
                        word.value[offset_2 + 1].coda = [];
                    break;
                default:
            }
            (_g = word.value).splice.apply(_g, __spread([offset_2 + 1, 0], infx_2));
            var magnetOffset_2 = 0;
            if (word.value[0].isEmpty()) {
                word.value.splice(0, 1);
                magnetOffset_2--;
            }
            if ((offset_2 + n_1) < (word.value.length - 1)) {
                if (word.value[offset_2 + n_1].hasCoda()) {
                    if (word.value[offset_2 + n_1 + 1].hasCoda() && !word.value[offset_2 + n_1 + 1].hasNucleus()) {
                        (_h = word.value[offset_2 + n_1].coda).push.apply(_h, __spread(word.value[offset_2 + n_1 + 1].coda));
                        word.value.splice(offset_2 + n_1 + 1, 1);
                    }
                }
                else if (word.value[offset_2 + n_1].hasNucleus()) {
                    if (word.value[offset_2 + n_1 + 1].hasCoda() && !word.value[offset_2 + n_1 + 1].hasNucleus()) {
                        word.value[offset_2 + n_1].coda = word.value[offset_2 + n_1 + 1].coda;
                        word.value.splice(offset_2 + n_1 + 1, 1);
                    }
                    else if (word.value[offset_2 + n_1 + 1].hasNucleus() && !word.value[offset_2 + n_1 + 1].hasOnset()) {
                        (_j = word.value[offset_2 + n_1 + 1].nucleus).unshift.apply(_j, __spread(word.value[offset_2 + n_1].nucleus));
                        word.value[offset_2 + n_1 + 1].onset = word.value[offset_2 + n_1].onset;
                        word.value.splice(offset_2 + n_1, 1);
                    }
                }
            }
            if (word.value[offset_2 + 1].hasOnset() && !word.value[offset_2 + 1].hasNucleus()) { //word.value[offset + 1].onset is actually a coda
                if (subgroups.drop === "!")
                    word.value[offset_2].coda.pop();
                else if (subgroups.drop === "!!" || subgroups.drop === "!!!")
                    word.value[offset_2].coda = [];
                if (subgroups.drop === "!!!") {
                    word.value[offset_2].nucleus = [];
                    word.value[offset_2].onset = [];
                }
                (_k = word.value[offset_2].coda).push.apply(_k, __spread(word.value[offset_2 + 1].onset));
                word.value.splice(offset_2 + 1, 1);
                n_1--;
            }
            else if (word.value[offset_2 + 1].hasNucleus() && !word.value[offset_2 + 1].hasOnset()) {
                if (!word.value[offset_2].hasCoda()) {
                    if (subgroups.drop === "!")
                        word.value[offset_2].nucleus.pop();
                    else if (subgroups.drop === "!!" || subgroups.drop === "!!!")
                        word.value[offset_2].nucleus = [];
                    if (subgroups.drop === "!!!")
                        word.value[offset_2].onset = [];
                    word.value[offset_2].coda = word.value[offset_2 + 1].coda;
                    (_l = word.value[offset_2].nucleus).push.apply(_l, __spread(word.value[offset_2 + 1].nucleus));
                    word.value.splice(offset_2 + 1, 1);
                    n_1--;
                }
            }
            else if (word.value[offset_2 + 1].hasOnset()) {
                if (!word.value[offset_2].hasCoda() && !word.value[offset_2].hasNucleus()
                    && word.value[offset_2].hasOnset()) {
                    if (subgroups.drop === "!")
                        word.value[offset_2].onset.pop();
                    else if (subgroups.drop === "!!" || subgroups.drop === "!!!")
                        word.value[offset_2].onset = [];
                    (_m = word.value[offset_2 + 1].onset).unshift.apply(_m, __spread(word.value[offset_2].onset));
                    word.value.splice(offset_2, 1);
                    n_1--;
                }
            }
            subgroups.content.split(".").reverse().forEach(function (subiflexp, i) {
                var s = subiflexp.match(pattern.infixContent).groups;
                if (s.magnetBefore !== "" && s.main === "") {
                    s.magnetAfter = s.magnetBefore;
                    s.magnetBefore = "";
                }
                var j = offset_2 + n_1 - i + magnetOffset_2;
                if (s.magnetBefore !== "") {
                    s.magnetBefore.split("~").slice(1).forEach(function (special) {
                        try {
                            switch (special) {
                                case "":
                                    if (word.value[j - 1].hasCoda())
                                        word.value[j].onset.unshift(word.value[j - 1].coda.pop());
                                    break;
                                case "$":
                                    word.value[j].stress = word.value[j - 1].stress;
                                    word.value[j - 1].stress = 0;
                                    break;
                                case "%":
                                    word.value[j].vowelLength = word.value[j - 1].vowelLength;
                                    word.value[j - 1].vowelLength = 8;
                                    break;
                                case "@":
                                    word.value[j].tone = word.value[j - 1].tone;
                                    word.value[j - 1].tone = 0;
                                    break;
                                default:
                            }
                        }
                        catch (e) {
                            throw new Error("Inflexp Magnet Error: ~" + special + " failed to take sounds from the earlier syllable.");
                        }
                    });
                }
                if (s.magnetAfter !== "") {
                    s.magnetAfter.split("~").slice(1).forEach(function (special) {
                        try {
                            switch (special) {
                                case "":
                                    if (word.value[j + 1].hasOnset())
                                        word.value[j].coda.push(word.value[j + 1].onset.shift());
                                    break;
                                case "$":
                                    word.value[j].stress = word.value[j + 1].stress;
                                    word.value[j + 1].stress = 0;
                                    break;
                                case "%":
                                    word.value[j].vowelLength = word.value[j + 1].vowelLength;
                                    word.value[j + 1].vowelLength = 8;
                                    break;
                                case "@":
                                    word.value[j].tone = word.value[j + 1].tone;
                                    word.value[j + 1].tone = 0;
                                    break;
                                default:
                            }
                        }
                        catch (e) {
                            throw new Error("Inflexp Magnet Error: ~" + special + " failed to take sounds from the next syllable.");
                        }
                    });
                }
            });
        }
    };
    AbstractWord._prefix = function (word, groups) {
        var _a;
        if (groups.prefix !== undefined) {
            var prefx = word.syllabifier(groups.prefix), n_2 = prefx.length;
            if (n_2 > 0)
                (_a = word.value).unshift.apply(_a, __spread(prefx));
            var i_2 = n_2;
            if (groups.prefixMark !== "")
                word.value[n_2 - 1].postmark = word.specialMarkPlacer();
            groups.prefixPush.split(".").forEach(function (subinflexp, j) {
                var _a, _b, _c, _d, _e, _f;
                var _g, _h, _j;
                if (j === 0)
                    return;
                var subgroups = subinflexp.match(pattern.prefixPush).groups;
                if (subgroups.main !== "") {
                    var p = word.syllabifier(subgroups.main)[0];
                    if (p.hasCoda()) {
                        word.value[i_2].onset = p.onset;
                        word.value[i_2].nucleus = p.nucleus;
                        switch (subgroups.drop.length) {
                            case 0:
                                (_a = word.value[i_2].coda).unshift.apply(_a, __spread(p.coda));
                                break;
                            case 1:
                                word.value[i_2].coda.shift();
                                (_b = word.value[i_2].coda).unshift.apply(_b, __spread(p.coda));
                                break;
                            case 2:
                                word.value[i_2].coda = p.coda;
                                break;
                            default:
                                word.value[i_2] = new Syllable_1.Syllable();
                                word.value[i_2].coda = p.coda;
                        }
                    }
                    else if (p.hasNucleus()) {
                        word.value[i_2].onset = p.onset;
                        switch (subgroups.drop.length) {
                            case 0:
                                (_c = word.value[i_2].nucleus).unshift.apply(_c, __spread(p.nucleus));
                                break;
                            case 1:
                                word.value[i_2].nucleus.shift();
                                (_d = word.value[i_2].nucleus).unshift.apply(_d, __spread(p.nucleus));
                                break;
                            case 2:
                                word.value[i_2].nucleus = p.nucleus;
                                break;
                            default:
                                word.value[i_2] = new Syllable_1.Syllable();
                                word.value[i_2].nucleus = p.nucleus;
                        }
                    }
                    else if (p.hasOnset()) {
                        switch (subgroups.drop.length) {
                            case 0:
                                (_e = word.value[i_2].onset).unshift.apply(_e, __spread(p.onset));
                                break;
                            case 1:
                                word.value[i_2].onset.shift();
                                (_f = word.value[i_2].onset).unshift.apply(_f, __spread(p.onset));
                                break;
                            case 2:
                                word.value[i_2].onset = p.onset;
                                break;
                            default:
                                word.value[i_2] = new Syllable_1.Syllable;
                                word.value[i_2].onset = p.onset;
                        }
                    }
                }
                else {
                    switch (subgroups.drop.length) {
                        case 1:
                            word.value[i_2].onset.shift();
                            break;
                        case 2:
                            word.value[i_2].onset = [];
                            break;
                        case 3:
                            word.value.splice(i_2, 1);
                            break;
                        default:
                    }
                }
                var s = (_g = subgroups.specials.match(/\$(?<digits>[0-9]{1,2})/i)) === null || _g === void 0 ? void 0 : _g.groups;
                if (s !== undefined && s.digits !== undefined)
                    word.value[i_2].stress = parseInt(s.digits);
                var vl = (_h = subgroups.specials.match(/%(?<digits>[0-9]{1,2})/i)) === null || _h === void 0 ? void 0 : _h.groups;
                if (vl !== undefined && vl.digits !== undefined)
                    word.value[i_2].vowelLength = parseInt(vl.digits);
                var t = (_j = subgroups.specials.match(/@(?<digits>[0-9]{1,2})/i)) === null || _j === void 0 ? void 0 : _j.groups;
                if (t !== undefined && t.digits !== undefined)
                    word.value[i_2].tone = parseInt(t.digits);
                if (subgroups.specialMark !== "")
                    word.value[i_2].postmark = word.specialMarkPlacer();
                i_2++;
            });
            if (groups.prefixMagnet !== "") {
                groups.prefixMagnet.split("~").slice(1).forEach(function (special) {
                    try {
                        switch (special) {
                            case "":
                                var popped = word.value[n_2].onset.pop();
                                if (popped !== undefined)
                                    word.value[n_2 - 1].coda.push(popped);
                                break;
                            case "$":
                                word.value[n_2 - 1].stress = word.value[n_2].stress;
                                word.value[n_2].stress = 0;
                                break;
                            case "%":
                                word.value[n_2 - 1].vowelLength = word.value[n_2].vowelLength;
                                word.value[n_2].vowelLength = 8;
                                break;
                            case "@":
                                word.value[n_2 - 1].tone = word.value[n_2].tone;
                                word.value[n_2].tone = 0;
                                break;
                            default:
                        }
                    }
                    catch (e) {
                        throw new Error("Inflexp Magnet Error: ~" + special + " (from " + groups.prefixMagnet + ") failed to take sounds from the next syllable.");
                    }
                });
            }
        }
    };
    AbstractWord._suffix = function (word, groups) {
        var _a;
        if (groups.suffix !== undefined) {
            var l_1 = word.value.length, sufx = word.syllabifier(groups.suffix), n = sufx.length;
            if (n > 0)
                (_a = word.value).push.apply(_a, __spread(sufx));
            if (groups.suffixMark !== "")
                word.value[l_1].premark = word.specialMarkPlacer();
            var i_3 = l_1 - 1;
            groups.suffixPush.split(".").reverse().forEach(function (subinflexp, j) {
                var _a, _b, _c, _d, _e, _f;
                var _g, _h, _j;
                if (j === 0)
                    return;
                var subgroups = subinflexp.match(pattern.suffixPush).groups;
                if (subgroups.main !== "") {
                    var s_1 = word.syllabifier(subgroups.main)[0];
                    if (s_1.hasOnset() && s_1.hasNucleus()) {
                        word.value[i_3].coda = s_1.coda;
                        word.value[i_3].nucleus = s_1.nucleus;
                        switch (subgroups.drop.length) {
                            case 0:
                                (_a = word.value[i_3].onset).push.apply(_a, __spread(s_1.onset));
                                break;
                            case 1:
                                word.value[i_3].onset.pop();
                                (_b = word.value[i_3].onset).push.apply(_b, __spread(s_1.onset));
                                break;
                            case 2:
                                word.value[i_3].onset = s_1.onset;
                                break;
                            default:
                                word.value[i_3] = new Syllable_1.Syllable();
                                word.value[i_3].onset = s_1.onset;
                        }
                    }
                    else if (s_1.hasNucleus()) {
                        word.value[i_3].coda = s_1.coda;
                        switch (subgroups.drop.length) {
                            case 0:
                                (_c = word.value[i_3].nucleus).push.apply(_c, __spread(s_1.nucleus));
                                break;
                            case 1:
                                word.value[i_3].nucleus.pop();
                                (_d = word.value[i_3].nucleus).push.apply(_d, __spread(s_1.nucleus));
                                break;
                            case 2:
                                word.value[i_3].nucleus = s_1.nucleus;
                                break;
                            default:
                                word.value[i_3] = new Syllable_1.Syllable();
                                word.value[i_3].nucleus = s_1.nucleus;
                        }
                    }
                    else if (s_1.hasOnset() && !s_1.hasNucleus()) { // s.onset is actually a coda in this case
                        switch (subgroups.drop.length) {
                            case 0:
                                (_e = word.value[i_3].coda).push.apply(_e, __spread(s_1.onset));
                                break;
                            case 1:
                                word.value[i_3].coda.pop();
                                (_f = word.value[i_3].coda).push.apply(_f, __spread(s_1.onset));
                                break;
                            case 2:
                                word.value[i_3].coda = s_1.onset;
                                break;
                            default:
                                word.value[i_3] = new Syllable_1.Syllable();
                                word.value[i_3].coda = s_1.onset;
                        }
                    }
                }
                else {
                    switch (subgroups.drop.length) {
                        case 1:
                            word.value[i_3].coda.pop();
                            break;
                        case 2:
                            word.value[i_3].coda = [];
                            break;
                        case 3:
                            word.value.splice(i_3, 1);
                            break;
                        default:
                    }
                }
                var s = (_g = subgroups.specials.match(/\$(?<digits>[0-9]{1,2})/i)) === null || _g === void 0 ? void 0 : _g.groups;
                if (s !== undefined && s.digits !== undefined)
                    word.value[i_3].stress = parseInt(s.digits);
                var vl = (_h = subgroups.specials.match(/%(?<digits>[0-9]{1,2})/i)) === null || _h === void 0 ? void 0 : _h.groups;
                if (vl !== undefined && vl.digits !== undefined)
                    word.value[i_3].vowelLength = parseInt(vl.digits);
                var t = (_j = subgroups.specials.match(/@(?<digits>[0-9]{1,2})/i)) === null || _j === void 0 ? void 0 : _j.groups;
                if (t !== undefined && t.digits !== undefined)
                    word.value[i_3].tone = parseInt(t.digits);
                if (subgroups.specialMark !== "")
                    word.value[i_3].premark = word.specialMarkPlacer();
                i_3--;
            });
            if (groups.suffixMagnet !== "") {
                groups.suffixMagnet.split("~").slice(1).forEach(function (special) {
                    try {
                        switch (special) {
                            case "":
                                var popped = word.value[l_1 - 1].coda.pop();
                                if (popped !== undefined)
                                    word.value[l_1].onset.push(popped);
                                break;
                            case "$":
                                word.value[l_1].stress = word.value[l_1 - 1].stress;
                                word.value[l_1 - 1].stress = 0;
                                break;
                            case "%":
                                word.value[l_1].vowelLength = word.value[l_1 - 1].vowelLength;
                                word.value[l_1 - 1].vowelLength = 8;
                                break;
                            case "@":
                                word.value[l_1].tone = word.value[l_1 - 1].tone;
                                word.value[l_1 - 1].tone = 0;
                                break;
                            default:
                        }
                    }
                    catch (e) {
                        throw new Error("Inflexp Magnet Error: ~" + special + " (from " + groups.suffixMagnet + ") failed to take sounds from the next syllable.");
                    }
                });
            }
        }
    };
    return AbstractWord;
}());
exports.AbstractWord = AbstractWord;
//# sourceMappingURL=AbstractWord.js.map