import sponsors from 'assets/img/ntt.png'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <p className='text-muted center-block'>
          Sponsored by
        </p>
        <img src={sponsors} style={{maxWidth: '100%', height: 'auto'}} />
        <p className='text-muted'>
          Handcrafted with <i className='fa fa-heart' style={{color: '#F00'}} />
          &nbsp;by <a href='http://khoanguyen.me' target='_blank'>Khoa Nguyen</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
