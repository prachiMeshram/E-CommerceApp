import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const KEY =
  "pk_test_51NaBCbSIe47Fx8GAhpGlVglFgBk7lsZzPSLHDxsXY6ijTX6ZTMZh4Wu5R39hj3mHofrN5wh1UyGFq7eDcaErL9O6005hu6BNRj";

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
    // console.log(token);
  };  

  useEffect(() => {
    const makeRequest = async () => {
      try {   
        // console.log("hi");
        const res = await axios.post(
          "http://localhost:5000/api/checkout/payment",
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        // console.log("hi1");
        navigate("/success");
        // console.log("hi2");
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {stripeToken ? (
        <span>Processing. Please wait...</span>
      ) : (
        <StripeCheckout
          name="shoppy"
          image="https://cdn.pixabay.com/photo/2019/06/17/13/41/sale-4280006_1280.jpg"
          billingAddress
          shippingAddress
          description=" Your total is Rs 20 "
          amount={2000}
          token={onToken}
          stripeKey={KEY}
        >
          <button
            style={{
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Pay;
