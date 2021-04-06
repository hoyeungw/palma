export const csvReg = (de, qt) => {
  de = '\\' + de
  const qt2 = qt + qt
  const delimiter = `${ de }|\\r?\\n|\\r|^`
  const quotedFill = `[^${ qt }]*(?:${ qt2 }[^${ qt }]*)*`
  const standardContent = `[^${ qt }${ de }\\r\\n]*`
  return new RegExp(
    `(${ delimiter })(?:${ qt }(${ quotedFill })${ qt }|(${ standardContent }))`,
    'gi'
  )
}

// const regexCsv = /(,|\x?\n|\x|^)(?:"([^"]*(?:""[^"]*)*)"|([^",\x\n]*))/gi
