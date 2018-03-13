export default function (markdown) {
  let article = {
    title: null
  }
  // get ttitle
  const regTitle = markdown.match(/^#t\s+([^\n]+)\n*/)
  if (Array.isArray(regTitle) && regTitle[1]) {
    article.title = regTitle[1].replace(/\s*$/, '')
  }
  console.log(article.title)
  return markdown
}
