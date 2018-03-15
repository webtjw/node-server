export default function (markdown) {
  let article = {
    title: null
  }
  // get ttitle
  const regTitle = markdown.match(/^#t\s+([^\n]+)\n*/)
  if (Array.isArray(regTitle) && regTitle[1]) {
    article.title = regTitle[1].replace(/\s*$/, '')
  }
  // get description before 'more' boundary
  if (markdown.indexOf('<!-- more -->') > -1) {
    console.log('more')
  }
  return markdown
}
