export interface LoginDescriptorInterface {
    token_type: string;
    expired_in: string;
    access_token: string;
    refresh_token: string;
    user: OperatorDescriptorInterface;
}

export interface OperatorDescriptorInterface {
    id: string;
    role: string;
    avatar: string;
    name: string;
    surname: string;
    username: string;
    phone_country: string;
    phone_main: string;
    email: string;
    project_id: string;
    project_name: string;
}

export enum Gender {
    male = 'm',
    female = 'f'
}

export enum DeviceType {
    ROUTER = 'router',
}

export interface DeviceDescriptorInterface {
    _id: string;
    _key: string;
    _rev: string;
    ext_reachability: string;
    ip_address: string;
    type: DeviceType;
}

export interface DashboardDescriptorInterface { }

export interface TopologyDescriptorInterface { }