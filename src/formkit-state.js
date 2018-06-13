import React, {PureComponent} from 'react';
import reducer from './reducers';

export const connect = (mapStateToProps, mapDispatchToProps = noop) => {
  return BaseComponent => {
    class ComponentPlus extends PureComponent {
      constructor(props) {
        super(props);
        this.dispatch = this.dispatch.bind(this);
        const dispatchers = mapDispatchToProps(this.dispatch, props);
        Object.keys(dispatchers).forEach(key => {
          dispatchers[key] = dispatchers[key].bind(this);
        });
        this.dispatchers = dispatchers;
        this.state = {};
      }

      dispatch(action) {
        this.setState((state)=>(reducer(state, action)));
      }

      render() {
        const stateProps = mapStateToProps({form:this.state}, this.props);
        return <BaseComponent {...this.props} {...this.dispatchers} {...stateProps}/>
      }
    }
    return ComponentPlus;
  }
}

const noop = () => ({});
