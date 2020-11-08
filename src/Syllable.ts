export default class Syllable {
    
    onset: string[]
    nucleus: string[]
    coda: string[]
    stress: number
    vowelLength: number
    tone: number
    premark: string
    postmark: string

    constructor (onset: string[] = [], nucleus: string[] = [], coda: string[] = [], 
        stress = 0, vowelLength = 8, tone = 0, premark = "", postmark = "") {
        
        this.onset = onset
        this.nucleus = nucleus
        this.coda = coda
        this.stress = stress
        this.vowelLength = vowelLength
        this.tone = tone
        this.premark = premark
        this.postmark = postmark
    }

    copy () {
        return new Syllable(
            this.onset.map(ch => ch),
            this.nucleus.map(ch => ch),
            this.coda.map(ch => ch),
            this.stress,
            this.vowelLength,
            this.tone,
            this.premark,
            this.postmark
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