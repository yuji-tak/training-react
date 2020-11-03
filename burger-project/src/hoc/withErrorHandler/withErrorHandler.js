import React, { Component } from 'react';

import Modal from '../../Components/UI/modal/_Modal';

// WrappedComponentはコンポーネントのロジックを再利用するためのReactにおける応用テクニック
const withErrorHandler = ( WrappedComponent, axios ) => {

  return class extends Component {
    state = {
      error: null
    }

    // ComponentがDOMツリーに追加された状態で呼ばれるので、DOMに関わる初期化処理を行いたい時に便利
    componentDidMount () {
      // this.reqInterceptorプロパティ
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    // ComponentがDOMから削除される時に呼ばれる
    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <>
          <Modal
            show={ this.state.error }
            modalClosed={ this.errorConfirmedHandler } >
            { this.state.error ? this.state.error.message : null }
          </Modal>
          {/* この属性？何？ */}
          <WrappedComponent { ...this.props } />
        </>
      );
    }
  }

};

export default withErrorHandler;
