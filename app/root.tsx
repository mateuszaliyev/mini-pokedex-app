import "@/style.css";

import {
  href,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { PokeballIcon } from "@/components/icons/pokeball";
import { Link, LinkBack } from "@/components/link";
import { Heading } from "@/components/typography";

import type { Route } from "./+types/root";

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
  let details = "An unexpected error occurred.";
  let message = "Oops!";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
    message = error.status === 404 ? "404" : "Error";
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      <title>Mini Pokédex App</title>
      <meta content={message} name="description" />
      <main className="py-24">
        <Container className="absolute inset-0 z-[-1] overflow-hidden">
          <PokeballIcon className="pointer-events-none w-full -translate-y-1/2 mask-b-from-50% mask-b-to-90% text-gray-100 sm:mask-b-to-70%" />
        </Container>
        <Container>
          <Heading as="h1" level={1}>
            {message}
          </Heading>
          <p className="mt-3 max-w-md leading-tight text-balance">{details}</p>
          {isRouteErrorResponse(error) && error.status === 404 && (
            <div className="mt-6 flex items-center gap-2">
              <Button asChild variant="primary">
                <Link to={href("/")}>Home</Link>
              </Button>
              <Button asChild variant="secondary">
                <LinkBack>Back</LinkBack>
              </Button>
            </div>
          )}
          {stack && (
            <pre className="w-full overflow-x-auto p-4">
              <code>{stack}</code>
            </pre>
          )}
        </Container>
      </main>
    </>
  );
};

export const links: Route.LinksFunction = () => [
  { href: "https://fonts.googleapis.com", rel: "preconnect" },
  {
    crossOrigin: "anonymous",
    href: "https://fonts.gstatic.com",
    rel: "preconnect",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    rel: "stylesheet",
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <html className="scroll-smooth" lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <Meta />
      <Links />
    </head>
    <body className="bg-white tracking-tight text-gray-500 antialiased transition [text-rendering:optimizeLegibility] has-[main[data-background=gray]]:bg-gray-100">
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

const Application = () => <Outlet />;

export default Application;
