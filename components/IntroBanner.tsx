import Link from "next/link"

export function IntroBanner() {
    return (
        <section className="bg-black text-[#828282] py-3 px-5">
            <div className="w-full font-mono">
                <h1 className="text-2xl text-white mb-2">上帝保佑你</h1>

                <p className="mb-4 leading-relaxed">
                    I travel, create cool companies with cool people, and work on various projects, including some you may be familiar with.<br />
                    Here I share notes I have made throughout my life on my cell phone.
                </p>

                <Link href="https://open.spotify.com/user/31qzwpb6guuqza7kqtvpp2ir2eyi?si=d69bd63033bd4dfb" target="_blank" className="text-white underline"><span className="text-4xl">☣</span> Sum sick playlists <span className="text-4xl">☣</span></Link>


                <p className="my-5">
                    <span className="font-bold text-white">Interests</span> : robotics, machine learning, theology, loud music, fast cars, cinema, books, learning...
                </p>

                <p className="my-5">
                    <span className="font-bold text-white">Pure Hate</span>  : lazy people, woke culture, leftism, comunism, PHP and Microsoft
                </p>

                <ul className="list-disc list-inside space-y-2">
                    <span className="font-bold text-white">My Links</span> :
                    <ul className="ml-4 list-disc mt-2">
                        <li><Link href="https://www.instagram.com/davidemarqui/" target="_blank" className="hover:text-white underline">Insta</Link></li>
                        <li><Link href="https://x.com/davedemc" target="_blank" className="hover:text-white underline">𝕏 <span className="text-sm">(Twitter)</span></Link></li>
                    </ul>
                </ul>
            </div>
        </section>
    )
}
