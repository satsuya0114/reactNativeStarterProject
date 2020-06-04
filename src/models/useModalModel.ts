export type ModalClosingCode = Record<'cancel' | 'confirm', number>;

export interface ModalControl {
  visible: boolean;
  inputData: any;
  outputData: any;
  setOutputData: (modalOutputData: any) => void;
  open: (modalInputData: any) => void;
  close: (callback?: () => void) => void;
}
