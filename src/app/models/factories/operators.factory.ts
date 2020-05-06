import {Operator} from '@models/operators.model';
import {OperatorDescriptorInterface} from '@configs/network/api.descriptors';

export class OperatorsFactory {
    static create(source: OperatorDescriptorInterface[] | OperatorDescriptorInterface | Operator): Operator[] | Operator {
        if (source instanceof Array) {
            return source.map((descriptor: OperatorDescriptorInterface) => this.createFromDescriptor(descriptor));
        }

        return (source instanceof Operator) ?
            this.createFromInstance(source) :
            this.createFromDescriptor(source);
    }

    static createFromInstance(instance: Operator): Operator {
        const copy: Operator = new Operator();

        Object.keys(instance).forEach(key => copy[key] = instance[key]);

        return copy;
    }

    static createFromDescriptor(descriptor: OperatorDescriptorInterface): Operator {
        const duplicateKeys = ['id', 'name', 'surname', 'avatar', 'email', 'role', 'username', 'project_id', 'project_name'];

        const instance: Operator = new Operator();

        duplicateKeys.forEach(key => instance[key] = descriptor[key]);

        instance.phone = {
            readable: null,
            prefix: descriptor.phone_country,
            number: descriptor.phone_main
        };


        if (!instance.avatar) {
            instance.avatar = '/assets/images/avatar_default.jpg';
        }

        instance.defineExtraProperties();

        return instance;
    }

    static restoreFromStorage(descriptor): Operator {
        const instance = new Operator();

        Object.keys(descriptor).forEach(key => instance[key] = descriptor[key]);

        instance.defineExtraProperties();

        return instance;
    }
}
