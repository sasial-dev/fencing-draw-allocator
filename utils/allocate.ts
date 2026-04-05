import { arrayToShuffled } from "array-shuffle";

const VALID_PISTE_SIZES = [4, 6, 8]

export default function(names: string[], maxPistes: number): string[][] {
    const shuffedNames = arrayToShuffled(names)
    
    for (const fencersPerPiste of VALID_PISTE_SIZES) {
        if (Math.floor(shuffedNames.length / fencersPerPiste) > maxPistes) continue;
        
        const pistes: string[][] = []
        const remainder = shuffedNames.length % fencersPerPiste
        
        const fencersExcludingRemainer = shuffedNames.length - remainder
        const numberOfPistes = fencersExcludingRemainer / fencersPerPiste
        const spaceLeftOnEachPiste = (8 - fencersPerPiste) * numberOfPistes

        for (let i = 0; i < numberOfPistes; i++) {
            pistes.push(shuffedNames.slice(fencersPerPiste * i, fencersPerPiste * (i + 1)))
        }
         
        if (remainder <= spaceLeftOnEachPiste) {
            let piste = -1; 

            for (let i = fencersExcludingRemainer; i < shuffedNames.length; i += 2) {
                piste += 1
                piste %= numberOfPistes

                const firstRemainingFencer = shuffedNames[i]
                const secondRemainingFencer = shuffedNames[i + 1]

                if (firstRemainingFencer) pistes[piste]!.push(firstRemainingFencer)
                if (secondRemainingFencer) pistes[piste]!.push(secondRemainingFencer)
            }

            return pistes
        } else if (shuffedNames.length / fencersPerPiste <= maxPistes) {
            return [...pistes, shuffedNames.slice(fencersExcludingRemainer)]
        }
    }

    throw "Unable to sort!"
}
