import Link from 'next/link';
import Search from "./search"

export default function Intro() {
  return (
    <div>
      <section className="mt-16 mb-5 md:mb-10 lg:mb-30 flex flex-col items-center md:flex-row md:justify-between">
        <a href='/' className="mb-6 h-3.5 w-3.5 md:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 153 153"><rect width="153" height="153" rx="7.66" fill="#f66" /><path d="M40,129.57a62.1,62.1,0,0,0,30,18.25c1.33.36,2.67.67,4,.92a62,62,0,0,0,30-1.6q2.28-.69,4.5-1.56a63.66,63.66,0,0,0,6.72-3.08,62.14,62.14,0,0,0,23.28-21.44,60.64,60.64,0,0,0,5.42-10.66c11.64-29.73-.91-63.53-29.42-77.9" transform="translate(-12 -7)" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" /><path d="M70,87.32v60.5a62.25,62.25,0,0,1-30-18.25V87.32Z" transform="translate(-12 -7)" fill="#028090" stroke="#fff" strokeMiterlimit="10" /><path d="M104,101.74v45.4a62,62,0,0,1-30,1.6v-47Z" transform="translate(-12 -7)" fill="#028090" stroke="#fff" strokeMiterlimit="10" /><path d="M138.5,70.5v50.56a62.14,62.14,0,0,1-23.28,21.44,63.66,63.66,0,0,1-6.72,3.08V70.5Z" transform="translate(-12 -7)" fill="#028090" stroke="#fff" strokeMiterlimit="10" /><path d="M101.05,29.69l15.75-6.15-.13.25a31.48,31.48,0,0,0-3.25,17.43h0Z" transform="translate(-12 -7)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="sr-only">Website</span>
        </a>
        <h1 className="mb-2 text-4xl font-bold leading-tight tracking-tighter md:mb-0 md:pr-8 md:text-6xl lg:text-7xl">
          Tokenomics Hub
        </h1>
        <div className="rounded-md bg-dao-red px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <Link href="/calculator" >
            Calculator
          </Link>
        </div>
      </section>
      <div className="flex place-content-center mb-10">
        {/* <Search isPost={false} /> */}
      </div>
    </div>
  )
}
