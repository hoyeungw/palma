import { CsvReg } from '../../utils/CsvReg'
import { DoubleQuoteReg } from '../../utils/DoubleQuoteReg'

export const parseCsvReg = (tx, de = ',', qt = '"') => {
  const
    regCsv = CsvReg(de, qt), // reg-exp to parse the CSV values, and delimiter default to comma.
    reqDQt = DoubleQuoteReg(qt), // reg-exp for double quotes
    rows = [] // data rows as 2-d array
  let
    matches, // array to hold individual pattern matching groups.
    sep, // captured separator, can be either delimiter or line-feed.
    qv, // captured quoted value.
    nq, // captured unquoted value.
    word, // final processed capture value.
    row = [] // data row.
  while (
    (matches = regCsv.exec(tx)) && // Loop the reg-exp matches until can find match no more.
    ([, sep, qv, nq] = matches)
    ) {
    if (sep && sep !== de) rows.push(row), row = [] // separator is line-feed, push new row.
    row.push(
      word = qv // check if the captured value is quoted.
        ? qv.replace(reqDQt, qt) // unescape any double quotes.
        : (nq || '').trim() // found a non-quoted value.
    ) // add the value string to the data array.
  }
  return rows  // Return the parsed data rows in 2-d array.
}
