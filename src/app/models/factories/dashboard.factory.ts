import { DashboardDescriptorInterface } from '@configs/network/api.descriptors';
import { Dashboard } from '@models/dashboard.model';

export class DashboardFactory {
    static create(source: DashboardDescriptorInterface[] | DashboardDescriptorInterface | Dashboard): Dashboard[] | Dashboard {
        if (source instanceof Array) {
            return source.map((descriptor: DashboardDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Dashboard) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: Dashboard): Dashboard {
        const copy: Dashboard = new Dashboard();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: DashboardDescriptorInterface): Dashboard {
        const duplicateKeys = ['operators', 'tenants', 'overlays', 'devices'];
        const instance: Dashboard = new Dashboard();

        duplicateKeys.forEach(key => instance[key] = descriptor[key]);

        return instance;
    }

    static restoreFromStorage(descriptor): Dashboard {
        const instance = new Dashboard();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        return instance;
    }
}
