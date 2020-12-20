"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Syllable = void 0;
var Syllable = /** @class */ (function () {
    function Syllable(onset, nucleus, coda, stress, vowelLength, tone, premark, postmark) {
        if (onset === void 0) { onset = []; }
        if (nucleus === void 0) { nucleus = []; }
        if (coda === void 0) { coda = []; }
        if (stress === void 0) { stress = 0; }
        if (vowelLength === void 0) { vowelLength = 8; }
        if (tone === void 0) { tone = 0; }
        if (premark === void 0) { premark = ""; }
        if (postmark === void 0) { postmark = ""; }
        this.onset = onset;
        this.nucleus = nucleus;
        this.coda = coda;
        this.stress = stress;
        this.vowelLength = vowelLength;
        this.tone = tone;
        this.premark = premark;
        this.postmark = postmark;
    }
    Syllable.prototype.copy = function () {
        return new Syllable(this.onset.map(function (ch) { return ch; }), this.nucleus.map(function (ch) { return ch; }), this.coda.map(function (ch) { return ch; }), this.stress, this.vowelLength, this.tone, this.premark, this.postmark);
    };
    Syllable.prototype.isEmpty = function () {
        return !this.hasOnset() && !this.hasNucleus() && !this.hasCoda();
    };
    Syllable.prototype.hasCoda = function () {
        return this.coda.length > 0;
    };
    Syllable.prototype.hasCodaCluster = function () {
        return this.coda.length > 1;
    };
    Syllable.prototype.hasMedial = function () {
        return this.onset.length > 1;
    };
    Syllable.prototype.hasNucleus = function () {
        return this.nucleus.length > 0;
    };
    Syllable.prototype.hasMultiphthong = function () {
        return this.nucleus.length > 1;
    };
    Syllable.prototype.hasOnset = function () {
        return this.onset.length > 0;
    };
    return Syllable;
}());
exports.Syllable = Syllable;
//# sourceMappingURL=Syllable.js.map