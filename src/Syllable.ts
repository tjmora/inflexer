export default class Syllable {
    
    onset: string[]
    nucleus: string[]
    coda: string[]
    stress: number
    vowelLength: number
    tone: number
    marks: [string, number][]

    constructor (onset: string[] = [], nucleus: string[] = [], coda: string[] = [], 
        stress: number = 0, vowelLength: number = 8, tone: number = 0, marks: [string, number][] = []) {
        
        this.onset = onset
        this.nucleus = nucleus
        this.coda = coda
        this.stress = stress
        this.vowelLength = vowelLength
        this.tone = tone
        this.marks = marks
    }

    copy () {
        return new Syllable(
            this.onset.map(ch => ch),
            this.nucleus.map(ch => ch),
            this.coda.map(ch => ch),
            this.stress,
            this.vowelLength,
            this.tone,
            this.marks.map(item => [item[0] as string, item[1] as number])
        )
    }

    hasCoda () {
        return this.coda.length > 0
    }

    hasMedial () {
        return this.onset.length > 1
    }

    hasOnset () {
        return this.onset.length > 0
    }
}