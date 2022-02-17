import { HeartIcon } from '@heroicons/react/solid'

export default function Footer() {

    return (
        <footer className="bg-white text-center p-6 border-slate-200 border-t" aria-labelledby="footer-heading">
            Made with
            <HeartIcon className="h-5 w-5 inline-block mx-1 relative -top-1 text-red-500" />
            in Toronto by <a href="https://twitter.com/danstanhope" className="text-slate-500 underline hover:text-pink-500">@danstanhope</a>
        </footer>
    )
}
