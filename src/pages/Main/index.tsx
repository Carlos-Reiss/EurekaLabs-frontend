import 'leaflet/dist/leaflet.css';

import React, {
  useEffect, useState,
} from 'react';

import { MdPinDrop, MdSearch } from 'react-icons/md';
import InputMask from 'react-input-mask';
import dotenv from 'dotenv';
import { useQuery } from 'react-query';

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
  const [termoPesquisa, setTermoPesquisa] = useState('73015-132');
  const [dataCep, setDataCep] = useState<CepInterface>({} as CepInterface);
  const [mapBox, setMapBox] = useState<LatLngExpression>([-18.4554376, -48.5267386]);

  const mapPinIcon = Leaflet.icon({
    iconUrl: pinSvg,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [150, 2],
  });

  const fetchCep = async () => {
    const { data: responseData } = await api.get<CepInterface>(`/cep/${termoPesquisa}`);
    setDataCep(responseData);
    return responseData;
  };

  const {
    status, isLoading, isError, error,
  } = useQuery(termoPesquisa, fetchCep, { retry: false });

  useEffect(() => {
    async function loadMap() {
      const { data: local } = await mapbox.get(`${dataCep.bairro} ${dataCep.logradouro} ${dataCep.cep}.json?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`);
      const positions = local.features[0].center;
      if (positions) {
        const pos: LatLngExpression = [positions[1], positions[0]];
        setMapBox(pos);
      }
    }
    loadMap();
  },
  [dataCep, termoPesquisa]);

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
            <Data isError={isError} isLoading={isLoading}>

              <InputMask mask="99999-999" type="text" onChange={(e) => setCep(e.target.value)} value={cep} placeholder="Digite seu CEP" />
              <button type="button" onClick={() => setTermoPesquisa(cep)}>
                <MdSearch size={24} color="#ededed" />
                { status === 'loading' ? 'Carregando...' : 'Pesquisar'}
              </button>
            </Data>
          </form>
          {isError && (
            <p>Por favor informe um CEP Valido, tente novamente!</p>
          )}
        </Content>

        <Details>
          {dataCep && dataCep.cep && (
          <CEP>
            <h2>Endere??o Encontrado.</h2>
            <p>
              <strong>CEP: </strong>
              {formatCEP(dataCep.cep)}
            </p>
            <div>
              <p>
                <strong>Bairro: </strong>
                {dataCep.bairro}
              </p>
              <p>
                <strong>Logradouro: </strong>
                {dataCep.logradouro}
              </p>
            </div>

            <div>
              <p>
                <strong>Localidade: </strong>
                {dataCep.localidade}
              </p>
              <p>
                <strong>UF: </strong>
                {dataCep.uf}
              </p>
            </div>
          </CEP>
          )}
          <Map>
            <MapContainer
              center={mapBox}
              zoom={4}
              scrollWheelZoom
              zoomAnimation
              maxZoom={9}
              minZoom={4}
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
