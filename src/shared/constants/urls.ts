/* eslint-disable prettier/prettier */
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://192.168.2.181:8080',
  });
export const URL_USER = '/login';
export const StatusProjetista = 'http://192.168.2.181:8080/StatusProjetista';
export const TitulosEmAbertosSemAprovacao = 'http://192.168.2.181:8080/TitulosEmAbertosSemAprovacao';
export const StatusStorno = 'http://192.168.2.181:8080/StatusEstorno';
export const StatusProjetistaEstorno = 'http://192.168.2.181:8080/StatusProjetistaEstorno';
