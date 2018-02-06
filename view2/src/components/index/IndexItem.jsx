import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class IndexItem extends Component {
  makeListJSX (list) {
    if (Array.isArray(list) && list.length > 0) {
      return <article>
        {
          list.map(item => {
            return <div key={item.title} class="article-item p-v-20 p-h-20" data-flex="dir:left cross:center">
              <Link to={`/article/${item.id}`} class="title font-15 c-normal" data-flex-box="0">{item.title}</Link>
              <div class="tag p-l-20 p-r-4 bg-fff" data-flex-box="1" data-flex="dir:left cross:center">
                <vue-svg name="tag" class="svg-14 m-r-8"></vue-svg>
                {
                  item.tags.map(tag => <Link to={`/tags/${tag}`} class="tag-item m-r-8 font-10 c-normal">{tag}</Link>)
                }
                
              </div>
              <div class="p-l-10 font-12" data-flex-box="0">{item.time}</div>
            </div>
          })
        }
      </article>
    } else {
      return null
    }
  }
  render () {
    const {makeListJSX} = this;
    const {title, list} = this.props;

    return <div className="index-item p-b-10 m-b-20">
      <h1 class="a-c p-v-12 font-20">
        <div class="iblock p-h-14 p-v-8">{title}</div>
      </h1>
      {makeListJSX(list)}
    </div>
  }
}

IndexItem.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired
}

export default IndexItem;