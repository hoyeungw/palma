export const CsvReg = (de, qt) => new RegExp(
  (
    `(\\${de}|\\r?\\n|\\r|^)` + // Delimiters
    `(?:${qt}([^${qt}]*(?:""[^${qt}]*)*)${qt}|` + // Quoted fields
    `([^"\\${de}\\r\\n]*))` // Standard fields
  ),
  'gi')

// const regexCsv = /(,|\x?\n|\x|^)(?:"([^"]*(?:""[^"]*)*)"|([^",\x\n]*))/gi
