import MarkdownIt from 'markdown-it';

const markdownCompiler = new MarkdownIt({html: true});
const moreString = '<!-- more -->';

export function compileMarkdown (md, isEdit) {
  const {title, description, codeText, body} = preProcess(md);
  if (isEdit) return {
    __html: markdownCompiler.render(title || codeText ? `<h1 class="article-title">${title}</h1>\n\n${body}` : ''),
    title,
    description,
    codeText
  }
  else return {__html: markdownCompiler.render(codeText)}
}

function preProcess (code) {
  const article = {
    title: null,
    description: null,
    codeText: null
  }
  // translate specific grammar which was customed by myself
  // translate: text alignment
  code = code.replace(/\*{2}(center|right)\n([\s\S]*)\n\*{2}/gi, (str, $1, $2) => {
    return `<div style="text-align: ${$1};">${markdownCompiler.render($2)}</div>`
  });
  // get title
  const regTitle = code.match(/^#t\s+([^\n]+)\n*/);
  if (Array.isArray(regTitle) && regTitle[1]) {
    article.title = regTitle[1].replace(/\s*$/, '')
  }
  // get the article content and description which excludes title
  let mdWithoutTitle = code;
  if (article.title) mdWithoutTitle = code.replace(/^#t[^\n]*(\n)*/, '');
  const moreIndex = mdWithoutTitle.indexOf(moreString);
  article.description = moreIndex > -1 ? mdWithoutTitle.slice(0, moreIndex) : '';
  article.body = mdWithoutTitle;
  article.codeText = code;
  return article;
}