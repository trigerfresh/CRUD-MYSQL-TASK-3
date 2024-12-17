import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { Navbar, Container, Nav, Badge, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useContext } from 'react'
import { Store } from './Store'
import CartScreen from './screens/CartScreen'
import SigninScreen from './screens/SignInScreen'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ShippingAddressScreen from './screens/ShippingAddressScreen'

function App() {
  const {state, dispatch: ctxDispatch} = useContext(Store)
  const {cart, userInfo} = state

  const signoutHandler = (e)=>{
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
  }

  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position='bottom-center' limit={1}/>
        <header className="App-header">
          <Navbar className="bg-dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="text-light">Amazon</Navbar.Brand>
              </LinkContainer>

              <Nav className = 'me-auto'>
                <Link to="/cart" className='nav-link text-light'>Cart{cart.cartItems.length>0 && (
                  <Badge pill bg='danger'>{cart.cartItems.reduce((a, c)=>a + c.quantity, 0)}</Badge>
                )}</Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to='/profile'>
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/orderhistory'>
                    <NavDropdown.Item  >Order History</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider/>
                    <Link className='dropdown-item' to= "#signout" onClick={signoutHandler}>Sign Out</Link>
                  </NavDropdown>
                ):(
                  <Link className='nav-link' to='signin'>Sing In</Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main className='mt-3'>
          <Container>
            <Routes>
              <Route path={'/product/:slug'} element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All right reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
