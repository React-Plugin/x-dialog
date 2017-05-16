import React from 'react';
import ReactDOM from 'react-dom';
import Seed from '../../lib/index';
import Style from '../../lib/index.css';
var appElement = document.getElementById('example');
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {show:false};
  }
  testFunc(){
    this.setState({show:!this.state.show});
  }
  render(){
    return  (
    <div>
      <button onClick={this.testFunc.bind(this)}>测试方法1</button>{this.state.show ? <Seed/> : undefined}
    </div>
    )
  }
}
ReactDOM.render(<App/>, appElement);
// var App = React.createClass({

//   getInitialState: function() {
//     return { show: false };
//   },

//   testFunc: function() {
//     this.setState({ show: true });
//   },

//   render: function() {
//     return (<div><button onClick={this.testFunc}>测试方法</button>{this.state.show ? <Seed/> : undefined}</div>)
//   }
// });

// ReactDOM.render(<App/>, appElement);


