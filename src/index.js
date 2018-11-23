module.exports = check

const SEPARATOR_OR = ','
const SEPARATOR_AND = '&&'

// parse and trim
function parse(str) {
    const keywords = []

    // split AND
    const andArr = str.split(SEPARATOR_AND)
        .map(s => s.trim())
        .filter(s => s.length > 0)

    // split OR
    for (const and of andArr) {
        const orArr = and.split(SEPARATOR_OR)
            .map(s => s.trim())
            .filter(s => s.length > 0)

        // skip empty
        if (orArr.length === 0) {
            continue
        }

        keywords.push(orArr)
    }

    return keywords
}

function testSet(str, keywords) {
    for (const keywordArr of keywords) {
        if (!test(str, keywordArr)) return false
    }

    return true
}

function test(str, keywordArr) {
    for (const keyword of keywordArr) {
        if (str.includes(keyword)) return true
    }

    return false
}

function checkKeywords(str, keywords) {
    if (keywords.length === 0) return true
    return testSet(str, keywords)
}

function checkExcludes(str, excludes) {
    if (excludes.length === 0) return false
    return testSet(str, excludes)
}

function check(str, keyword, exclude = '', insensitive = false) {
    if (!insensitive) {
        str = str.toLowerCase()
        keyword = keyword.toLowerCase()
        exclude = exclude.toLowerCase()
    }

    const keywords = parse(keyword)
    const excludes = parse(exclude)

    return checkKeywords(str, keywords) && !checkExcludes(str, excludes)
}