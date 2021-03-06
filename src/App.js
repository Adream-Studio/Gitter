import React, { Component } from 'react';
import { Button, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { markdown } from 'markdown';
import { getFileList, readFile, isGitReady } from './utils/utils';

const basePath = './public/git';

const siderStyle = {
  width: '320px',
  background: '#222',
  color: '#fff',
  height: '100%',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};
const brandStyle = {
  textAlign: 'center',
  padding: '10px',
  fontSize: '18px',
  fontWeight: '580',
  borderBottom: '1px #333 solid',
};
const foldBtnStyle = {
  width: '100%',
};
const spreadBtnStyle = {
  padding: 0,
  borderRadius: '0',
};
const textareaStyle = {
  height: '100%',
  resize: 'none',
  borderRadius: 0,
  boxShadow: 'none',
};
const listStyle = {
  color: '#000',
  cursor: 'pointer',
  maxHeight: '80%',
  overflow: 'auto',
};
const previewStyle = {
  width: '50%',
  padding: 10,
  overflow: 'auto',
};

class App extends Component {
  state = {
    siderStatus: true,
    fileName: '',
    text: '',
    html: '',
    fileList: [],
  };

  componentDidMount() {
    const fileList = getFileList('./public/git');

    this.setState({ fileList });
  }

  handleFold = () => {
    this.setState({ siderStatus: false });
  };

  handleSpread = () => {
    this.setState({ siderStatus: true });
  };

  handleTextareaChange = e => {
    this.setState({
      text: e.target.value,
      html: markdown.toHTML(e.target.value),
    });
  };

  handleFileOpen = fileName => {
    const content = readFile(`${basePath}/${fileName}`);
    this.setState({
      fileName,
      text: content,
      html: markdown.toHTML(content),
    });
  }

  render() {
    const { siderStatus, fileName, text, html, fileList } = this.state;
    
    return (
      <div style={{ display: 'flex' ,height: '100%' }}>
        { siderStatus ? (
          <div style={siderStyle}>
            <div style={brandStyle}>Gitter 云笔记</div>
            <ListGroup style={listStyle}>
              {fileList.map((item, index) => (
                <ListGroupItem
                  action
                  key={index}
                  onClick={() => this.handleFileOpen(item)}
                >{
                  item
                }</ListGroupItem>
              ))}
            </ListGroup>
            <Button
              outline
              color="secondary"
              style={foldBtnStyle}
              onClick={this.handleFold}
            >
              收起
            </Button>
          </div>
        ) : (
          <Button onClick={this.handleSpread} style={spreadBtnStyle}>...</Button>
        ) }
        <div style={{ width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', background: '#222', color: '#fff' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '70%', paddingLeft: '20px' }}>
              <span>{ fileName }</span>
            </div>
            <div style={{ width: '100%', textAlign: 'right', padding: '5px' }}>
              <Button style={{ padding: '2px', margin: '0px 2px' }} color='primary'>新建</Button>
              {fileName !== '' && (<Button style={{ padding: '2px', margin: '0px 2px' }} color='danger' >删除</Button>)}
              {fileName !== '' && (<Button style={{ padding: '2px', margin: '0px 2px' }} color='success' >保存</Button>)}
            </div>
          </div>
          <div style={{ display: 'flex', width: '100%', height: '100%' }}>
            <div style={{ width: '50%' }}>
              <Input
                style={textareaStyle}
                type="textarea"
                onChange={this.handleTextareaChange}
                value={text}
              />
            </div>
            <div style={previewStyle} dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
