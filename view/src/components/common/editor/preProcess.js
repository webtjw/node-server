const moreString = '<!-- more -->'

export default function (markdown, code) {
  let article = {
    title: null,
    description: null,
    whole: null
  }
  // translate specific grammar which was customed by myself
  // translate: text alignment
  code = code.replace(/\*{2}(center|right)\n([\s\S]*)\n\*{2}/gi, (str, $1, $2) => {
    return `<div style="text-align: ${$1};">${markdown.render($2)}</div>`
  })
  // get title
  const regTitle = code.match(/^#t\s+([^\n]+)\n*/)
  if (Array.isArray(regTitle) && regTitle[1]) {
    article.title = regTitle[1].replace(/\s*$/, '')
  }
  // get the article content and description which excludes title
  let mdWithoutTitle = code
  if (article.title) mdWithoutTitle = code.replace(/^#t[^\n]*(\n)*/, '')
  const moreIndex = mdWithoutTitle.indexOf(moreString)
  if (moreIndex > -1) {
    article.description = mdWithoutTitle.slice(0, moreIndex)
    article.whole = mdWithoutTitle.replace(moreString, '')
  } else article.whole = mdWithoutTitle
  return article
}
