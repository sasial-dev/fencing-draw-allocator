import { arrayToShuffled } from "array-shuffle";

// We allow odd numbered pistes only when dealing with remainders
const VALID_PISTE_SIZES = [4, 6, 8]

const minimumPisteSize = Math.min(...VALID_PISTE_SIZES)
const maximumPisteSize = Math.max(...VALID_PISTE_SIZES)

export default function allocate(names: string[], maxPistes: number): string[][] {
    const shuffedNames = arrayToShuffled(names)
    const totalFencers = shuffedNames.length

    for (const fencersPerPiste of VALID_PISTE_SIZES) {
        const numberOfPistes = Math.floor(totalFencers / fencersPerPiste)
        if (numberOfPistes > maxPistes) continue;

        const pistes: string[][] = []

        const fencersExcludingRemainer = fencersPerPiste * numberOfPistes
        const spaceLeftOnAllPistes = (maximumPisteSize - fencersPerPiste) * numberOfPistes

        const remainingFencers = totalFencers - fencersExcludingRemainer
        const remainingPistes = maxPistes - numberOfPistes

        for (let i = 0; i < numberOfPistes; i++) {
            pistes.push(shuffedNames.slice(fencersPerPiste * i, fencersPerPiste * (i + 1)))
        }

        if (!remainingFencers) return pistes;

        if (remainingPistes >= 1 && remainingFencers >= minimumPisteSize) {
            try {
                const remainingPisteAllocations = allocate(shuffedNames.slice(fencersExcludingRemainer), remainingPistes)
                return [...pistes, ...remainingPisteAllocations]
            } catch (_err) {
                // It is okay for this function to to error as if it does then we will
                // try to allocate fencers by adding them onto the remaining pistes
            }
        }

        if (spaceLeftOnAllPistes >= remainingFencers) {
            let piste = -1; 

            for (let i = fencersExcludingRemainer; i < totalFencers; i += 2) {
                piste += 1
                piste %= numberOfPistes

                const firstRemainingFencer = shuffedNames[i]
                const secondRemainingFencer = shuffedNames[i + 1]

                if (firstRemainingFencer) pistes[piste]!.push(firstRemainingFencer)
                if (secondRemainingFencer) pistes[piste]!.push(secondRemainingFencer)
            }

            return pistes
        }
    }

    throw "Unable to sort!"
}
