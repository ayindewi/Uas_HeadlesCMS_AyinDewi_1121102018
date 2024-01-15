// components/EditBarang.tsx
import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-modal'; // Import the Modal component
import { useRouter } from 'next/router';

interface EditBarangProps {
  barang: {
    id: string;
    attributes: {
      NamaBarang: string;
      JenisBarang: string;
      StokBarang: number;
      HargaBarang: number;
      Supplyer: string;
    };
  };
}

const EditBarang: React.FC<EditBarangProps> = ({ barang }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [NamaBarang, setNamaBarang] = useState(barang.attributes.NamaBarang);
  const [JenisBarang, setJenisBarang] = useState(barang.attributes.JenisBarang);
  const [StokBarang, setStokBarang] = useState(barang.attributes.StokBarang);
  const [HargaBarang, setHargaBarang] = useState(barang.attributes.HargaBarang);
  const [Supplyer, setSupplyer] = useState(barang.attributes.Supplyer);
  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      NamaBarang,
      JenisBarang,
      StokBarang,
      HargaBarang,
      Supplyer,
    };

    try {
      const response = await axios.put(`http://localhost:1337/api/barangs/${barang.id}`, data);

      if (response.status === 200) {
        Swal.fire('Sukses', 'Data berhasil diupdate', 'success');
        closeModal();
        router.push('/barang');
      } else {
        Swal.fire('Gagal', 'Data gagal diupdate', 'error');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire('Error', 'An error occurred while updating data', 'error');
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    setNamaBarang(barang.attributes.NamaBarang);
    setJenisBarang(barang.attributes.JenisBarang);
    setStokBarang(barang.attributes.StokBarang);
    setHargaBarang(barang.attributes.HargaBarang);
    setSupplyer(barang.attributes.Supplyer);
  }, [barang]);

  return (
    <div className="container">
      <h1>Edit Barang</h1>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Barang Modal"
      >
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Nama Barang</label>
            <input
              type="text"
              className="form-control"
              value={NamaBarang}
              onChange={(e) => setNamaBarang(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Jenis Barang</label>
            <input
              type="text"
              className="form-control"
              value={JenisBarang}
              onChange={(e) => setJenisBarang(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Stok Barang</label>
            <input
              type="number"
              className="form-control"
              value={StokBarang}
              onChange={(e) => setStokBarang(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Harga Barang</label>
            <input
              type="number"
              className="form-control"
              value={HargaBarang}
              onChange={(e) => setHargaBarang(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label>Supplyer</label>
            <input
              type="text"
              className="form-control"
              value={Supplyer}
              onChange={(e) => setSupplyer(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button type="button" onClick={closeModal} className="btn btn-danger">
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditBarang;
