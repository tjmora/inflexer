import { Syllable } from "./Syllable";
export declare abstract class AbstractWord {
    value: Syllable[];
    constructor(word: string | Syllable[]);
    /**
     * Inhereting classes should implement copy() as follows:
     *     copy () {
     *         return new ChildClass(this.value.map(syllable => syllable.copy())) as this
     *     }
     */
    protected abstract copy(): this;
    protected abstract syllabifier(param: string | ((word: string) => Syllable[])): Syllable[];
    protected abstract toString(param: null | ((value: Syllable[]) => string)): string;
    protected abstract specialMarkPlacer(): string;
    inflect(inflexp: string): this;
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
