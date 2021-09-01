import { EventEmitter } from 'events';

export declare type CreateConnectionChannelError = 'NoError' | 'MaxPendingConnectionsReached';

export declare type ConnectionStatus = 'Disconnected' | 'Connected' | 'Ready';

export declare type DisconnectReason =
  'Unspecified' | 'ConnectionEstablishmentFailed' | 'TimedOut' | 'BondingKeysMismatch';

export declare type RemovedReason =
  'RemovedByThisClient' | 'ForceDisconnectedByThisClient' | 'ForceDisconnectedByOtherClient'
  | 'ButtonIsPrivate' | 'VerifyTimeout' | 'InternetBackendError' | 'InvalidData' | 'CouldntLoadDevice'
  | 'DeletedByThisClient' | 'DeletedByOtherClient' | 'ButtonBelongsToOtherPartner' | 'DeletedFromButton'

export declare type BdAddrType = 'PublicBdAddrType' | 'RandomBdAddrType';

export declare type UpOrDown = 'ButtonUp' | 'ButtonDown';

export declare type ClickOrHold = 'ButtonClick' | 'ButtonHold';

export declare type SingleOrDoubleClick = 'ButtonSingleClick' | 'ButtonDoubleClick';

export declare type SingleOrDoubleClickOrHold = 'ButtonSingleClick' | 'ButtonDoubleClick' | 'ButtonHold';

export declare type LatencyMode = 'NormalLatency' | 'LowLatency' | 'HighLatency';

export declare type ScanWizardResult =
  'WizardSuccess' | 'WizardCancelledByUser' | 'WizardFailedTimeout'
  | 'WizardButtonIsPrivate' | 'WizardBluetoothUnavailable' | 'WizardInternetBackendError'
  | 'WizardInvalidData' | 'WizardButtonBelongsToOtherPartner' | 'WizardButtonAlreadyConnectedToOtherDevice';

export declare type BluetoothControllerState = 'Detached' | 'Resetting' | 'Attached';

export declare class FlicClient extends EventEmitter {
  constructor(host: string, port?: number);
  addScanner(flicScanner: FlicScanner): void;
  removeScanner(flicScanner: FlicScanner): void;
  addScanWizard(flicScanWizard: FlicScanWizard): void;
  cancelScanWizard(flicScanWizard: FlicScanWizard): void;
  addConnectionChannel(connectionChannel: FlicConnectionChannel): void;
  removeConnectionChannel(connectionChannel: FlicConnectionChannel): void;
  addBatteryStatusListener(listener: FlicBatteryStatusListener): void;
  removeBatteryStatusListener(listener: FlicBatteryStatusListener): void
  getInfo(callback: (info: GetInfoParameter) => void): void;
  getButtonInfo(bdAddr: string, callback: (bdAddr: string, uuid: string, color: string,
    serialNumber: string, flicVersion: number, firmwareVersion: number) => void): void;
  deleteButton(bdAddr: string): void;
  close(): void;
  on(event: 'ready', listener: () => void): this;
  on(event: 'close', listener: (hadError: any) => void): this;
  on(event: 'error', listener: (error: any) => void): this;
  on(event: 'newVerifiedButton', listener: (bdAddr: string) => void): this;
  on(event: 'noSpaceForNewConnection', listener: (noSpaceForNewConnection: number) => void): this;
  on(event: 'gotSpaceForNewConnection', listener: (gotSpaceForNewConnection: number) => void): this;
  on(event: 'bluetoothControllerState', listener: (bluetoothControllerState: BluetoothControllerState) => void): this;
  on(event: 'buttonDeleted', listener: (bdAddr: string, deletedByThisClient: boolean) => void): this;
  once(event: 'ready', listener: () => void): this;
  once(event: 'close', listener: (hadError: any) => void): this;
  once(event: 'error', listener: (error: any) => void): this;
  once(event: 'newVerifiedButton', listener: (bdAddr: string) => void): this;
  once(event: 'noSpaceForNewConnection', listener: (noSpaceForNewConnection: number) => void): this;
  once(event: 'gotSpaceForNewConnection', listener: (gotSpaceForNewConnection: number) => void): this;
  once(event: 'bluetoothControllerState', listener: (bluetoothControllerState: BluetoothControllerState) => void): this;
  once(event: 'buttonDeleted', listener: (bdAddr: string, deletedByThisClient: boolean) => void): this;
}

