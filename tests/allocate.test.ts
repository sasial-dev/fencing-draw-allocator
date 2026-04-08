import { describe, expect, test } from "vitest";
import type { TestContext } from "vitest";

function allocatePistes({ annotate, expect }: TestContext, fencers: number, maxPistes: number) {
    const names = Array.from({ length: fencers }, (_, i) => `Fencer ${i + 1}`);
    const pistes = allocate(names, maxPistes)
    
    annotate(JSON.stringify(pistes.map((piste) => piste.length)), "Piste Count")

    // make sure that fencers aren't assigned twice
    const allFencers = pistes.flat()
    expect(allFencers).toHaveLength(fencers)

    // make sure that *all* fencers are assigned
    const dedupedFencers = new Set(allFencers).size
    expect(dedupedFencers).toBe(fencers)

    return pistes
}

describe("Handles even numbers of fencers", () => {
    test("Sorts 36 fencers across 6 pistes", (context) => {
        const pistes = allocatePistes(context, 36, 6)

        expect(pistes).toHaveLength(6)

        for (const piste of pistes) {
            expect(piste).toHaveLength(6)
        }
    })

    test("Sorts 48 fencers across 6 pistes", (context) => {
        const pistes = allocatePistes(context, 48, 6)

        expect(pistes).toHaveLength(6)

        for (const piste of pistes) {
            expect(piste).toHaveLength(8)
        }
        
    })
})

describe("Handles odd numbers of fencers", () => {
    test("Sorts 33 fencers across 6 pistes", (context) => {
        const pistes = allocatePistes(context, 33, 6)

        expect(pistes).toHaveLength(5)

        expect(pistes[0]).toHaveLength(8)
        expect(pistes[1]).toHaveLength(7)
        expect(pistes[2]).toHaveLength(6)
        expect(pistes[3]).toHaveLength(6)
        expect(pistes[4]).toHaveLength(6)
    })

    test("Sorts 37 fencers across 6 pistes", (context) => {
        const pistes = allocatePistes(context, 37, 6)

        expect(pistes).toHaveLength(6)

        expect(pistes[0]).toHaveLength(7)
        expect(pistes[1]).toHaveLength(6)
        expect(pistes[2]).toHaveLength(6)
        expect(pistes[3]).toHaveLength(6)
        expect(pistes[4]).toHaveLength(6)
        expect(pistes[5]).toHaveLength(6)
    })
})

test("Handles a double remainer", (context) => {
    const pistes = allocatePistes(context, 23, 6)

    expect(pistes).toHaveLength(5)

    expect(pistes[0]).toHaveLength(6)
    expect(pistes[1]).toHaveLength(5)
    expect(pistes[2]).toHaveLength(4)
    expect(pistes[3]).toHaveLength(4)
    expect(pistes[4]).toHaveLength(4)
})

test("Handles recursively running the sort function", (context) => {
    const pistes = allocatePistes(context, 29, 6)

    expect(pistes).toHaveLength(5)

    expect(pistes[0]).toHaveLength(6)
    expect(pistes[1]).toHaveLength(6)
    expect(pistes[2]).toHaveLength(6)
    expect(pistes[3]).toHaveLength(6)
    expect(pistes[4]).toHaveLength(5)
})

test("Does not allocate all pistes", (context) => {
    const pistes = allocatePistes(context, 22, 6)

    expect(pistes).toHaveLength(5)

    expect(pistes[0]).toHaveLength(6)
    expect(pistes[1]).toHaveLength(4)
    expect(pistes[2]).toHaveLength(4)
    expect(pistes[3]).toHaveLength(4)
    expect(pistes[4]).toHaveLength(4)
})

test("Does not fill over the max piste size", (context) => {
    const pistes = () => allocatePistes(context, 51, 6)

    expect(pistes).toThrow("Unable to sort!")
})
