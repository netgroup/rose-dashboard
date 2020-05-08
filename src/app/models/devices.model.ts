export enum DeviceType {
    ROUTER = 'router',
    HOST = 'host'
}


export class Device {
    id: string;
    key: string;
    rev: string;
    extReachability: string;
    ipAddress: string;
    type: DeviceType;
    
    defineExtraProperties() {
        
    }
}
