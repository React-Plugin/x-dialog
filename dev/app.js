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
        mask={true}
        title={<div>我是标题啊</div>}
        closeIcon={"x"}
        >
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
          <div>You're looking at an example modal in the dashboard theme.</div>
        </Dialog>
      </div>
    )
  }
}
ReactDOM.render(<App />, appElement);