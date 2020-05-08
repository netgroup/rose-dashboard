import { Topology } from '@models/topologies.model';
import { TopologyDescriptorInterface } from '@configs/network/api.descriptors';

export class TopologyFactory {
    static create(source: TopologyDescriptorInterface[] | TopologyDescriptorInterface | Topology): Topology[] | Topology {
        if (source instanceof Array) {
            return source.map((descriptor: TopologyDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Topology) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: Topology): Topology {
        const copy: Topology = new Topology();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: TopologyDescriptorInterface): Topology {
        const duplicateKeys = {
            id: 'deviceid',

        };

        const instance: Topology = new Topology();
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

    static restoreFromStorage(descriptor): Topology {
        const instance = new Topology();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        instance.defineExtraProperties();

        return instance;
    }
}
