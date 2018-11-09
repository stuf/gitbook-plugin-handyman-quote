const mkAttr = ([k, v]) => `${k}="${v}"`;
const mkAttrs = as => as.map(mkAttr).join(' ');

const mkTag = type => (attrs, content) => `<${type} ${mkAttrs(attrs)}>${content}</${type}>`;

module.exports = {
  book: {
    assets: './assets'
  },

  blocks: {
    handyquote: {
      process: function (block) {
        const { kwargs } = block;
        const { credit, href, date } = kwargs;

        return this.renderBlock('markdown', block.body)
          .then(function (renderedBody) {
            const mkQuote = mkTag('blockquote');
            const mkDiv = mkTag('div');

            const bodyElem = mkDiv(
              [['class', 'block--quote__content']],
              renderedBody
            );

            const creditElem = mkDiv(
              [['class', 'block--quote__credit']],
              `— ${credit}`,
            );

            return mkQuote([], [bodyElem, creditElem].join('\n'));
          });
      }
    }
  }
};