import { EventEmitter } from 'events';

export declare type CreateConnectionChannelError = 'NoError' | 'MaxPendingConnectionsReached';

export declare type ConnectionStatus = 'Disconnected' | 'Connected' | 'Ready';

export declare type DisconnectReason =
  'Unspecified' | 'ConnectionEstablishmentFailed' | 'TimedOut' | 'BondingKeysMismatch';

export declare type RemovedReason =
  'RemovedByThisClient' | 'ForceDisconnectedByThisClient' | 'ForceDisconnectedByOtherClient'
  | 'ButtonIsPrivate' | 'VerifyTimeout' | 'InternetBackendError' | 'InvalidData' | 'CouldntLoadDevice'
  | 'DeletedByThisClient' | 'DeletedByOtherClient' | 'ButtonBelongsToOtherPartner' | 'DeletedFromButton'

export declare type ClickType =
  'ButtonDown' | 'ButtonUp' | 'ButtonClick'
  | 'ButtonSingleClick' | 'ButtonDoubleClick' | 'ButtonHold';

export declare type BdAddrType = 'PublicBdAddrType' | 'RandomBdAddrType';

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
  on(event: 'ready', listener: () => void): EventEmitter;
  on(event: 'close', listener: (hadError: any) => void): EventEmitter;
  on(event: 'error', listener: (error: any) => void): EventEmitter;
  on(event: 'newVerifiedButton', listener: (bdAddr: string) => void): EventEmitter;
  on(event: 'noSpaceForNewConnection', listener: (noSpaceForNewConnection: number) => void): EventEmitter;
  on(event: 'gotSpaceForNewConnection', listener: (gotSpaceForNewConnection: number) => void): EventEmitter;
  on(event: 'bluetoothControllerState', listener: (bluetoothControllerState: BluetoothControllerState) => void): EventEmitter;
  on(event: 'buttonDeleted', listener: (bdAddr: string, deletedByThisClient: boolean) => void): EventEmitter;
  once(event: 'ready', listener: () => void): EventEmitter;
  once(event: 'close', listener: (hadError: any) => void): EventEmitter;
  once(event: 'error', listener: (error: any) => void): EventEmitter;
  once(event: 'newVerifiedButton', listener: (bdAddr: string) => void): EventEmitter;
  once(event: 'noSpaceForNewConnection', listener: (noSpaceForNewConnection: number) => void): EventEmitter;
  once(event: 'gotSpaceForNewConnection', listener: (gotSpaceForNewConnection: number) => void): EventEmitter;
  once(event: 'bluetoothControllerState', listener: (bluetoothControllerState: BluetoothControllerState) => void): EventEmitter;
  once(event: 'buttonDeleted', listener: (bdAddr: string, deletedByThisClient: boolean) => void): EventEmitter;
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

export declare class FlicConnectionChannel {
  latencyMode: LatencyMode;
  autoDisconnectTime: number;

  constructor(bdAddr: string, options?: FlicConnectionChannelOptions);
  on(event: 'createResponse', listener: (error: CreateConnectionChannelError, connectionStatus: ConnectionStatus) => void): EventEmitter;
  on(event: 'removed', listener: (removedReason: RemovedReason) => void): EventEmitter;
  on(event: 'connectionStatusChanged', listener: (connectionStatus: ConnectionStatus, disconnectReason: DisconnectReason) => void): EventEmitter;
  on(event: 'buttonUpOrDown', listener: (clickType: ClickType, wasQueued: boolean, timeDiff: number) => void): EventEmitter;
  on(event: 'buttonClickOrHold', listener: (clickType: ClickType, wasQueued: boolean, timeDiff: number) => void): EventEmitter;
  on(event: 'buttonSingleOrDoubleClick', listener: (clickType: ClickType, wasQueued: boolean, timeDiff: number) => void): EventEmitter;
  on(event: 'buttonSingleOrDoubleClickOrHold', listener: (clickType: ClickType, wasQueued: boolean, timeDiff: number) => void): EventEmitter;
  once(event: 'createResponse', listener: (error: CreateConnectionChannelError, connectionStatus: ConnectionStatus) => void): EventEmitter;
  once(event: 'removed', listener: (removedReason: RemovedReason) => void): EventEmitter;
  once(event: 'connectionStatusChanged', listener: (connectionStatus: ConnectionStatus, disconnectReason: DisconnectReason) => void): EventEmitter;
  once(event: 'buttonUpOrDown', listener: (clickType: ClickType, wasQueued: boolean, timeDiff: number) => void): EventEmitter;
  once(event: 'buttonClickOrHold', listener: (clickType: ClickType, wasQueued: boolean, timeDiff: number) => void): EventEmitter;
  once(event: 'buttonSingleOrDoubleClick', listener: (clickType: ClickType, wasQueued: boolean, timeDiff: number) => void): EventEmitter;
  once(event: 'buttonSingleOrDoubleClickOrHold', listener: (clickType: ClickType, wasQueued: boolean, timeDiff: number) => void): EventEmitter;
}

export interface FlicConnectionChannelOptions {
  latencyMode: LatencyMode;
  autoDisconnectTime: number;
}

export declare class FlicBatteryStatusListener {
  constructor(bdAddr: string);
  on(event: 'batteryStatus', listener: (batteryPercentage: number, timestamp: Date) => void): EventEmitter;
  once(event: 'batteryStatus', listener: (batteryPercentage: number, timestamp: Date) => void): EventEmitter;
}

export declare class FlicScanner {
  constructor();
  on(event: 'advertisementPacket', listener: (
    bdAddr: string, name: string, rssi: number, isPrivate: boolean,
    alreadyVerified: boolean, alreadyConnectedToThisDevice: boolean,
    alreadyConnectedToOtherDevice: boolean
  ) => void);
  once(event: 'advertisementPacket', listener: (
    bdAddr: string, name: string, rssi: number, isPrivate: boolean,
    alreadyVerified: boolean, alreadyConnectedToThisDevice: boolean,
    alreadyConnectedToOtherDevice: boolean
  ) => void);
}

export declare class FlicScanWizard {
  constructor();
  on(event: 'foundPrivateButton', listener: () => void): EventEmitter;
  on(event: 'foundPublicButton', listener: (bdAddr: string, name: string) => void): EventEmitter;
  on(event: 'buttonConnected', listener: (bdAddr: string, name: string) => void): EventEmitter;
  on(event: 'completed', listener: (result: ScanWizardResult, bdAddr: string, name: string) => void): EventEmitter;
  once(event: 'foundPrivateButton', listener: () => void): EventEmitter;
  once(event: 'foundPublicButton', listener: (bdAddr: string, name: string) => void): EventEmitter;
  once(event: 'buttonConnected', listener: (bdAddr: string, name: string) => void): EventEmitter;
  once(event: 'completed', listener: (result: ScanWizardResult, bdAddr: string, name: string) => void): EventEmitter;
}
