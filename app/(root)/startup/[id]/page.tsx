import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';


export const experimental_ppr = true;

const page = async ({params}: {params: Promise<{id: string}>}) => {
    const id =(await params).id;
    const md = markdownit();
    console.log({id});

    const [post , editorPosts] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, { id }),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks'})
    ]);

    // const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
    // if (!post) return notFound();

    // const editorPosts = await client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: 'editor-picks' });

    const parsedContent = md.render(post?.pitch || '');

    return (<>
    <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>

    <h1 className="heading">
        {post.title}
    </h1>
    <p className="sub-heading !max-w-5xl">
        {post.description}
    </p>
    </section>
    <section className="section_container flex-col">
        <img src={post.image || 'https://imgs.search.brave.com/sCkEmWogMoD166jt8TtUYwGz64gc9SS30CSgpYsqG6k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9lbTZsOXp3/NHR6YWcvWFNUWkJh/bGVZZGJidEU0b2lK/ZXNXLzc3MDk5NzBl/NGNjYTQ1YjA4NTA2/MTc4MzcyMDZjNGMx/LzEwMjNfQ1JUOV80/MDQtaGVyby5qcGc_/dz0yNTIwJmg9OTQ1/JmZsPXByb2dyZXNz/aXZlJnE9NTAmZm09/anBn'} alt='thumbnail' className="startup-image h-auto rounded-xl" />
        <div className="space-y-5 mt-10 max-w-4xl mx-10">
            <div className="flex-between gap-5">
                <Link href={`/user/${post?.author?._id}`} className="flex gap-2 items-center mb-3">
                    <Image src={post?.author?.image} alt="avatar" width={64} height={64} className="rounded-full overflow-hidden drop-shadow-lg" 
                    />
                    <div>
                    <p className="text-16-medium !text-black-300">@{post?.author?.username}</p>

                    </div>
                </Link>
                <p className='category-tag'>{post.category}</p>
            </div>
            <h3 className='text-30-bold'>
                Pitch Details:
            </h3>
            {parsedContent ? (
                <article dangerouslySetInnerHTML={{__html: parsedContent}}
                className='prose max-w-4xl font-work-sans break-all'/> 
            ) : (
                <p className='no-result'>
                    No details Provided.
                </p>
                
            )}
        </div>
        <hr className="divider" />

        {editorPosts?.length > 0 && (
            <div className="max-w-4xl mx-auto">
                <p className='text-30-semibold'>
                    Editor Picks:
                </p>
                <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
            </div>
        )}

        <Suspense fallback={<Skeleton className="view-skeleton" />}>
            <View id={id}/>
        </Suspense>
    </section>
  </>)
}

export default page