function arrayEquals(arr1: string[], arr2: string[]) {
    return arr1.length === arr2.length && arr1.every((val, i) => val === arr2[i])
}

export class Syllable {
    
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

    codaIs (arr: string[]) {
        return arrayEquals(this.coda, arr)
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

    isEmpty () {
        return !this.hasOnset() && !this.hasNucleus() && !this.hasCoda()
    }

    hasCoda () {
        return this.coda.length > 0
    }

    hasCodaCluster () {
        return this.coda.length > 1
    }

    hasMedial () {
        return this.onset.length > 1
    }

    hasNucleus () {
        return this.nucleus.length > 0
    }

    hasMultiphthong () {
        return this.nucleus.length > 1
    }

    hasOnset () {
        return this.onset.length > 0
    }

    nucleusIs (arr: string[]) {
        return arrayEquals(this.nucleus, arr)
    }

    onsetIs (arr: string[]) {
        return arrayEquals(this.onset, arr)
    }
}