import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='my-custom-bg-class'>
      <Head />
      <body className='overscroll-none'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
