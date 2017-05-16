import React from 'react';
import ReactDOM from 'react-dom';
import Dialog from '../src/index';
import '../src/_index.scss';

var appElement = document.getElementById('example');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
  }
  testFunc() {
    this.setState({ isShow:true });
  }
  render() {
    return (
      <div>
        <button onClick={this.testFunc.bind(this)}>测试方法</button>
        <Dialog 
        isShow={this.state.isShow}
        >
          内容
        </Dialog>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);