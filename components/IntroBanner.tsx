import Link from "next/link"

export function IntroBanner() {
    return (
        <section className="bg-black text-[#828282] py-12">
            <div className="w-full font-mono">
                <h1 className="text-2xl text-white mb-2">上帝保佑你</h1>

                <p className="mb-4 leading-relaxed">
                    Here's my only fixed address<br />
                    i travel, build companies and projects with machine learning and crypto<br />
                    always interested in working on cool projects : feel free to reach out!
                </p>

                <Link href="https://open.spotify.com/user/31qzwpb6guuqza7kqtvpp2ir2eyi?si=d69bd63033bd4dfb" target="_blank" className="text-white underline"><span className="text-4xl">☣</span> Sum sick playlists <span className="text-4xl">☣</span></Link>


                <p className="my-6">
                    interest : robotics, ml, theology, music, cars, surf, theater, horror, books, hiking, experiencing, learning...
                </p>

                <p className="mb-4">
                    pure hate : lazy people, woke culture, comunism, php and Microsoft
                </p>

                <ul className="list-disc list-inside space-y-2 text-white">
                    my links
                    <ul className="ml-4 list-disc mt-2">
                        <li><Link href="https://www.instagram.com/davidemarqui/" target="_blank" className="text-white underline">Insta</Link></li>
                        <li><Link href="https://x.com/davedemc" target="_blank" className="text-white underline">𝕏 <span className="text-sm">(Twitter)</span></Link></li>
                    </ul>
                </ul>
            </div>
        </section>
    )
}
