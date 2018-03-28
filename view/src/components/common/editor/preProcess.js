const moreString = '<!-- more -->'

export default function (markdown, code) {
  let article = {
    title: null,
    description: null,
    codeText: null
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
  article.description = moreIndex > -1 ? mdWithoutTitle.slice(0, moreIndex) : ''
  article.body = mdWithoutTitle
  article.codeText = code
  return article
}
