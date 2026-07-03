import { assetPath } from "@/lib/asset-path";

export default function RootRedirect() {
  const target = assetPath("/en/");
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
      </head>
      <body>
        <p>
          Redirecting to <a href={target}>the toastery</a>...
        </p>
      </body>
    </html>
  );
}
