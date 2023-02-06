import {useRouter} from "next/router";
import styles from '@/styles/Home.module.css'
import Head from "next/head";
import { useState } from "react";
import Image from 'next/image'


type News = {
    title: string,
    url: string,
    id: string
};

export async function getServerSideProps(context: { query: { id: string } }) {
    const { id } = context.query;
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const news: News = await res.json();
    console.log(news);
    return {
        props: {
            news
        }
    };
}

function loadImage(url: string, setter: Function) {
    return async (e: any) => {
        const res = await fetch(`/api/screenshot?url=${url}`);
        const data = await res.json();
        setter(`data:image/png;base64,${data.base64}`);
    };
}

export default function News({ news }: { news: News }) {
    const [src, setSrc] = useState("");
    return (
        <>
            <Head>
                <title>Hacker News App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.center}>
                    <h1>{news.title}</h1>
                </div>
                <div className={styles.center}>
                    <Image src={src} width="400" height="240" alt={news.title} onError={loadImage(news.url, setSrc)} />
                </div>
                <h1><a href={news.url}>Read More</a></h1>
            </main>
        </>
    );
}