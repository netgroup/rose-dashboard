export enum OperatorRoles {
    ADMIN = 'admin',
    OPERATOR = 'operator'
}

export class Operator {
    id: string;
    role: OperatorRoles;
    avatar: string;
    name: string;
    surname: string;
    fullname: string;
    email: string;
    username: string;
    project_id: string;
    project_name: string;
    phone: {
        readable: string;
        prefix: string;
        number: string;
    };

    defineExtraProperties() {
        this.fullname = `${this.name} ${this.surname}`;

        if (this.phone.prefix && this.phone.number) {
            this.phone.readable = `${this.phone.prefix} ${this.phone.number}`;
        }
    }
}
