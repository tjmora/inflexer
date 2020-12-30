import { Syllable } from "./Syllable";
export declare abstract class AbstractWord {
    value: Syllable[];
    constructor(base: string | Syllable[]);
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
