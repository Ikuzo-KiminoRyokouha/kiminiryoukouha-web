import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"true"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&family=Noto+Sans+KR&display=swap"
          rel="stylesheet"
        />
        <link rel="manifest" href="/manifast.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" color="#ffffff" content="#ffffff"></meta>
        <link
          rel="image/png"
          href="/pwa/android/android-launchericon-48-48.png"
        />
        <link
          rel="image/png"
          href="/pwa/android/android-launchericon-72-72.png"
        />
        <link
          rel="image/png"
          href="/pwa/android/android-launchericon-96-96.png"
        />
        <link
          rel="image/png"
          href="/pwa/android/android-launchericon-144-144.png"
        />
        <link
          rel="image/png"
          href="/pwa/android/android-launchericon-192-192.png"
        />
        <link
          rel="image/png"
          href="/pwa/android/android-launchericon-512-512.png"
        />
        <link href="/pwa/ios/16.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/20.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/32.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/40.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/64.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/72.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/76.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/80.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/114.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/120.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/128.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/144.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/152.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/180.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/192.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/256.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/512.png" rel="apple-touch-icon" />
        <link href="/pwa/ios/1024.png" rel="apple-touch-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
