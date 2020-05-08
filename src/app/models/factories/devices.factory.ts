import { Device } from '@models/devices.model';
import { DeviceDescriptorInterface } from '@configs/network/api.descriptors';

export class DevicesFactory {
    static create(source: DeviceDescriptorInterface[] | DeviceDescriptorInterface | Device): Device[] | Device {
        if (source instanceof Array) {
            return source.map((descriptor: DeviceDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Device) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: Device): Device {
        const copy: Device = new Device();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: DeviceDescriptorInterface): Device {
        const duplicateKeys = {
            id: '_id',
            key: '_key',
            rev: '_rev',
            extReachability: 'ext_reachability',
            ipAddress: 'ip_address',
            type: 'type'
        };

        const instance: Device = new Device();
        // TODO type: DeviceType; 
        for (const key in duplicateKeys) {
            if (duplicateKeys.hasOwnProperty(key)) {
                const value = duplicateKeys[key];
                instance[key] = descriptor[value];
            }
        }
        instance.defineExtraProperties();

        return instance;
    }

    static restoreFromStorage(descriptor): Device {
        const instance = new Device();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        instance.defineExtraProperties();

        return instance;
    }
}
