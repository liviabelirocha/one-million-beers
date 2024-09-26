import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useEffect } from "react";
import { getToast } from "remix-toast";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "./hooks/use-toast";
import "./tailwind.css";

declare global {
  interface BigInt {
    // eslint-disable-next-line @typescript-eslint/ban-types
    toJSON(): Number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this);
};

export const meta: MetaFunction = () => {
  return [{ title: "One Million Beers" }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { toast, headers } = await getToast(request);
  return json({ toast }, { headers });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-800 text-gray-100">
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { toast } = useLoaderData<typeof loader>();

  const { toast: renderToast } = useToast();

  useEffect(() => {
    if (toast)
      renderToast({
        description: toast.message,
        variant: toast.type === "error" ? "destructive" : "default",
      });
  }, [toast]);

  return <Outlet />;
}
