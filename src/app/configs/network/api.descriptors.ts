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
    deviceid: string;
    type: DeviceType;
    name: string;
    description: string;
    connected: boolean;
    enabled: boolean;
    configured: boolean;
}

export interface DashboardDescriptorInterface {}