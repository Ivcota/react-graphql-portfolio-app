import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { createClient, Provider } from "urql";
import { store } from "../app/store";
import "../styles/globals.css";
import { createHttpLink } from "apollo-link-http";

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    // Include is needed to take cookies
    credentials: "include",
  },
  exchanges: [multipartFetchExchange],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <Provider value={client}>
        <div className="dark">
          <div className="min-h-screen dark:bg-steel-900 dark:text-steel-100 font-body">
            <Component {...pageProps} />
          </div>
        </div>
      </Provider>
    </ReduxProvider>
  );
}

export default MyApp;
