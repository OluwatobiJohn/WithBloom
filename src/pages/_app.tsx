import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter, usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Check if the current page is the login page.
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";
  const isIndexPage = pathname === "/";
  const validRoutes = ["/", "/login", "/register", "/forcoins", "/forexchange"];
  const isPathValid = validRoutes.includes(pathname);

  return isLoginPage || isRegisterPage || isIndexPage || !isPathValid ? (
    <>
      <ToastContainer /> <Component {...pageProps} />
    </>
  ) : (
    <Layout>
      <ToastContainer />
      <Component {...pageProps} />
    </Layout>
  );
}
