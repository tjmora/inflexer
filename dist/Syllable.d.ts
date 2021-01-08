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
    codaIs(arr: string[]): boolean;
    copy(): Syllable;
    isEmpty(): boolean;
    hasCoda(): boolean;
    hasCodaCluster(): boolean;
    hasMedial(): boolean;
    hasNucleus(): boolean;
    hasMultiphthong(): boolean;
    hasOnset(): boolean;
    nucleusIs(arr: string[]): boolean;
    onsetIs(arr: string[]): boolean;
}
