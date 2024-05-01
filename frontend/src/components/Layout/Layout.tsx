import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import "./Layout.css";
import { Toaster } from "react-hot-toast";

interface Prop {
  desc: string;
  keyw: string;
  auth: string;
  title: string;
  children: React.ReactNode;
}

const Layout = ({
  title = "hello",
  desc = "nothing",
  keyw = "shoes",
  auth = "Divakar",
  children,
}: Prop) => {
  return (
    <div className="flex flex-col min-h-screen fullbody">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={desc} />
        <meta name="keywords" content={keyw} />
        <meta name="author" content={auth} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className=" flex align-middle justify-center  text-xl h-max mt-2 ">
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
