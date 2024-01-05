
import Link from "next/link";
import { saveStory } from "../actions";
import prisma from "../db";

function UserArticles({ articles }: { articles: Article[] }) {
    return (
        <div className="grid grid-cols-1 grid-gap-4">
            <h2 className="text-xl font-bold">Articles</h2>

            <div className="grid grid-cols-2">
                <div className="col-span-1">
                    <ul>
                        {articles.map(article => (
                            <li key={article.id} className="mt-4 text-white p-4 text-lg border-b-2 border-b-white">
                                <Link href={`/articles/${article.id}`}>
                                    {article.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default async function StoryPage({ params }: { params: { id: string } }) {

    const user = await prisma.user.findUnique({
        where: {
            id: Number(params.id),
        }
    });

    const userArticles = await prisma.article.findMany({
        where: {
            authorId: Number(params.id),
        }
    });

    return (
        <div className="col-span-1">
            <h3 className="text-white">Story For : {user?.name} - {params.id}</h3>
            <form action={saveStory}>
                <label htmlFor="title" className="col-span-1">Story Title</label>
                <input type="text" name="title" className="block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

                <label htmlFor="body" className="col-span-1">Story Body</label>
                <textarea name="body" className="block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>

                <input type="text" name="userId" defaultValue={user?.id} hidden readOnly />
                <button type="submit" className="w-full text-black bg-white p-3 mt-4 rounded">Save Story</button>
            </form>

            <UserArticles articles={userArticles} />
        </div>
    )
}