import { PropTypes } from 'react'
import { connect } from 'react-redux'
import Modal from 'components/Modal'
import { actions as alertActions } from 'redux/modules/alert'
import shouldPureComponentUpdate from 'react-pure-render/function'

class ModalContainer extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate

  static propTypes = {
    show: PropTypes.bool,
    close: PropTypes.func,
    message: PropTypes.string,
    title: PropTypes.string,
    button: PropTypes.string,
    buttonStyle: PropTypes.string
  }

  render () {
    return (
      <div>
      {this.props.show &&
        <Modal
          body={this.props.message}
          {...this.props}
        />
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.alert
})

export default connect(mapStateToProps, alertActions)(ModalContainer)
