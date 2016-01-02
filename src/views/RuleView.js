import { Link } from 'react-router'
import styles from './RuleView.scss'
import rules from 'assets/markdown/rules.md'
import CSSModules from 'react-css-modules'
import { Button } from 'react-toolbox/lib/button'

class RuleView extends React.Component {
  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12' styleName='header'>
            <p styleName='title'>Spelling Bee <em>2016</em></p>
            <p styleName='sub-title'>hosted by H.E.I. English Speaking Club, UMP, HCMC</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-12 col-sm-10 col-md-8 col-lg-6 center-block'>
            <div className='material-box'>
              <div dangerouslySetInnerHTML={{__html: rules}}></div>
              <Link to='/login'>
                <Button raised primary className='btn-block'>Ready</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(RuleView, styles)