export interface GetInfoParameter {
  bluetoothControllerState: BluetoothControllerState;
  myBdAddr: string;
  myBdAddrType: BdAddrType;
  maxPendingConnections: number,
  maxConcurrentlyConnectedButtons: number,
  currentPendingConnections: number,
  bdAddrOfVerifiedButtons: string[]
}

export declare class FlicConnectionChannel extends EventEmitter {
  latencyMode: LatencyMode;
  autoDisconnectTime: number;

  constructor(bdAddr: string, options?: FlicConnectionChannelOptions);
  on(event: 'createResponse', listener: (error: CreateConnectionChannelError, connectionStatus: ConnectionStatus) => void): this;
  on(event: 'removed', listener: (removedReason: RemovedReason) => void): this;
  on(event: 'connectionStatusChanged', listener: (connectionStatus: ConnectionStatus, disconnectReason: DisconnectReason) => void): this;
  on(event: 'buttonUpOrDown', listener: (clickType: UpOrDown, wasQueued: boolean, timeDiff: number) => void): this;
  on(event: 'buttonClickOrHold', listener: (clickType: ClickOrHold, wasQueued: boolean, timeDiff: number) => void): this;
  on(event: 'buttonSingleOrDoubleClick', listener: (clickType: SingleOrDoubleClick, wasQueued: boolean, timeDiff: number) => void): this;
  on(event: 'buttonSingleOrDoubleClickOrHold', listener: (clickType: SingleOrDoubleClickOrHold, wasQueued: boolean, timeDiff: number) => void): this;
  once(event: 'createResponse', listener: (error: CreateConnectionChannelError, connectionStatus: ConnectionStatus) => void): this;
  once(event: 'removed', listener: (removedReason: RemovedReason) => void): this;
  once(event: 'connectionStatusChanged', listener: (connectionStatus: ConnectionStatus, disconnectReason: DisconnectReason) => void): this;
  once(event: 'buttonUpOrDown', listener: (clickType: UpOrDown, wasQueued: boolean, timeDiff: number) => void): this;
  once(event: 'buttonClickOrHold', listener: (clickType: ClickOrHold, wasQueued: boolean, timeDiff: number) => void): this;
  once(event: 'buttonSingleOrDoubleClick', listener: (clickType: SingleOrDoubleClick, wasQueued: boolean, timeDiff: number) => void): this;
  once(event: 'buttonSingleOrDoubleClickOrHold', listener: (clickType: SingleOrDoubleClickOrHold, wasQueued: boolean, timeDiff: number) => void): this;
}

export interface FlicConnectionChannelOptions {
  latencyMode: LatencyMode;
  autoDisconnectTime: number;
}

export declare class FlicBatteryStatusListener extends EventEmitter {
  constructor(bdAddr: string);
  on(event: 'batteryStatus', listener: (batteryPercentage: number, timestamp: Date) => void): this;
  once(event: 'batteryStatus', listener: (batteryPercentage: number, timestamp: Date) => void): this;
}

export declare class FlicScanner extends EventEmitter {
  constructor();
  on(event: 'advertisementPacket', listener: (
    bdAddr: string, name: string, rssi: number, isPrivate: boolean,
    alreadyVerified: boolean, alreadyConnectedToThisDevice: boolean,
    alreadyConnectedToOtherDevice: boolean
  ) => void): this;
  once(event: 'advertisementPacket', listener: (
    bdAddr: string, name: string, rssi: number, isPrivate: boolean,
    alreadyVerified: boolean, alreadyConnectedToThisDevice: boolean,
    alreadyConnectedToOtherDevice: boolean
  ) => void): this;
}

export declare class FlicScanWizard extends EventEmitter {
  constructor();
  on(event: 'foundPrivateButton', listener: () => void): this;
  on(event: 'foundPublicButton', listener: (bdAddr: string, name: string) => void): this;
  on(event: 'buttonConnected', listener: (bdAddr: string, name: string) => void): this;
  on(event: 'completed', listener: (result: ScanWizardResult, bdAddr: string, name: string) => void): this;
  once(event: 'foundPrivateButton', listener: () => void): this;
  once(event: 'foundPublicButton', listener: (bdAddr: string, name: string) => void): this;
  once(event: 'buttonConnected', listener: (bdAddr: string, name: string) => void): this;
  once(event: 'completed', listener: (result: ScanWizardResult, bdAddr: string, name: string) => void): this;
}
