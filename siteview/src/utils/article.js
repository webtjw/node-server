import MarkdownIt from 'markdown-it';

const markdownCompiler = new MarkdownIt({html: true});

export function compileMarkdown (md) {
  return {__html: markdownCompiler.render(md)};
}