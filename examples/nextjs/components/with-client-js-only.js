import { PureComponent, Fragment } from 'react';

export default class WithClientJsOnly extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {isMounted: false};
  }

  componentDidMount() {
    this.setState({isMounted: true});
  }

  render() {
    if (!this.state.isMounted) {
      return null;
    }
    return <Fragment {...this.props}/>
  } 
};
