import * as React from "react";
import {PureComponent} from "react";
import reducer from "./reducers";

const connect = (mapStateToProps, mapDispatchToProps: (a: any, b: any) => {} = noop): any => {
  return (BaseComponent): any => {
    class ComponentPlus extends PureComponent {

      public dispatchers: any;

      constructor(props) {
        super(props);
        this.dispatch = this.dispatch.bind(this);
        const dispatchers = mapDispatchToProps(this.dispatch, props);
        Object.keys(dispatchers).forEach((key) => {
          dispatchers[key] = dispatchers[key].bind(this);
        });
        this.dispatchers = dispatchers;
        this.state = {};
      }

      public dispatch(action) {
        this.setState((state) => (reducer(state, action)));
      }

      public render() {
        const stateProps = mapStateToProps({form: this.state}, this.props);
        return <BaseComponent {...this.props} {...this.dispatchers} {...stateProps}/>;
      }
    }
    return ComponentPlus;
  };
};

const noop = () => ({});

export default connect;
