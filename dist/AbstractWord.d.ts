import { Syllable } from "./Syllable";
export interface AbstractWordProps {
    base: string | Syllable[];
    syllabifier: (word: string) => Syllable[];
    printer: (value: Syllable[]) => string;
}
export declare abstract class AbstractWord {
    value: Syllable[];
    syllabifier: (word: string) => Syllable[];
    printer: (value: Syllable[]) => string;
    constructor(options: AbstractWordProps);
    protected abstract copy(): this;
    protected abstract syllabify(word: string): Syllable[];
    protected abstract toString(): string;
    protected abstract specialMarkPlacer(): string;
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
