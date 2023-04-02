export default class DiceCoefficient {

    private static similarity(origin: string, compare: string) {
        const [length1, length2] = [origin.length, compare.length]

        // Value 1 and Value 2 are the same -> 100% equal
        if (origin === compare) return 1

        // Bigrams can't be compared because they need 2 values -> 0% equal
        if (length1 < 2 || length2 < 2) if (compare.startsWith(origin)) return 1

        if (origin.substr(0, 2) === compare.substr(0, 2)) return 1

        let originBigrams = new Map();

        /* Get the intersecting character (two strings as a group) --> Bigrams
        * E.g.: The characters of the word "night" will be double grouped -> {ni,ig,gh,ht}*/
        for (let i = 0; i < length1 - 1; i++) {
            const bigram = origin.substr(i, 2)
            const count = originBigrams.has(bigram) ? originBigrams.get(bigram) + 1 : 1
            originBigrams.set(bigram, count)
        }

        // The intersection amount of both opponents
        let intersectionSize = 0

        // Bigram of the second string
        for (let i = 0; i < length2 - 1; i++) {
            const bigram = compare.substr(i, 2)
            const count = originBigrams.has(bigram) ? originBigrams.get(bigram) : 0

            if (count > 0) {
                originBigrams.set(bigram, count - 1)
                intersectionSize++
            }
        }

        // Calculate s
        return (2.0 * intersectionSize) / (length1 + length2 - 2)
    }

    public static distance(origin: string, compare: string) {
        // Clear white space characters and to lower case
        origin = DiceCoefficient.initParams(origin, compare)[0]
        compare = DiceCoefficient.initParams(origin, compare)[1]

        return this.similarity(origin, compare)
    }

    // Clear white space characters and to lower case
    private static initParams(origin: string, compare: string) {
        return [
            origin.replace(/\s+/g, '').toLowerCase(),
            compare.replace(/\s+/g, '').toLowerCase(),
        ]
    }
}