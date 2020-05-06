export enum DeviceType {
    ROUTER = 'router',
}



export enum NatType {
    OPEN = 'Open',
    FULL_CONE_NAT = 'Full-cone NAT',
    RESTRICTED_CONE_NAT = 'Restricted-cone NAT',
    RESTRICTED_PORT_NAT = 'Restricted-port NAT',
    SYMMETRIC_NAT = 'Symmetric NAT',
    UDP_FIREWALL = 'UDP Firewall',
    BLOCKED = 'Blocked'
}

export class Device {
    id: string;
    type: DeviceType;
    name: string;
    description: string;
    features: [];
    interfaces: [];
    mgmtip: string;
    natType: NatType;
    registrationTimestamp: string;
    connected: boolean;
    enabled: boolean;
    configured: boolean;
    tenantid: string;
    tunnelInfo: string;
    tunnelMode: string;

    defineExtraProperties() {
        
    }
}
