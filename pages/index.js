import Head from 'next/head'
import styles from '../styles/Home.module.css'
import deliveryClient from '../utilities/client'
import AppHero from '../components/AppHero'

export default function Home({page}) {
  const title = page.elements.title.value
  const welcome = page.elements.content.linkedItems[0]
  return (
    <div className={styles.container}>
      <Head>
        <title>Conference NextJS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHero title={title} welcome={welcome} isLanding={true}/>

    </div>
  )
}

export async function getStaticProps() {
  const response = await deliveryClient.item('root')
  .depthParameter(5)
    .toPromise()

  const page = response.data.item

  return {
    props: {
      page
    },
  }
}


