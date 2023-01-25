import { testProp, fc } from 'ava-fast-check'

import { sdk } from '../../src/index'

testProp.skip(
    'TODO: property-test sdk',
    [
        // arbitraries
        fc.nat(),
    ],
    (
        t,
        // test arguments
        natural,
    ) => {
        // ava test here
    },
    {
        verbose: true,
    },
)
