import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:4000/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <div className="dark">
        <div className="min-h-screen dark:bg-steel-900 dark:text-steel-100 font-body">
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
}

export default MyApp;
