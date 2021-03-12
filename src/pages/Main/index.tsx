import 'leaflet/dist/leaflet.css';

import React, {
  useCallback, useEffect, useState,
} from 'react';
import { MdPinDrop, MdSearch } from 'react-icons/md';
import InputMask from 'react-input-mask';
import dotenv from 'dotenv';

import {
  MapContainer, TileLayer, Marker,
} from 'react-leaflet';

import Leaflet, { LatLngExpression } from 'leaflet';

import Header from '../../components/Header';
import mapbox from '../../services/mapBox';
import pinSvg from '../../assets/pin.svg';

import {
  Container, Content, Details, Data,
  CEP, Map,
} from './styles';
import api from '../../services/api';

interface CepInterface {
  cep: string;
  logradouro: string;
  bairro: string;
  uf: string;
  localidade: string;
  _id: string;
}

const Main: React.FC = () => {
  dotenv.config();

  const [cep, setCep] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CepInterface>({} as CepInterface);

  const [mapBox, setMapBox] = useState<LatLngExpression>([-18.4554376, -48.5267386]);
  const mapPinIcon = Leaflet.icon({
    iconUrl: pinSvg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
  });

  const handleSubmit = useCallback(() => {
    async function buscarCep() {
      try {
        setError(false);
        setLoading(false);
        if (cep === '' || cep.length !== 9) {
          setError(true);
        }
        setLoading(true);

        const response = await api.get<CepInterface>(`/cep/${cep}`);
        setLoading(false);
        setData(response.data);
      } catch (e) {
        setError(true);
        setLoading(false);
        alert('CEP inválido, por favor tente novamente... \n O CEP informado precisa conter um conteúdo válido');
      }
    }
    buscarCep();
  }, [cep]);

  useEffect(() => {
    async function loadMap() {
      const { data: local } = await mapbox.get(`${data.localidade}.json?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`);
      const pos: LatLngExpression = [local.features[0].center[1], local.features[0].center[0]];
      setMapBox(pos);
    }
    loadMap();
  },
  [data]);

  const formatCEP = (cepLimpo: string):string => `${cepLimpo.substring(0, 5)}-${cepLimpo.substring(5, 8)}`;

  return (
    <>
      <Header />
      <Container>

        <Content>
          <form onSubmit={(e) => e.preventDefault()}>
            <h2>
              <MdPinDrop size={42} color="#333" />
              Buscar seu Cep
            </h2>
            <Data isError={error} isLoading={loading}>

              <InputMask mask="99999-999" type="text" onChange={(e) => setCep(e.target.value)} value={cep} placeholder="Digite seu CEP" />
              <button type="button" onClick={() => handleSubmit()}>
                <MdSearch size={24} color="#ededed" />
                {loading ? 'Carregando...' : 'Pesquisar'}
              </button>
            </Data>
          </form>
        </Content>

        <Details>
          {data && data.cep && (
          <CEP>
            <h2>Endereço Encontrado.</h2>
            <p>
              <strong>CEP: </strong>
              {formatCEP(data.cep)}
            </p>
            <div>
              <p>
                <strong>Bairro: </strong>
                {data.bairro}
              </p>
              <p>
                <strong>Logradouro: </strong>
                {data.logradouro}
              </p>
            </div>

            <div>
              <p>
                <strong>Localidade: </strong>
                {data.localidade}
              </p>
              <p>
                <strong>UF: </strong>
                {data.uf}
              </p>
            </div>
          </CEP>
          )}
          <Map>
            <MapContainer
              center={mapBox}
              zoom={4.45}
              scrollWheelZoom
              style={{

                width: '100vw',
                height: '100vh',
                position: 'absolute',
                marginTop: 60,
                zIndex: 1,
                padding: 20,
                overflowY: 'hidden',
              }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapBox && (
              <Marker
                icon={mapPinIcon}
                position={mapBox}
              />
              )}

            </MapContainer>
          </Map>

        </Details>
      </Container>
    </>
  );
};

export default Main;
