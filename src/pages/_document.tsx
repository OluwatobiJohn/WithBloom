import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='bg-gray-100 my-custom-bg-class'>
      <Head />
      <body className='bg-gray-100 overscroll-none'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
