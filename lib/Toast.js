import React, {Component} from 'react'
import RootSiblings from 'react-native-root-siblings'
import ToastContainer, {position, duration} from './ToastContainer'

class Toast extends Component {
  static propTypes = ToastContainer.propTypes
  static position = position
  static duration = duration

  static showSuccess(message, options = {}) {
    this.show(message, {
      containerStyle: {
        minWidth: 106,
        minHeight: 106,
        backgroundColor: 'rgba(30,30,30,.85)'
      },
      imgStyle: {
        width: 45,
        height: 45
      },
      textStyle: {
        marginTop: 10
      },
      position: this.position.CENTER,
      imgSource: require('./icon_success.png'),
      ...options
    })
  }

  static showLoading(message, options = {}) {
    this.show(message, {
      containerStyle: {
        minWidth: 100,
        minHeight: 100,
        backgroundColor: 'rgba(30,30,30,.85)'
      },
      textStyle: {
        marginTop: 5,
        bottom: -5
      },
      mask: true,
      duration: 0,
      loading: true,
      position: this.position.CENTER,
      ...options
    })
  }

  static show(message, options = {}) {
    let onHidden = options.onHidden
    let toast
    options.onHidden = function () {
      toast && toast.destroy()
      onHidden && onHidden()
    }
    toast = new RootSiblings(
      <ToastContainer
        {...options}
        visible={true}
        showText={!!message}>
        {message}
      </ToastContainer>)
    this.toast = toast
    return toast
  }

  static hide() {
    if (this.toast instanceof RootSiblings) {
      this.toast.destroy()
    }
  }

  toast = null

  componentWillMount() {
    this.toast = new RootSiblings(
      <ToastContainer
        {...this.props}
        duration={0}
      />)
  };

  componentWillReceiveProps(nextProps) {
    this.toast.update(
      <ToastContainer
        {...nextProps}
        duration={0}/>)
  }

  componentWillUnmount() {
    this.toast.destroy()
  }

  render() {
    return null
  }
}

export {
  RootSiblings as Manager
}
export default Toast