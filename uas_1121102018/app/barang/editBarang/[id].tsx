// pages/barang/editBarang/[id].tsx
import { GetServerSideProps } from 'next';
import EditBarang from '../editBarang';
import axios from 'axios';

interface EditBarangPageProps {
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
  
  const EditBarangPage: React.FC<EditBarangPageProps> = ({ barang }) => {
    return <EditBarang barang={barang} />;
  };
  
  export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get(`http://localhost:1337/api/barangs/${params!.id}`);
  
    if (!response.data) {
      return {
        notFound: true,
      };
    }
  
    return {
      props: {
        barang: response.data,
      },
    };
  };
  
  export default EditBarangPage;