import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";

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
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={desc} />
        <meta name="keywords" content={keyw} />
        <meta name="author" content={auth} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="h-lvh flex align-middle justify-center  text-xl text-cyan-400 underline bg-og">
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
