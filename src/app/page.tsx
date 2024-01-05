import Link from "next/link";
import { onSubmit, saveStory } from "./actions";
import prisma from "./db";

type User = {
  id: number;
  email: string;
  name?: string;
  password?: string;
  articles?: Article[];
}

type Article = {
  id: number;
  title: string;
  body: string;
  authorId: number;
  published: boolean;
}


function UsersList({ users }: { users: User[] }) {
  return (
    <div className="grid grid-cols-1 grid-gap-4">
      <h2 className="text-xl font-bold">Users</h2>

      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <ul>
            {users.map(user => (
              <li key={user.id} className="mt-4 text-white p-4 text-lg border-b-2 border-b-white">
                <Link href={`${user.id}`}>
                  {user.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}


function UserForm() {
  return (<form action={onSubmit} className="grid grid-cols-2 gap-4">

    <label htmlFor="name" className="col-span-1">Name</label>
    <input type="text" name="name" className="block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

    <label htmlFor="email" className="col-span-1">Email</label>
    <input type="email" name="email" className="block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

    <label htmlFor="password" className="col-span-1">Password</label>
    <input type="password" name="password" className="block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create</button>
  </form>)

}



export default async function Home() {

  const users = await prisma.user.findMany();


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello Prisma</h1>

      <UserForm />

      <UsersList users={users} />
    </main>
  )
}
