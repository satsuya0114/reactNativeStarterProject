import { SCTRequestBody, SCTResponseBody } from '../CommonApiModel';

export interface InputDataFormValue {
  barcode?: string;
  location?: string;
}

export interface InputData {
  idNo?: string;
  item?: string;
  location?: string;
  firstDepotDate?: string;
  smQty?: number;
}

export type CheckReelToGetLocationIDReqJson = SCTRequestBody<{
  barcode: string;
  ip: string;
}>;

export type CheckReelToGetLocationIDResJson = SCTResponseBody<{
  locationMsg: string;
  status: string;
}>;

export type CheckInputReelToSaveReqJson = SCTRequestBody<{
  barcode: string;
  locationId: string;
  ip: string;
  status: string;
}>;

export type CheckInputReelToSaveResJson = SCTResponseBody<{
  idNo: string;
  item: string;
  location: string;
  firstDepotDate: string;
  smQty: number;
}>;
