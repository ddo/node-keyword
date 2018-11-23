/* global it */

const expect = require('expect.js')

const kw = require('../')

it('single', async () => {
    const keyword = 'k∑¥, qwerty'
    const exclude = '   exc, LUde,, '

    let ok = kw(
        'Lorem ipsum dolor sit amet, k∑¥word consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        keyword,
        exclude
    )
    expect(ok).to.be(true)

    ok = kw(
        'Lorem ipsum dolor sit amet, k∑¥ consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        keyword,
        exclude
    )
    expect(ok).to.be(true)
})

it('set', async () => {
    const keyword = 'k∑¥ && word'
    const exclude = 'exclue && 123'

    let ok = kw(
        'Lorem ipsum dolor sit amet, k∑¥ consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua word',
        keyword,
        exclude
    )
    expect(ok).to.be(true)

    ok = kw(
        'Lorem ipsum dolor sit amet, k∑¥word consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        keyword,
        exclude
    )
    expect(ok).to.be(true)
})

it('set sensitive', async () => {
    const keyword = 'K∑¥ && WORD'
    const exclude = 'EXCLUE && 123'

    let ok = kw(
        'Lorem ipsum dolor sit amet, K∑¥ consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua WORD',
        keyword,
        exclude,
        true
    )
    expect(ok).to.be(true)

    ok = kw(
        'Lorem ipsum dolor sit amet, K∑¥WORD consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua exclue 123',
        keyword,
        exclude,
        true
    )
    expect(ok).to.be(true)
})

it('set sensitive fail', async () => {
    const keyword = 'K∑¥ && WORD'
    const exclude = 'EXCLUE && 123'

    let ok = kw(
        'Lorem ipsum dolor sit amet, k∑¥ consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua word',
        keyword,
        exclude,
        true
    )
    expect(ok).to.be(false)

    ok = kw(
        'Lorem ipsum dolor sit amet, k∑¥word consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        keyword,
        exclude,
        true
    )
    expect(ok).to.be(false)
})

it('single fail', async () => {
    const keyword = 'k∑¥, qwerty'
    const exclude = '   exc, LUde,, '

    let ok = kw(
        'Lorem ipsum dolor sit amet, k∑¥word exclude consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        keyword,
        exclude
    )
    expect(ok).to.be(false)

    ok = kw(
        'Lorem ipsum dolor sit amet, k∑¥ EXCLUDE consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        keyword,
        exclude
    )
    expect(ok).to.be(false)
})

it('set fail', async () => {
    const keyword = 'k∑¥ && word'
    const exclude = 'exclude && 123'

    let ok = kw(
        'Lorem ipsum dolor sit amet, k∑¥word exclude consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua 123',
        keyword,
        exclude
    )
    expect(ok).to.be(false)

    ok = kw(
        'Lorem ipsum dolor sit amet, k∑¥ EXCLUDE consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua 123',
        keyword,
        exclude
    )
    expect(ok).to.be(false)
})

it('single empty', async () => {
    const keyword = ''
    const exclude = ''

    let ok = kw(
        'Lorem ipsum dolor sit amet',
        keyword,
        exclude
    )
    expect(ok).to.be(true)

    ok = kw(
        '',
        keyword,
        exclude
    )
    expect(ok).to.be(true)
})

it('set empty', async () => {
    const keyword = ',,,&&,,'
    const exclude = '&&,,,'

    let ok = kw(
        'Lorem ipsum dolor sit amet',
        keyword,
        exclude
    )
    expect(ok).to.be(true)

    ok = kw(
        '',
        keyword,
        exclude
    )
    expect(ok).to.be(true)
})

it('single empty keyword', async () => {
    const keyword = ''
    const exclude = 'exclude'

    let ok = kw(
        'Lorem ipsum dolor sit amet',
        keyword,
        exclude
    )
    expect(ok).to.be(true)

    ok = kw(
        '',
        keyword,
        exclude
    )
    expect(ok).to.be(true)

    ok = kw(
        'exclude',
        keyword,
        exclude
    )
    expect(ok).to.be(false)
})

it('set empty keyword', async () => {
    const keyword = ''
    const exclude = 'exclude && 123'

    let ok = kw(
        'Lorem ipsum dolor sit amet',
        keyword,
        exclude
    )
    expect(ok).to.be(true)

    ok = kw(
        '',
        keyword,
        exclude
    )
    expect(ok).to.be(true)

    ok = kw(
        'exclude 123',
        keyword,
        exclude
    )
    expect(ok).to.be(false)
})

it('single empty exclude', async () => {
    const keyword = 'keyword'
    const exclude = ''

    let ok = kw(
        'Lorem ipsum dolor sit amet',
        keyword,
        exclude
    )
    expect(ok).to.be(false)

    ok = kw(
        '',
        keyword,
        exclude
    )
    expect(ok).to.be(false)

    ok = kw(
        'keyword',
        keyword,
        exclude
    )
    expect(ok).to.be(true)
})

it('set empty exclude', async () => {
    const keyword = 'keyword && 123'
    const exclude = ''

    let ok = kw(
        'Lorem ipsum dolor sit amet',
        keyword,
        exclude
    )
    expect(ok).to.be(false)

    ok = kw(
        '',
        keyword,
        exclude
    )
    expect(ok).to.be(false)

    ok = kw(
        '123 keyword',
        keyword,
        exclude
    )
    expect(ok).to.be(true)
})