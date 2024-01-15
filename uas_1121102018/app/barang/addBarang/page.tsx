"use client";
import { useState, SyntheticEvent } from "react";
import Swal from "sweetalert2";

const Page = () => {
  const [NamaBarang, setNamaBarang] = useState("");
  const [JenisBarang, setJenisBarang] = useState("");
  const [StokBarang, setStokBarang] = useState("");
  const [HargaBarang, setHargaBarang] = useState("");
  const [Supplyer, setSupplyer] = useState("");

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    // Convert StokBarang and HargaBarang to integers
    const stokBarangInt = parseInt(StokBarang, 10);
    const hargaBarangInt = parseInt(HargaBarang, 10);

    const data = {
      data: {
        NamaBarang,
        JenisBarang,
        StokBarang: isNaN(stokBarangInt) ? 0 : stokBarangInt,
        HargaBarang: isNaN(hargaBarangInt) ? 0 : hargaBarangInt,
        Supplyer,
      },
    };

    const response = await fetch("http://localhost:1337/api/barangs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      Swal.fire("Sukses", "Data berhasil ditambahkan", "success");
      setNamaBarang("");
      setJenisBarang("");
      setStokBarang("");
      setHargaBarang("");
      setSupplyer("");
    } else {
      Swal.fire("Gagal", "Data gagal ditambahkan", "error");
    }
  }

  return (
    <div className="container mt-2">
      <h1>Tambah Barang</h1>
      <form className="form-group" onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Nama Barang</label>
          <input
            type="text"
            name="NamaBarang"
            className="form-control"
            value={NamaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Jenis Barang</label>
          <input
            type="text"
            name="JenisBarang"
            className="form-control"
            value={JenisBarang}
            onChange={(e) => setJenisBarang(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Stok Barang</label>
          <input
            type="text"
            name="StokBarang"
            className="form-control"
            value={StokBarang}
            onChange={(e) => setStokBarang(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Harga Barang</label>
          <input
            type="text"
            name="HargaBarang"
            className="form-control"
            value={HargaBarang}
            onChange={(e) => setHargaBarang(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Supplyer</label>
          <input
            type="text"
            name="Supplyer"
            className="form-control"
            value={Supplyer}
            onChange={(e) => setSupplyer(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Tambah
        </button>
        <button className="btn btn-outline-info mt-2 mx-2">
          <a href="/barang">Kembali</a>
        </button>
      </form>
    </div>
  );
};

export default Page;
