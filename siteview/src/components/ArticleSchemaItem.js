import React, {Component} from 'react';
import PropTypes from 'prop-types';
import svgTag from '../assets/images/svg/svg-tag.svg';
import '../assets/style/articleSchemaItem.css';

class ArticleSchemaItem extends Component {
  articleTagClick (e, tag) {
    e.stopPropagation();
    console.log(this);
    this.props.history.push(`/tag/${tag}`);
  }

  render () {
    const {article} = this.props;

    return <li onClick={() => this.props.history.push(`/article/detail/${article.id}`)} className="article-schema-item font-16 pointer" data-flex="dir:left cross:center">
      <div data-flex-box="0" className="article-schema-title">{article.title}</div>
      {
        article.tags && article.tags.length ? <div className="tag-list font-13" data-flex-box="1" data-flex="dir:left cross:center">
          <img className="svg-14" src={svgTag} alt="tag"/>
          {
            article.tags.map(tag => <div key={tag} onClick={e => this.articleTagClick(e, tag)} data-flex-box="0" className="tag-another c-999">{tag}</div>)
          }
        </div> : null
      }
      <span className="time font-13" flex-box="0">{article.time}</span>
    </li>
  }
}

ArticleSchemaItem.propTypes = {
  article: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default ArticleSchemaItem;