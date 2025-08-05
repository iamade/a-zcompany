import React from 'react'
import Image from "next/image";
import { AiOutlineShoppingCart } from 'react-icons/ai'

export default function NavBar() {
  return (
    <header className="shadow-md p-3 w-full">
    <div className="flex align-middle items-center justify-between max-w-screen-2xl mx-auto">
        <Image src="/images/a-zlogo.png" alt="app logo" className="max-h-26" width={200} height={200}/>
        <nav className="flex gap-3 my-2 uppercase text-xl">
            <a>Home</a>
            <a>Shop</a>
            <a>Contact</a>
        </nav>
        <div className="flex gap-3 align-middle">
            <a className="custom-badge mt-2 mr-2">
                <AiOutlineShoppingCart size={34}/>
            </a> 
            <button >Login</button>
            <button >Register</button>
        </div>

    </div>

</header>
  )
}
