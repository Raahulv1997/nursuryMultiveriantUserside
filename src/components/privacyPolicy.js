import React from "react";
import Footer from "./common/footer";
import Otherbannner from "./common/otherbannner";
import Header from "./common/header";
function PrivacyPolicy() {
  //   const [activeTab, setActiveTab] = useState("");

  /*Function to scrool by click on the content */
  //   const handleTabClick = (tabId) => {
  //     setActiveTab(tabId);
  //     const element = document.getElementById(tabId);
  //     element.scrollIntoView({ behavior: "smooth" });
  //   };

  return (
    <div>
      {/* Header */}
      <Header />
      {/* Banner */}
      <Otherbannner heading={"Checkout"} bread={"checkout"} />

      {/* Main Content */}
      <section className="inner-section privacy-part">
        <div className="container">
          <div className="row">
            <h3>TERMS AND CONDITIONS</h3>

            <h4>1. Introduction</h4>
            <p>
              1.1 These Terms and Conditions ("Agreement") govern your use of
              our ecommerce website, including the purchase of nursery plants,
              seeds, tools, and fertilizers ("Products") available on the
              website. This Agreement constitutes a legally binding agreement
              between you and India ki Nursery ("Company").
            </p>
            <p>
              1.2 By accessing or using our website and purchasing Products, you
              agree to comply with and be bound by all the terms and conditions
              stated herein.
            </p>

            <h4>2. Product Information</h4>
            <p>
              2.1 The Company provides information about the Products, including
              descriptions, images, and prices, to the best of its knowledge and
              ability. However, the accuracy, completeness, and suitability of
              the information provided cannot be guaranteed. It is your
              responsibility to ensure that the Products meet your requirements.
            </p>
            <p>
              2.2 The Company reserves the right to modify or discontinue any
              Products at any time without prior notice. The availability and
              pricing of Products are subject to change without notice.
            </p>

            <h4>3. Orders and Payment</h4>
            <p>
              3.1 By placing an order through our website, you are making an
              offer to purchase the selected Products. All orders are subject to
              acceptance by the Company. The Company reserves the right to
              refuse or cancel any order for any reason, including but not
              limited to availability, pricing errors, or suspected fraudulent
              activity.
            </p>
            <p>
              3.2 Prices listed on the website are in the local currency and are
              exclusive of applicable taxes, shipping, and handling charges. You
              agree to pay the total amount specified at the time of placing the
              order, including any additional charges.
            </p>
            <p>
              3.3 Payment can be made using the available payment methods
              specified on the website. By providing your payment information,
              you represent and warrant that you are authorized to use the
              selected payment method.
            </p>

            <h4>4. Shipping and Delivery</h4>
            <p>
              4.1 The Company will make reasonable efforts to deliver the
              Products within the estimated delivery timeframe. However,
              delivery dates are not guaranteed and may vary depending on
              various factors, including product availability, shipping method,
              and destination.
            </p>
            <p>
              4.2 The risk of loss and title for the Products pass to you upon
              delivery. It is your responsibility to provide accurate shipping
              information and ensure someone is available to receive the
              delivery.
            </p>

            {/* <h4>5. Returns and Refunds</h4>
            <p>
              5.1 The Company strives to provide quality Products. If you
              receive damaged or defective items, please contact our customer
              support within [number of days] from the date of delivery to
              initiate the return process.
            </p>
            <p>
              5.2 Returns and refunds are subject to the Company's Return
              Policy, which can be found on the website. The Company reserves
              the right to refuse returns that do not comply with the Return
              Policy.
            </p> */}

            <h4>6. Intellectual Property</h4>
            <p>
              6.1 All content on the website, including text, graphics, logos,
              images, and software, is the property of the Company or its
              licensors and is protected by intellectual property laws. You are
              granted a limited, non-exclusive, non-transferable license to
              access and use the website solely for personal and non-commercial
              purposes.
            </p>
            <p>
              6.2 You may not reproduce, modify, distribute, display, or exploit
              any content on the website without the prior written consent of
              the Company.
            </p>

            <h4>7. Disclaimer of Warranties</h4>
            <p>
              7.1 The Products and information provided on the website are
              provided on an "as is" and "as available" basis. The Company
              disclaims all warranties, express or implied, including but not
              limited to warranties of merchantability, fitness for a particular
              purpose, and non-infringement.
            </p>
            <p>
              7.2 The Company does not warrant that the website will be
              error-free, uninterrupted, or free of viruses or other harmful
              components.
            </p>

            <h4>8. Contact Information</h4>
            <p>
              If you have any questions or concerns regarding these terms and
              conditions, please contact us via given contact form in the
              website.
            </p>
            {/* <ul>
              <li>Email: [email protected]</li>
              <li>Phone: [+91 XXXXXXXXXX]</li>
              <li>Address: [Your Company Address]</li>
            </ul> */}
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
