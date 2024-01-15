'use client';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactModal from 'react-modal';

interface Barang {
  id: number;
  attributes: {
    NamaBarang: string;
    JenisBarang: string;
    StokBarang: number;
    HargaBarang: number;
    Supplyer: string;
  };
}

async function getBarang() {
  const response = await fetch('http://localhost:1337/api/barangs');
  const data = await response.json();
  return data.data;
}

export default function Page() {
  const [barang, setBarang] = useState<Barang[]>([]);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null);

  const [updatedNamaBarang, setUpdatedNamaBarang] = useState('');
  const [updatedJenisBarang, setUpdatedJenisBarang] = useState('');
  const [updatedStokBarang, setUpdatedStokBarang] = useState(0);
  const [updatedHargaBarang, setUpdatedHargaBarang] = useState(0);
  const [updatedSupplyer, setUpdatedSupplyer] = useState('');

  useEffect(() => {
    getBarang().then((data) => setBarang(data));
  }, []);

  const deleteBarang = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:1337/api/barangs/${id}`, {
        method: 'DELETE',
      });
      console.log(response);
      setDetailModalIsOpen(false);
      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Barang berhasil dihapus',
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Barang gagal dihapus',
      });
    }
  };

  const updateBarang = async (id: number) => {
    const updatedData = {
      NamaBarang: updatedNamaBarang,
      JenisBarang: updatedJenisBarang,
      StokBarang: updatedStokBarang,
      HargaBarang: updatedHargaBarang,
      Supplyer: updatedSupplyer,
    };
  
    console.log('Updated Data:', updatedData);
  
    try {
      const response = await fetch(`http://localhost:1337/api/barangs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: updatedData }), // Wrap updatedData in 'data' field
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Barang berhasil diperbarui',
        });
  
        setEditModalIsOpen(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error(errorData);
  
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Barang gagal diperbarui',
        });
      }
    } catch (error) {
      console.error(error);
  
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Barang gagal diperbarui',
      });
    }
  };
  

  const showDetailModal = (barang: Barang) => {
    setSelectedBarang(barang);
    setDetailModalIsOpen(true);
  };

  const showEditModal = (barang: Barang) => {
    setSelectedBarang(barang);
    setUpdatedNamaBarang(barang.attributes.NamaBarang ?? '');
    setUpdatedJenisBarang(barang.attributes.JenisBarang ?? '');
    setUpdatedStokBarang(barang.attributes.StokBarang ?? 0);
    setUpdatedHargaBarang(barang.attributes.HargaBarang ?? 0);
    setUpdatedSupplyer(barang.attributes.Supplyer ?? '');
    setEditModalIsOpen(true);
  };

  const closeDetailModal = () => {
    setDetailModalIsOpen(false);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
  };

  return (
    <main>
      <div className="container mt-5">
      <h1>Daftar Barang</h1>
      <button type="button" className="btn btn-outline-primary">
        <a href="/barang/addBarang">Tambah Barang</a>
      </button>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>No</th>
            <th>Nama Barang</th>
            <th>Jenis Barang</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {barang.map((b, index) => (
            <tr key={b.id}>
              <td>{index + 1}</td>
              <td>{b.attributes.NamaBarang}</td>
              <td>{b.attributes.JenisBarang}</td>
              <td>
                <button
                  onClick={() => deleteBarang(b.id)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  onClick={() => showDetailModal(b)}
                >
                  Detail
                </button>
                <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => showEditModal(b)}
                    >
                      Edit
                    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying details */}
      <ReactModal
        isOpen={detailModalIsOpen}
        onRequestClose={closeDetailModal}
        contentLabel="Detail Barang"
        className="modal-content container"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">Detail Barang</h2>
          <button
            type="button"
            className="btn-close"
            onClick={closeDetailModal}
          ></button>
        </div>
        <div className="modal-body">
          {selectedBarang && (
            <>
              <p>Nama Barang: {selectedBarang.attributes.NamaBarang}</p>
              <p>Jenis Barang: {selectedBarang.attributes.JenisBarang}</p>
              <p>Stok Barang: {selectedBarang.attributes.StokBarang}</p>
              <p>Harga Barang: {selectedBarang.attributes.HargaBarang}</p>
              <p>Supplyer: {selectedBarang.attributes.Supplyer}</p>
            </>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeDetailModal}
          >
            Close
          </button>
        </div>
      </ReactModal>

      {/* Modal for editing */}
      <ReactModal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Barang"
        className="modal-content container"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2 className="modal-title">Edit Barang</h2>
          <button
            type="button"
            className="btn-close"
            onClick={closeEditModal}
          ></button>
        </div>
        <div className="modal-body">
          {selectedBarang && (
            <form>
              <div className="mb-3">
                <label htmlFor="updatedNamaBarang" className="form-label">
                  Nama Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="updatedNamaBarang"
                  value={updatedNamaBarang}
                  onChange={(e) => setUpdatedNamaBarang(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="updatedJenisBarang" className="form-label">
                  Jenis Barang
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="updatedJenisBarang"
                  value={updatedJenisBarang}
                  onChange={(e) => setUpdatedJenisBarang(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="updatedStokBarang" className="form-label">
                  Stok Barang
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="updatedStokBarang"
                  value={updatedStokBarang}
                  onChange={(e) => setUpdatedStokBarang(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="updatedHargaBarang" className="form-label">
                  Harga Barang
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="updatedHargaBarang"
                  value={updatedHargaBarang}
                  onChange={(e) => setUpdatedHargaBarang(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="updatedSupplyer" className="form-label">
                  Supplyer
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="updatedSupplyer"
                  value={updatedSupplyer}
                  onChange={(e) => setUpdatedSupplyer(e.target.value)}
                />
              </div>
            </form>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeEditModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => selectedBarang && updateBarang(selectedBarang.id)}
          >
            Save
          </button>
        </div>
      </ReactModal>
    </div>
    </main>
  );
}
