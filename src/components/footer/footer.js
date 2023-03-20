import React from "react";
import './footer.css';


function Footer(props) {
    return (
        <div>
            {/* <!-- Footer --> */}
            <footer className="text-center mt-10 " style={{ marginTop: '6%', backgroundColor: '#0097a3' }}>
                {/* <!-- Grid container --> */}
                <div className="container p-4">

                    {/* <!-- Section: Form --> */}
                    <section className="">
                        <form action="">
                            {/* <!--Grid row--> */}
                            <div className="row d-flex justify-content-center">
                                {/* <!--Grid column--> */}
                                <div className="col-auto">
                                    <p className="pt-2 font-white-" >
                                        <strong>Get In Touch</strong>
                                    </p>
                                </div>
                                {/* <!--Grid column--> */}

                                {/* <!--Grid column--> */}
                                <div className="col-md-5 col-12">
                                    {/* <!-- Email input --> */}
                                    <div className="form-outline mb-4">
                                        <input type="email" id="form5Example2" className="form-control" />
                                        {/* <label className="form-label" htmlFor="form5Example2">Email address</label> */}
                                    </div>
                                </div>
                                {/* <!--Grid column--> */}

                                {/* <!--Grid column--> */}
                                <div className="col-auto">
                                    {/* <!-- Submit button --> */}
                                    <button type="submit" className="btn btn-light mb-4 footer-btn">
                                        Email
                                    </button>
                                </div>
                                {/* <!--Grid column--> */}
                            </div>
                            {/* <!--Grid row--> */}
                        </form>
                    </section>
                    {/* <!-- Section: Form --> */}

                </div>
                {/* <!-- Grid container --> */}

                {/* <!-- Copyright --> */}
                <div className="text-center p-3 font-white-" style={{ backgroundColor: "rgba(252, 248, 247, 0.01)" }}>
                    © 2022 Copyright: Smart Computing Lab, Inje University
                    {/* <a className="text-dark" />href="https://mdbootstrap.com/">MDBootstrap.com</a> */}
                </div>
                {/* <!-- Copyright --> */}

            </footer>
            {/* <!-- Footer --> */}
        </div>
    )
}


export default Footer;