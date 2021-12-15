import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div className="header-conteny">
  
          <Link className='link' to=''>LOGO</Link>
      <nav>
        <Link className='link' to='/clients'>Clients</Link>
        <Link className='link' to='/orders'>Orders</Link>
      </nav>
      </div>
      
    </div>
  )
}

export default Header
