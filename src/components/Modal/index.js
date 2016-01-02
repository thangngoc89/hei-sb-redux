import { PropTypes } from 'react'
import Dialog from 'react-toolbox/lib/dialog'
import styles from './style.scss'

class ModalWrapper extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    size: PropTypes.string,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired,
    buttonStyle: PropTypes.string
  }

  static defaultProps = {
    buttonStyle: 'primary',
    size: 'normal'
  }

  render () {
    const actions = [{
      label: this.props.button,
      onClick: this.props.close,
      primary: (this.props.buttonStyle === 'primary'),
      accent: (this.props.buttonStyle === 'danger')
    }]

    return (
      <Dialog
        actions={actions}
        active={this.props.show}
        title={this.props.title}
        type={this.props.size}
        className={styles.modal}
      >
        {this.props.body}
      </Dialog>
    )
  }
}

export default ModalWrapper
