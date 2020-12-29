import { Syllable } from "./Syllable";
export interface Orthography {
    syllabifier: (word: string) => Syllable[];
    printer: (value: Syllable[]) => string;
}
export interface AbstractWordProps {
    base: string | Syllable[];
    orthography: Orthography;
}
export declare abstract class AbstractWord {
    value: Syllable[];
    orthography: Orthography;
    constructor(options: AbstractWordProps);
    abstract copy(): this;
    abstract syllabify(word: string): Syllable[];
    abstract toString(): string;
    abstract specialMarkPlacer(): string;
    inflect(inflexp: string): void;
    static _repeat(word: AbstractWord, groups: {
        [key: string]: string;
    }): void;
    static _infix(word: AbstractWord, groups: {
        [key: string]: string;
    }): void;
    static _prefix(word: AbstractWord, groups: {
        [key: string]: string;
    }): void;
    static _suffix(word: AbstractWord, groups: {
        [key: string]: string;
    }): void;
}
