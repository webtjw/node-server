import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AsyncTips from './common/AsyncTips';
import {getAllTags} from '../request';
import '../assets/style/tag.css';

class TagIndex extends Component {
  constructor () {
    super();

    this.state = {
      tags: []
    }
  }

  loadData (data) { 
    this.setState({tags: data});
  }

  render () {
    const {tags} = this.state;

    return <AsyncTips action={async () => getAllTags()} callback={data => this.loadData(data)}>
      {
        tags.map(tag => <Link className="tag-index-item iblock font-16" to={`/tag/${tag.name}`} key={tag.id}>{tag.name}<span className="font-14">{`（${tag.number}）`}</span></Link>)
      }
    </AsyncTips>
  }
}

export default TagIndex;