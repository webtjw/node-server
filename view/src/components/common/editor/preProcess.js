const moreString = '<!-- more -->'

export default function (markdown) {
  let article = {
    title: null,
    description: null,
    whole: null
  }
  // get title
  const regTitle = markdown.match(/^#t\s+([^\n]+)\n*/)
  if (Array.isArray(regTitle) && regTitle[1]) {
    article.title = regTitle[1].replace(/\s*$/, '')
  }
  // get the article content and description which excludes title
  let mdWithoutTitle = markdown
  if (article.title) mdWithoutTitle = markdown.replace(/^#t[^\n]*(\n)*/, '')
  const moreIndex = mdWithoutTitle.indexOf(moreString)
  if (moreIndex > -1) {
    article.description = mdWithoutTitle.slice(0, moreIndex)
    article.whole = mdWithoutTitle.replace(moreString, '')
  } else article.whole = mdWithoutTitle
  return article
}
