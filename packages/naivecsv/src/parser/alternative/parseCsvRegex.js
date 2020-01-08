// const regexCsv = /(,|\r?\n|\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^",\r\n]*))/gi
const csvRgLcher = (de, qt) => new RegExp((
  // Delimiters.
  `(\\${de}|\\r?\\n|\\r|^)` +
  // Quoted fields.
  `(?:${qt}([^${qt}]*(?:""[^${qt}]*)*)${qt}|` +
  // Standard fields.
  `([^"\\${de}\\r\\n]*))`
), 'gi')

// e.g. dqRg = /""/g
const dqRgLcher = (qt) => new RegExp(qt + qt, 'g')

export const parseCsvRegex = (tx, de = ',', qt = '"') => {
  // Check to see if the delimiter is defined. If not, then default to comma.
  // Create a regular expression to parse the CSV values.
  // Then create a 2-d array to hold our data.
  const csvRg = csvRgLcher(de, qt), dqRg = dqRgLcher(qt), mx = []
  // Create an array to hold our individual pattern matching groups.
  let matches, dl, el, nq, x, row = []
  // dl - Get the delimiter that was found.
  // el - captured quoted value
  // nq - captured unquoted value
  // x - final processed capture
  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while ((matches = csvRg.exec(tx))) {
    ([, dl, el, nq] = matches)
    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (dl.length && dl !== de) { // Since we have reached a new row of data,
      mx.push(row) // add an empty row to our data array.
      row = []
    }
    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we captured (quoted or unquoted).
    x = el // If we found a quoted value.
      ? el.replace(dqRg, qt) // When we capture this value, unescape any double quotes.
      : (nq || '').trim() // We found a non-quoted value.
    row.push(x) // Now that we have a value string, add it to the data array.
  }
  return mx  // Return the parsed data.
}
