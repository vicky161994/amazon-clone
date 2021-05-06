import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { Shippingaddressscreen } from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [batteryStatus, setBatteryStatus] = useState(100);
  const [batteryMessage, setBatteryMessage] = useState("");
  const [batteryChargingMessage, setBatteryChargingMessage] = useState("");
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const singoutHandler = async () => {
    dispatch(signout());
  };

  window.addEventListener("online", () => setIsOnline(true));
  window.addEventListener("offline", () => setIsOnline(false));
  window.addEventListener("levelchange", () =>
    navigator.getBattery().then((battery) => console.log(battery.level))
  );
  var batteryPromise;
  if ("getBattery" in navigator) {
    batteryPromise = navigator.getBattery();
  } else {
    batteryPromise = Promise.resolve(navigator.battery);
  }

  batteryPromise.then(function (battery) {
    battery.addEventListener("levelchange", () => {
      if (battery.level < 21 && battery.charging === false) {
        setBatteryStatus(battery.level * 100);
        setBatteryMessage(
          `${battery.level * 100}% battery left, Please plug the charger`
        );
      }
    });
    battery.addEventListener("chargingchange", () => {
      if (battery.charging) {
        setBatteryChargingMessage("Charging");
        setBatteryStatus(100);
      }
      if (battery.charging === false) {
        setBatteryChargingMessage("");
        setBatteryStatus(battery.level * 100);
      }
    });
  });

  if (isOnline) {
    setTimeout(() => {
      setIsOnline(undefined);
    }, 5000);
  }

  if (batteryChargingMessage !== "") {
    setTimeout(() => {
      setBatteryChargingMessage("");
      setBatteryStatus(100);
    }, 5000);
  }
  return (
    <BrowserRouter>
      {isOnline === false && (
        <div id="onlinediv1">
          <span id="onlinespan1">No internet connection</span>
        </div>
      )}
      {isOnline && (
        <div id="offlinediv1">
          <span id="offlinespan1">Back online</span>
        </div>
      )}

      {batteryStatus < 21 && (
        <div id="onlinediv1">
          <span id="offlinespan1">{batteryMessage}</span>
        </div>
      )}

      {batteryChargingMessage !== "" && (
        <div id="offlinediv1">
          <span id="offlinespan1">{batteryChargingMessage}</span>
        </div>
      )}
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              amazon
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <Link to="signout" onClick={singoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/shipping" component={Shippingaddressscreen} />
          <Route path="/payment" component={PaymentMethodScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} />

          <Route path="/" component={HomeScreen} exact />
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
