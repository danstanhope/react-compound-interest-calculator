import Head from 'next/head'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Form from '../components/Form';

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-between text-slate-500">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header /> 
      <main className="mb-auto max-w-7xl mx-auto">
        <div className="my-md sm:my-xxl my-24">
          <h1 className="text-5xl font-bold text-center text-slate-800 mb-4">
            Compound Interest Calculator!
          </h1>
          <p className="text-center">
            Get your money in the market and watch it grow over time. We&apos;re talking stacks on stacks on stacks.
          </p>
          <Form />
        </div>      
        <div>
          <div className="flex flex-col sm:flex-row justify-center items-center">

          </div>
        </div>
        <div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
