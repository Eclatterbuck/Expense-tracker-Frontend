import { Link } from "react-router-dom"
import { login, logout } from "../services/firebase"

const Header = (props) => (
  <nav className="nav">
    <Link to="/">
      <div>People App</div>
    </Link>
    {
      props.user ?
        <>
          <button onClick={logout} style={{ marginLeft: 'auto' }}>Logout</button>
          <img
            src={props.user.photoURL}
            alt=""
            style={{
              height: '3rem',
              width: '3rem',
              borderRadius: '50%',
              marginLeft: 'auto'
            }}
          />
        </>
        :
        <button onClick={login}>Login</button>}

  </nav>
)

export default Header