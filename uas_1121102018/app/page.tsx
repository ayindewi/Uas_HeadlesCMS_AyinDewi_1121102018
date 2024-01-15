import React from 'react'
import Link from 'next/link'
export default function Home() {
  return (
    <div>
       <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-center mb-4">Selamat Datang di Website Kami</h1>
      <Link href="/barang">
        <button className="btn btn-primary">Halaman Barang</button>
      </Link>
    </div>
  </div>
  )
}
