import { Box, Button, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
// import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

// const inter = Inter({ subsets: ['latin'] })

export default function Home({ repos }) {
  const [ lang, setLang ] = useState("");
  // let reposData = (repos).filter((repos) => repos.language === lang) ;
  // console.log(reposData);
  return (
    <>
      <Head>
        <title>GitStar App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div >
         <Stack direction={['column', 'row']} spacing='24px' >
          <Button backgroundColor={'teal'} variant='solid' width={80} onClick={()=> setLang("TypeScript")}>
            All
          </Button>
          <Button backgroundColor='teal' variant='solid' width={80} onClick={()=> setLang("HTML")}>
            HTML
          </Button>
          <Button backgroundColor='teal' variant='solid' width={80} onClick={()=> setLang("css")}>
            CSS
          </Button>
          <Button backgroundColor='teal' variant='solid' width={80} onClick={()=> setLang("JavaScript")}>
            Javascript
          </Button>
         </Stack>
         <SimpleGrid columns={[2, null, 3]} spacing='40px'>
              {
                repos.map((repo) => {
                  return (
                    // box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                    <Box key={repo.id} style={{ boxShadow:'0px 7px 29px 0px', alignItems:'center' }}>
                      <img src={repo.owner.avatar_url} alt={repo.name} width={100} height={100}/>
                      <Heading as='h3'>{repo.full_name}</Heading>
                      <Heading as='h4'>{repo.name}</Heading>
                      <Box>
                        <Text>{repo.stargazers_count}</Text>
                        <Text>{repo.forks}</Text>
                      </Box>
                    </Box>
                  );                
              })
            }
         </SimpleGrid>
        </div>
      </main>
    </>
  )
}


export async function getServerSideProps() {
  let res = await fetch(`https://api.github.com/search/repositories?q=stars:%3E1+language:All`);
  let data = await res.json();

  return {
    props: {
      repos: data.items
    }
  }
}