export declare class Syllable {
    onset: string[];
    nucleus: string[];
    coda: string[];
    stress: number;
    vowelLength: number;
    tone: number;
    premark: string;
    postmark: string;
    constructor(onset?: string[], nucleus?: string[], coda?: string[], stress?: number, vowelLength?: number, tone?: number, premark?: string, postmark?: string);
    copy(): Syllable;
    isEmpty(): boolean;
    hasCoda(): boolean;
    hasCodaCluster(): boolean;
    hasMedial(): boolean;
    hasNucleus(): boolean;
    hasMultiphthong(): boolean;
    hasOnset(): boolean;
}
